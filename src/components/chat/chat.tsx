import { Message, useChat } from "ai/react";

function MessageBubble({
  message
}: {
  message: Message
}) {
  return (
    <div key={message.id}>
      <p className="font-semibold">{message.role === "user" ? "User" : "Assistant"}</p>
      <p>{message.content}</p>
    </div>
  )
}

export function Chat() {
  const { messages, input, handleSubmit, handleInputChange  } = useChat({
    api: "api/chat"
  });

  return (
    <>
    {
      messages.map(message => <MessageBubble message={message} />)
    }
    <form onSubmit={handleSubmit}>
      <input
        name="prompt"
        value={input}
        onChange={handleInputChange}
        id="input"
      />
      <button type="submit">Submit</button>
    </form>
    </>
  )
}