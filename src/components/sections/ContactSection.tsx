'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import AnimateOnScroll from '../common/AnimateOnScroll';
import React from 'react';
import SendButton from '../ui/send-button';
import { AnimatedInput } from '../ui/animated-input';
import { GridBackground } from '../ui/grid-background';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(500, { message: 'Message must not be longer than 500 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

async function submitAction(data: FormData) {
  try {
    const response = await fetch('https://formspree.io/f/xeoryjgy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true, message: "Thanks for reaching out! I'll be in touch soon." };
    } else {
      return { success: false, message: 'Something went wrong. Please try again.' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    const result = await submitAction(data);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Message Sent!',
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: result.message,
      });
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      <GridBackground />
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.05),transparent_70%)]" />
      <div className="container mx-auto max-w-3xl text-center relative z-10">
        <AnimateOnScroll animation="fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Let’s Build Something Bold Together.
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Have a project in mind or just want to say hello? Drop me a line.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-in" delay="delay-300">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AnimatedInput label="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AnimatedInput label="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Tell me about your project..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <SendButton isSubmitting={isSubmitting} />
              </div>
            </form>
          </Form>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default ContactSection;
