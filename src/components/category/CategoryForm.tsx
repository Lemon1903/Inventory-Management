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
import { createCategory, fetchCategories, updateCategory } from "@/lib/categories-db";
import { cn } from "@/lib/utils";
import { Category, PartialCategory } from "@/types";

/**
 * Props for the CategoryForm component.
 *
 * @interface
 */
interface CategoryFormProps {
  /** Default values for the category when editing. */
  defaultValues?: Category;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "This field is required",
  }),
});

/**
 * Renders a form for creating or updating a category.
 *
 * @component
 * @param {CategoryFormProps} props - The component props.
 */
export default function ItemForm({ defaultValues }: CategoryFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
    },
  });

  const closeDialog = useCloseDialog();
  const { data: categories } = useQuery({
    queryKey: [import.meta.env.VITE_QKEY_CATEGORY],
    queryFn: fetchCategories,
  });

  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [import.meta.env.VITE_QKEY_CATEGORY] }).then(closeDialog);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [import.meta.env.VITE_QKEY_CATEGORY] }).then(closeDialog);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!categories) return;

    const newData: PartialCategory = { ...values };

    for (const category of categories) {
      if (category.name === newData.name) {
        toast.error("Category already exists");
        return;
      }
    }

    if (!defaultValues) {
      return createMutation.mutate(newData);
    }

    const isDataUnchanged = Object.keys(newData).every((key) => newData[key] == defaultValues[key]);
    if (isDataUnchanged) return closeDialog();

    updateMutation.mutate({
      categoryID: defaultValues.id,
      updatedData: { ...newData, id: defaultValues.id },
    });
  }

  return (
    <Form {...form}>
      <ScrollArea className="sm:max-h-[25rem]">
        <form id="items-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1 pr-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  Category Name <span className="text-lg leading-none text-destructive">*</span>
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
