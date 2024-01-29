import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const favJson = sessionStorage.getItem("favorites");
    const favItems = JSON.parse(favJson);
    setFavorites(favItems);
  }, []);

  const handleRemove = (id) => {
    const filterFavoriteItems = favorites.filter((item) => item.id !== id);
    const favoriteItemsJson = JSON.stringify(filterFavoriteItems);
    sessionStorage.setItem("favorites", favoriteItemsJson);
    setFavorites(filterFavoriteItems);
  };
  return (
    <div className="bg-gray-100 pt-1 min-h-[calc(100vh-92px)]">
      <section className="max-w-5xl mx-auto ">
        {favorites?.length > 0 ? (
          <div>
            {favorites?.map((item) => (
              <div
                key={item.id}
                className="py-2 px-5 flex justify-between items-center bg-white m-1"
              >
                <Link
                  className="block text-lg  text-gray-900 font-semibold"
                  to={`/post/${item.id}`}
                >
                  {item.title}
                </Link>
                <button
                  onClick={() => handleRemove(item.id)}
                  data-tip="Remove to favorite"
                  className="lg:tooltip text-gray-600 text-xl"
                >
                  <FaXmark className="text-3xl p-1" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white py-10">
            <h2 className="text-2xl text-center text-gray-900 font-bold">
              No data found
            </h2>
          </div>
        )}
      </section>
    </div>
  );
};

export default Favorite;
