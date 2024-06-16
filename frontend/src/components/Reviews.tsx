function Reviews() {
  const reviews = [
    {
      id: 1,
      author: "Jane Doe",
      rating: 5,
      comment: "Great toy! My kids love it."
    },
    {
      id: 2,
      author: "John Smith",
      rating: 4,
      comment: "Good quality and well made."
    }
  ];

  return (
    <div className="space-y-6">
      {reviews.map(review => (
        <div
          key={review.id}
          className="shadow-lg rounded-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            {review.author}
          </h3>
          <div className="flex items-center">
            <span className="text-yellow-500">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </span>
            <p className="text-sm text-gray-600 ml-2">{`Rating: ${review.rating}/5`}</p>
          </div>
          <p className="text-gray-600 mt-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
