import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";
import PostD from "./PostD";

const DashboardHome = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/posts")
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
        fetch(`http://localhost:5000/post/delete/${id}`, {
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
