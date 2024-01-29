import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";
import PostD from "./PostD";

const DashboardHome = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://techx-server.vercel.app/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleDeletePost = (id) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const toastId = toast.loading("Deleting...");
        fetch(`https://techx-server.vercel.app/post/delete/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = posts.filter((item) => item?.id !== id);
              setPosts(remaining);
              toast.success("Successfully Deleted!", { id: toastId });
            }
          });
      }
    });
  };
  return (
    <div>
      <div className="p-3">
        {posts?.map((post) => (
          <PostD
            key={post.id}
            post={post}
            handleDeletePost={handleDeletePost}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
