"use client"

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizontalIcon } from "lucide-react";
import { MessageBubble } from "./message-bubble";
import { Message } from "../../../database/schema";
import { useEffect, useState } from "react";
import { continueConversation, initTodayConversation } from "@/server/api/chat";
import { unwrapAction } from "@/server/use-action";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../ui/form";
import { readStreamableValue } from "ai/rsc";

const formSchema = z.object({
  message: z.string().min(5)
});
type FormSchema = z.infer<typeof formSchema>;

let i = 0;

export function Chat() {
  const [messages, setMessages] = useState<Partial<Message>[]>([]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ""
    }
  });

  const onSubmit = async (values: FormSchema) => {
    setMessages(prev => [...prev, {
      role: "user",
      content: values.message,
    }]);

    const response = await unwrapAction(continueConversation({
      inquiry: values.message
    }));

    let textContent = '';

    for await (const delta of readStreamableValue(response)) {
      textContent = `${delta}`;

      setMessages([
        ...messages,
        { role: 'user', content: values.message },
        { role: 'assistant', content: textContent }
      ]);
    }
  }

  useEffect(() => {
    (async () => {
      const conversation = await unwrapAction(initTodayConversation());

      setMessages(conversation.messages as Message[]);
    })();
  }, []);

  return (
    <div className="grow flex flex-col">
      <div className="grow">
        <div className="mt-40">
          {messages.map(m => <MessageBubble key={m.id} message={m as any} />)}
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => console.log({errors}))}
          className="px-4 py-8"
        >
          <fieldset className="flex border rounded-xl overflow-clip">
            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-transparent"
                  placeholder="Say something..."
                />
              )}
            />
            <Button type="submit" variant="ghost">
              <SendHorizontalIcon strokeWidth={1} />
              <span className="sr-only">Send</span>
            </Button> 
          </fieldset>
        </form>
      </Form>
    </div>
  )
}