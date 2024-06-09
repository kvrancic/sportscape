// /components/OwnedSlot.js
const OwnedSlot = ({ slot, children }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Owned Slot</h2>
      <p>Owner ID: {slot.owner_id}</p>
      {children}
    </div>
  );
};

export default OwnedSlot;
