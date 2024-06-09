// /components/BuyRequestForm.js
const BuyRequestForm = ({ slot }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Buy Request Form</h2>
      <p>Slot ID: {slot.slot_id}</p>
      {/* Add form fields here */}
    </div>
  );
};

export default BuyRequestForm;
