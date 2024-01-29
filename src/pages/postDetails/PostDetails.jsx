import { useEffect, useState } from "react";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import swal from "sweetalert";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const sessionRes = sessionStorage.getItem(`post_${id}`);
    if (sessionRes) {
      const sessionData = JSON.parse(sessionRes);
      return setPost(sessionData);
    } else {
      fetch(`https://techx-server.vercel.app/post/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
          const dataJson = JSON.stringify(data);
          sessionStorage.setItem(`post_${id}`, dataJson);
        });
    }
  }, [id]);
  useEffect(() => {
    const sessionRes = sessionStorage.getItem(`comments_${id}`);
    if (sessionRes) {
      const sessionData = JSON.parse(sessionRes);
      return setComments(sessionData);
    } else {
      fetch(`https://techx-server.vercel.app/post/comments/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data);
          const dataJson = JSON.stringify(data);
          sessionStorage.setItem(`comments_${id}`, dataJson);
        });
    }
  }, [id]);

  const handleAddComment = (e) => {
    e.preventDefault();
    const toastId = toast.loading("Posting...");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const comment = e.target.comment.value;
    const data = {
      blogId: parseInt(id),
      id: comments.length + 1,
      name,
      email,
      body: comment,
    };
    console.log(data);
    fetch("https://techx-server.vercel.app/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          const allComments = [...comments, data];
          setComments(allComments);
          const jsonAllComments = JSON.stringify(allComments);
          sessionStorage.setItem(`comments_${id}`, jsonAllComments);
          toast.success("Successfully posted!", { id: toastId });
          e.target.reset();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something wrong!", { id: toastId });
      });
  };

  const handleDeleteComment = (comment_id) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const toastId = toast.loading("Deleting...");
        fetch(`https://techx-server.vercel.app/comment/delete/${comment_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              const remaining = comments.filter(
                (item) => item?.id !== comment_id
              );
              setComments(remaining);
              const jsonRemainComments = JSON.stringify(remaining);
              sessionStorage.setItem(`comments_${id}`, jsonRemainComments);
              toast.success("Successfully Deleted!", { id: toastId });
            }
          });
      }
    });
  };
  return (
    <div className="bg-gray-100 min-h-[50vh] border-t border-gray-200">
      <section className="max-w-5xl mx-auto ">
        <div className="bg-white p-5 rounded-md " key={post.id}>
          <div className="border-b border-gray-200 pb-10 mb-5">
            <h2 className="block text-2xl text-gray-900 font-bold mb-4">
              {post?.title}
            </h2>
            <p className="text-gray-600">{post?.body}</p>
          </div>
          <form
            onSubmit={handleAddComment}
            className="mb-4 space-y-2 pb-4 border-b border-gray-200"
          >
            <div className="flex gap-2">
              <label className="w-20" htmlFor="name">
                Name:
              </label>
              <input
                className="px-3 py-1 outline-none text-sm border border-gray-200 text-gray-900 rounded w-56 lg:w-96 placeholder:text-gray-600"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex gap-2">
              <label className="w-20" htmlFor="email">
                Email:
              </label>
              <input
                className="px-3 py-1 outline-none text-sm border border-gray-200 text-gray-900 rounded w-56 lg:w-96 placeholder:text-gray-600"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex gap-2">
              <label className="w-20" htmlFor="comment">
                Comment:
              </label>
              <textarea
                className="px-3 py-1 outline-none text-sm border border-gray-200 text-gray-900 rounded w-56 lg:w-96 placeholder:text-gray-600"
                name="comment"
                required
                id="comment"
                placeholder="Write your comment"
                rows="2"
              ></textarea>
            </div>
            <button className="btn btn-neutral btn-sm rounded">Comment</button>
          </form>
          {comments.length > 0 ? (
            <div className="flex flex-col-reverse">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  handleDeleteComment={handleDeleteComment}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white py-10">
              <h2 className="text-2xl text-center text-gray-900 font-bold">
                Please add comment.
              </h2>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PostDetails;
