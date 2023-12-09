'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { generateImage } from '@/lib/generateImage';
import { useState } from 'react';

const FormSchema = z.object({
  prompt: z.string().min(2, {
    message: 'prompt must be at least 2 characters.',
  }),
});

export function GenerateForm() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('data: ', data);
    const response = await generateImage(data.prompt);
    console.log('res', response);
    if (response.status === 200) {
      setImageUrl(response);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>prompt</FormLabel>
                <FormControl>
                  <Input placeholder="A dog walking a man" {...field} />
                </FormControl>
                <FormDescription>Enter a prompt.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {imageUrl && <img src={imageUrl} alt={'Generated image'} />}
    </>
  );
}
