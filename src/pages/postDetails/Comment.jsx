const Comment = ({ comment, handleDeleteComment }) => {
  return (
    <div className="mb-3">
      <h3 className="text-lg md:text-xl text-gray-900 font-bold">
        {comment.name}
      </h3>
      <h2 className="text-sm mb-1">{comment.email}</h2>
      <p className="text-gray-600">{comment.body}</p>
      <div className="flex gap-2 -mt-1">
        <button className="btn btn-link p-0 no-underline ">Edit</button>
        <button
          onClick={() => handleDeleteComment(comment.id)}
          className="btn btn-link p-0 no-underline "
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Comment;
