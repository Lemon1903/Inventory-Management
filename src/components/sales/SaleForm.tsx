import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { createSale, updateSale } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { ProductNames, Sale } from "@/types";

interface SaleFormProps {
  defaultValues?: Sale;
}

const formSchema = z.object({
  name: z.nativeEnum(ProductNames, {
    message: "This field is required",
  }),
  sold: z.number().or(
    z
      .string()
      .min(1, { message: "This field is required" })
      .transform(Number)
      .pipe(z.number().nonnegative({ message: "Quantity must be a non-negative number" })),
  ),
  total: z.number().or(
    z
      .string()
      .min(1, { message: "This field is required" })
      .transform(Number)
      .pipe(z.number().nonnegative({ message: "Price must be a non-negative number" })),
  ),
});

export default function SaleForm({ defaultValues }: SaleFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? ("" as ProductNames),
      sold: defaultValues?.sold ?? 0,
      total: defaultValues?.total ?? 0,
    },
  });

  const closeDialog = useCloseDialog();
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [import.meta.env.VITE_QKEY_SALES] }).then(closeDialog);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSale,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [import.meta.env.VITE_QKEY_SALES] }).then(closeDialog);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newData: Sale = {
      ...values,
      id: defaultValues?.id ?? faker.number.int(),
      date: defaultValues?.date ?? new Date(),
    };

    if (!defaultValues) {
      return createMutation.mutate(newData);
    }

    const isDataUnchanged = Object.keys(newData).every((key) => newData[key] == defaultValues[key]);
    if (isDataUnchanged) return closeDialog();

    updateMutation.mutate({ saleID: defaultValues.id, updatedData: newData });
  }

  return (
    <Form {...form}>
      <ScrollArea className="sm:max-h-[25rem]">
        <form id="sales-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1 pr-5">
          <FormField
            control={form.control}
            name="name"
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
                    {Object.values(ProductNames).map((productName) => (
                      <SelectItem key={productName} value={ProductNames[productName]}>
                        {productName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sold"
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
          <FormField
            control={form.control}
            name="total"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  Total <span className="text-lg leading-none text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className={cn(fieldState.error && "border-destructive")}
                    placeholder="e.g. 1000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </ScrollArea>
      <Button
        form="sales-form"
        type="submit"
        className="justify-self-end"
        disabled={createMutation.isPending || updateMutation.isPending}
      >
        {createMutation.isPending || updateMutation.isPending ? (
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
