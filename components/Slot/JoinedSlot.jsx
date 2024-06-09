// /components/JoinedSlot.js
const JoinedSlot = ({ slot, children }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Joined Slot</h2>
      <p>Slot ID: {slot.slot_id}</p>
      {children}
    </div>
  );
};

export default JoinedSlot;
