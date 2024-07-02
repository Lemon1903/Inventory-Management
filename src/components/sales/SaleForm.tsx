import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCloseDialog } from "@/components/shared/FormDialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchItems } from "@/lib/items-db";
import { createSale } from "@/lib/sales-db";
import { cn } from "@/lib/utils";
import { PartialSale } from "@/types";

const formSchema = z.object({
  productName: z.string().min(1, {
    message: "This field is required",
  }),
  quantitySold: z.number().or(
    z
      .string()
      .min(1, { message: "This field is required" })
      .transform(Number)
      .pipe(z.number().nonnegative({ message: "Quantity must be a non-negative number" })),
  ),
});

/**
 * Renders a form for creating a sale.
 *
 * @component
 */
export default function SaleForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      quantitySold: 0,
    },
  });

  const closeDialog = useCloseDialog();
  const { data: items, isLoading } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_ITEMS],
    queryFn: fetchItems,
  });

  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [import.meta.env.VITE_QKEY_SALES] }).then(closeDialog);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!items) return;

    const product = items.find((item) => item.name === values.productName);
    const newData: PartialSale = {
      productId: product!.id,
      quantitySold: values.quantitySold,
    };

    createMutation.mutate(newData);
  }

  return (
    <Form {...form}>
      <ScrollArea className="sm:max-h-[25rem]">
        <form id="sales-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
          <FormField
            control={form.control}
            name="productName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  Product Name <span className="text-lg leading-none text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={cn(fieldState.error && "border-destructive")}>
                      <SelectValue defaultValue={field.value} placeholder="Find the product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoading ? (
                      <div className="px-2 py-3">Loading...</div>
                    ) : (
                      items?.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantitySold"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  Sold <span className="text-lg leading-none text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className={cn(fieldState.error && "border-destructive")}
                    placeholder="e.g. 100"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </ScrollArea>
      <Button form="sales-form" type="submit" className="justify-self-end" disabled={createMutation.isPending}>
        {createMutation.isPending ? (
          <React.Fragment>
            Saving... <Loader2 size={20} className="ml-2 animate-spin" />
          </React.Fragment>
        ) : (
          "Save Changes"
        )}
      </Button>
    </Form>
  );
}
