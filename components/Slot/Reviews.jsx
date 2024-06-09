// /components/Reviews.js
const Reviews = ({ slot_id, addReview }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Reviews</h2>
      <p>Reviews for Slot ID: {slot_id}</p>
      {addReview && <p>Review Form Here</p>}
    </div>
  );
};

export default Reviews;
