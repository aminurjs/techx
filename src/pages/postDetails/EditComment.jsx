import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const EditComment = () => {
  const { id } = useParams();

  const [comment, setComment] = useState({});

  useEffect(() => {
    fetch(`https://techx-server.vercel.app/comment/${id}`)
      .then((res) => res.json())
      .then((data) => setComment(data));
  }, [id]);

  const handleEditComment = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const text = e.target.comment.value;
    const data = {
      name,
      email,
      body: text,
    };
    console.log(data);
    fetch(`https://techx-server.vercel.app/update-comment/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.modifiedCount > 0) {
          swal("Successfully updated!", "", "success");
          sessionStorage.removeItem(`comments_${comment.blogId}`);
        }
      })
      .catch((err) => {
        console.log(err);
        swal("Something wrong!", "", "warning");
      });
  };
  return (
    <div className="bg-white max-w-7xl mx-auto p-5 border-t border-gray-200">
      <form
        onSubmit={handleEditComment}
        className="mb-4 space-y-2 pb-4 border-b border-gray-200"
      >
        <div className="flex gap-2">
          <label className="w-20" htmlFor="name">
            Name:
          </label>
          <input
            className="px-3 py-1 outline-none text-sm border border-gray-200 bg-gray-100  text-gray-500 rounded w-96 placeholder:text-gray-600"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            defaultValue={comment?.name}
            readOnly
            required
          />
        </div>
        <div className="flex gap-2">
          <label className="w-20" htmlFor="email">
            Email:
          </label>
          <input
            className="px-3 py-1 outline-none text-sm border border-gray-200 bg-gray-100  text-gray-500 rounded w-96 placeholder:text-gray-600"
            type="email"
            name="email"
            id="email"
            defaultValue={comment?.email}
            readOnly
            placeholder="Email"
            required
          />
        </div>
        <div className="flex gap-2">
          <label className="w-20" htmlFor="comment">
            Comment:
          </label>
          <textarea
            className="px-3 py-1 outline-none text-sm border border-gray-200 text-gray-900 rounded w-96 placeholder:text-gray-600"
            name="comment"
            defaultValue={comment?.body}
            required
            id="comment"
            placeholder="Write your comment"
            rows="2"
          ></textarea>
        </div>
        <button className="btn btn-neutral btn-sm rounded">Update</button>
      </form>
    </div>
  );
};

export default EditComment;
