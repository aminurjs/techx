import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useState } from "react";
const Post = ({ post }) => {
  const favJson = sessionStorage.getItem("favorites");
  const favItems = JSON.parse(favJson);
  const favItem = favItems.find((item) => item.id === post.id);
  const [fav, setFav] = useState(favItem);

  const handleFavorite = () => {
    const favoriteJson = sessionStorage.getItem("favorites");
    const favoriteItems = JSON.parse(favoriteJson);
    if (favoriteItems) {
      const findLocalItem = favoriteItems.find((item) => item.id === post.id);
      if (findLocalItem) {
        const filterFavoriteItems = favoriteItems.filter(
          (item) => item.id !== post.id
        );
        const filterAllItems = [...filterFavoriteItems];
        const filterAllItemsJson = JSON.stringify(filterAllItems);
        sessionStorage.setItem("favorites", filterAllItemsJson);
        setFav(false);
        return;
      }
      const localAllItems = [...favoriteItems, post];
      const localAllItemsJson = JSON.stringify(localAllItems);
      sessionStorage.setItem("favorites", localAllItemsJson);
      setFav(true);
      return;
    } else {
      const favoriteItem = [post];
      const favoriteItemJson = JSON.stringify(favoriteItem);
      sessionStorage.setItem("favorites", favoriteItemJson);
      setFav(true);
    }
  };
  return (
    <div className="bg-white p-5 rounded-md" key={post.id}>
      <div className="flex justify-between">
        <Link
          to={`post/${post.id}`}
          className="block text-lg md:text-xl text-gray-900 font-bold mb-2"
        >
          {post?.title.length > 25
            ? `${post.title.slice(0, 25)} ...`
            : post.title}
        </Link>
        {!fav ? (
          <button
            onClick={handleFavorite}
            data-tip="Add to favorite"
            className="lg:tooltip text-gray-600 text-xl mb-2"
          >
            <FaRegHeart />
          </button>
        ) : (
          <button
            onClick={handleFavorite}
            data-tip="Remove favorite"
            className="lg:tooltip text-pink-600 text-xl mb-2"
          >
            <FaHeart />
          </button>
        )}
      </div>
      <p className="text-gray-600">
        {post?.body.length > 130 ? `${post.body.slice(0, 130)} ...` : post.body}
      </p>
      <Link to={`post/${post.id}`}>
        <button className="btn btn-outline btn-sm mt-5">See More...</button>
      </Link>
    </div>
  );
};

export default Post;
