// /components/SlotBasicInfo.js
const SlotBasicInfo = ({ slot }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Basic Information</h2>
      <p>Name: {slot.name}</p>
      <p>Description: {slot.description}</p>
    </div>
  );
};

export default SlotBasicInfo;
