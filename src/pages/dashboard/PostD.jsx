import { Link } from "react-router-dom";

const PostD = ({ post, handleDeletePost }) => {
  return (
    <div className="bg-white mb-3 p-5 rounded-md">
      <Link
        to={`/post/${post.id}`}
        className="block text-lg md:text-xl text-gray-900 font-bold mb-2"
      >
        {post?.title}
      </Link>
      <p className="text-gray-600">
        {post?.body.length > 80 ? `${post.body.slice(0, 80)} ...` : post.body}
      </p>
      <div className="flex gap-5 mt-5">
        <Link to={`/dashboard/edit-post/${post.id}`}>
          <button className="btn btn-accent no-underline rounded btn-sm">
            Edit
          </button>
        </Link>
        <button
          onClick={() => handleDeletePost(post.id)}
          className="btn btn-error no-underline  rounded btn-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostD;
