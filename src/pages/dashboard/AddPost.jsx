import swal from "sweetalert";

const AddPost = () => {
  const handleAddPost = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const data = {
      userId: 1,
      title,
      body: description,
    };
    console.log(data);
    fetch("https://techx-server.vercel.app/add-post", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          swal("Successfully posted!", "", "success");
          e.target.reset();
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
        onSubmit={handleAddPost}
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
            required
          ></textarea>
        </div>
        <button className="btn btn-accent btn-md rounded px-12">Post</button>
      </form>
    </div>
  );
};

export default AddPost;
