// /components/JoinRequestForm.js
const JoinRequestForm = ({ slot }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Join Request Form</h2>
      <p>Slot ID: {slot.slot_id}</p>
      {/* Add form fields here */}
    </div>
  );
};

export default JoinRequestForm;
