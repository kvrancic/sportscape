// /components/BoughtSlotInfo.js
const BoughtSlotInfo = ({ slot, addReview }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Bought Slot Info</h2>
      <p>Slot ID: {slot.slot_id}</p>
      <p>Address: {slot.address}</p>
      <p>Start Time: {slot.start_time}</p>
      <p>End Time: {slot.end_time}</p>
      {addReview && <p>Review Form Here</p>}
    </div>
  );
};

export default BoughtSlotInfo;
