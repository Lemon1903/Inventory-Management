import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useCloseDialog } from "@/components/shared/FormDialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { fetchCategories } from "@/lib/categories-db";
import { createItem, fetchItems, updateItem } from "@/lib/items-db";
import { cn } from "@/lib/utils";
import { Item, PartialItem } from "@/types";

/**
 * Props for the ItemForm component.
 *
 * @interface
 */
interface ItemFormProps {
  /** Default values for the items when editing. */
  defaultValues?: Item;
}

const formSchema = z.object({
  img: z.string().optional(),
  name: z.string().min(1, {
    message: "This field is required",
  }),
  description: z.string().min(1, {
    message: "This field is required",
  }),
  quantity: z.number().or(
    z
      .string()
      .min(1, { message: "This field is required" })
      .transform(Number)
      .pipe(z.number().nonnegative({ message: "Quantity must be a non-negative number" })),
  ),
  unitPrice: z.number().or(
    z
      .string()
      .min(1, { message: "This field is required" })
      .transform(Number)
      .pipe(z.number().nonnegative({ message: "Price must be a non-negative number" })),
  ),
  category: z.string().min(1, {
    message: "This field is required",
  }),
});

/**
 * Renders a form for creating or updating an item.
 *
 * @component
 * @param {ItemFormProps} props - The component props.
 */
export default function ItemForm({ defaultValues }: ItemFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      img: defaultValues?.img ?? "",
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      quantity: defaultValues?.quantity ?? 0,
      unitPrice: defaultValues?.unitPrice ?? 0,
      category: defaultValues?.category.name ?? "",
    },
  });

  const closeDialog = useCloseDialog();
  const { data: products } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_ITEMS],
    queryFn: fetchItems,
  });

  const { data: categories, isLoading } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_CATEGORY],
    queryFn: fetchCategories,
  });

  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [import.meta.env.VITE_QKEY_ITEMS] }).then(closeDialog);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [import.meta.env.VITE_QKEY_ITEMS] }).then(closeDialog);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!categories || !products) return;

    const newData: PartialItem = {
      img: values.img || "https://ui-avatars.com/api/?name=Item",
      name: values.name,
      description: values.description,
      quantity: Number(values.quantity),
      unitPrice: Number(values.unitPrice),
      categoryId: categories.find((category) => category.name === values.category)!.id,
    };

    if (!defaultValues) {
      for (const product of products) {
        if (product.name === newData.name) {
          return toast.error("Product already exists");
        }
      }

      return createMutation.mutate(newData);
    }

    const isDataUnchanged = Object.keys(newData).every(
      (key) => key === "dateUpdated" || newData[key] == defaultValues[key],
    );
    if (isDataUnchanged) return closeDialog();

    updateMutation.mutate({
      itemID: defaultValues.id,
      updatedData: { ...newData, id: defaultValues.id, dateAdded: defaultValues.dateAdded },
    });
  }

  return (
    <Form {...form}>
      <ScrollArea className="sm:max-h-[25rem]">
        <form id="items-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1 pr-5">
          <FormField
            control={form.control}
            name="img"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  Image upload <span className="text-muted-foreground">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(fieldState.error && "border-destructive")}
                    placeholder="https://example.com/imgData.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  Item Name <span className="text-lg leading-none text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(fieldState.error && "border-destructive")}
                    placeholder="Rustic Fresh Hat"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  Description <span className="text-lg leading-none text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    className={cn(fieldState.error && "border-destructive")}
                    placeholder="Lorem ipsum dolor sit amet."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  Quantity <span className="text-lg leading-none text-destructive">*</span>
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
            name="unitPrice"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  Price <span className="text-lg leading-none text-destructive">*</span>
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
          <FormField
            control={form.control}
            name="category"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  Category <span className="text-lg leading-none text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={cn(fieldState.error && "border-destructive")}>
                      <SelectValue defaultValue={field.value} placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoading ? (
                      <div className="px-2 py-3">Loading...</div>
                    ) : (
                      categories?.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </ScrollArea>
      <Button
        form="items-form"
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
