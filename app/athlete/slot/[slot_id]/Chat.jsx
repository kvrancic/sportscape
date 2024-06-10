// /components/Chat.js
const Chat = ({ slot_id }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Chat</h2>
      <p>Chat for Slot ID: {slot_id}</p>
      {/* Add chat UI here */}
    </div>
  );
};

export default Chat;
