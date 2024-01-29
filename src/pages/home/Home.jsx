import { useEffect, useState } from "react";
import Post from "./Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);
  return (
    <div className="bg-gray-100 pb-12">
      <section className="max-w-7xl mx-auto pt-3">
        <div className="px-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
