import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const EditPost = () => {
  const { id } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`https://techx-server.vercel.app/post/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  const handleEditPost = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const data = {
      title,
      body: description,
    };
    console.log(data);
    fetch(`https://techx-server.vercel.app/update-post/${id}`, {
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
          sessionStorage.removeItem(`post_${id}`);
        }
      })
      .catch((err) => {
        console.log(err);
        swal("Something wrong!", "", "warning");
      });
  };
  return (
    <div>
      <form
        onSubmit={handleEditPost}
        className="mb-4 space-y-5 bg-white p-5 rounded-md m-3"
      >
        <div className="flex gap-2 flex-col">
          <label className="block" htmlFor="title">
            Title:
          </label>
          <input
            className="px-5 py-2 outline-none border border-gray-200 text-gray-900 rounded w-full placeholder:text-gray-600"
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            defaultValue={post.title}
            required
          />
        </div>
        <div className="flex gap-2 flex-col">
          <label className="block" htmlFor="description">
            Description:
          </label>
          <textarea
            className="px-5 py-2 outline-none border border-gray-200 text-gray-900 rounded w-full placeholder:text-gray-600"
            type="description"
            name="description"
            id="description"
            rows="5"
            placeholder="Description"
            defaultValue={post.body}
            required
          ></textarea>
        </div>
        <button className="btn btn-accent btn-md rounded px-12">Post</button>
      </form>
    </div>
  );
};

export default EditPost;
