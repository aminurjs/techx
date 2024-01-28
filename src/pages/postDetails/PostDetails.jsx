import { useEffect, useState } from "react";

const PostDetails = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetch("../fakepost.json")
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, []);
  return (
    <div className="bg-gray-100 min-h-[calc(50vh)]">
      <section className="max-w-5xl mx-auto ">
        <div className="bg-white p-5 rounded-md " key={post.id}>
          <div className="border-b border-gray-200 pb-8 mb-5">
            <h2 className="block text-2xl text-gray-900 font-bold mb-4">
              {post?.title}
            </h2>
            <p className="text-gray-600">{post?.body}</p>
          </div>
          <form className="mb-4 space-y-2 pb-4 border-b border-gray-200">
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
        </div>
      </section>
    </div>
  );
};

export default PostDetails;
