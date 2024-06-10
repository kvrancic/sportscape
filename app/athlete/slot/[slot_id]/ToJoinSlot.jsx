// /components/ToJoinSlot.js
const ToJoinSlot = ({ slot, children }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">To Join Slot</h2>
      <p>Slot ID: {slot.slot_id}</p>
      {children}
    </div>
  );
};

export default ToJoinSlot;
