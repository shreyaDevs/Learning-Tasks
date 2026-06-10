import { Link } from "@tanstack/react-router";
import { useState } from "react";

type PostData = {
  title: string,
  body: string,
}
type Props = {
  id: number;
  title: string;
  body: string;


  onAdd: (data: PostData) => Promise<void>;
  onUpdate: (
    id: number,
    data: PostData
  ) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};


const PostCard = ({ id, title, body, onAdd, onUpdate, onDelete }: Props) => {
  const [activeAction, setActiveAction] = useState< "create" | "update" | "delete" | (null)>(null);

  const [newPost, setNewPost] = useState<PostData>({
    title: "",
    body: "",
  });


  const [updatedPost, setUpdatedPost] =
    useState<PostData>({
      title: "",
      body: ""
    });

  const openUpdateForm = () => {
    setUpdatedPost({ title, body });
    setActiveAction("update");
  };

  const handleAdd = async () => {
    if (
      !newPost.title ||
      !newPost.body
    )
      return;

    await onAdd(newPost);

    setNewPost({
      title: "",
      body: "",
    });

    setActiveAction(null);
  };

  const handleUpdate = async () => {
    if (!updatedPost.title || !updatedPost.body) return;
    await onUpdate(id, updatedPost);
    setActiveAction(null);
  };

  const handleDelete = async () => {
    await onDelete(id);
    setActiveAction(null);
  };



  return (
    <div className="border-2 border-solid border-mauve-500 mb-2 rounded-2xl p-3 ">

      <div className="flex justify-between items-center">

        <h3 className="font-serif text-black text-xl">{id}.{" "}Title:
          <span className="text-gray-800 text-lg">{"  "}{title}</span>
        </h3>

        <div className="flex gap-2">
          <Link to={`/posts/${id}`}>
            <button className="bg-gray-500 hover:bg-gray-600 rounded-xl text-white py-1 px-2 font-serif">
              View
            </button>
          </Link>

          <button onClick={openUpdateForm}
            className="bg-blue-400 hover:bg-blue-500 rounded-xl text-white py-1 px-2 font-serif">
            Update
          </button>

          <button onClick={() => setActiveAction("delete")}
            className="bg-red-400 hover:bg-red-500 rounded-xl text-white py-1 px-2 font-serif">
            Delete
          </button>
        </div>
      </div>

      <p className="font-serif text-black text-xl">Body:
        <span className="text-gray-800 text-lg">{"  "}{body.slice(0, 80)}...</span>
      </p>


      {activeAction === "create" && (
        <div className="mt-3 flex gap-2 bg-gray-300 border border-gray-700 rounded-xl p-3">

          <input type="text" placeholder="Enter name" className="border border-black rounded p-1"
            value={newPost.title} onChange={(e) =>
              setNewPost({ ...newPost, title: e.target.value, })}
          />

          <input type="text" placeholder="Enter comment body" className="border border-black rounded p-1"
            value={newPost.body} onChange={(e) =>
              setNewPost({ ...newPost, body: e.target.value, })}
          />

          <button onClick={handleAdd} className="ml-4 border bg-blue-600 rounded-xl p-2 text-white hover:bg-blue-700 font-serif">
            Submit
          </button>
          

          <button onClick={() => setActiveAction(null)} className="bg-white rounded-lg p-2 font-serif hover:bg-gray-200">
            Cancel
          </button>
        </div>
      )}


      {/* update */}
      {activeAction === "update" && (
        <div className="mt-3 flex gap-3 bg-gray-300 border border-gray-700 rounded-xl p-3">

          <input value={updatedPost.title} className="border border-black rounded p-1"
            onChange={(e) =>
              setUpdatedPost({ ...updatedPost, title: e.target.value, })}
          />

          <input value={updatedPost.body} className="border border-black rounded p-1"
            onChange={(e) =>
              setUpdatedPost({ ...updatedPost, body: e.target.value, })}
          />

          <button onClick={handleUpdate} className="border rounded-xl p-2 bg-blue-500 hover:bg-blue-600 text-white font-serif">
            Update
          </button>
          <button onClick={() => setActiveAction(null)} className="rounded-xl p-2 bg-white hover:bg-gray-200 font-serif">
            Cancel
          </button>
        </div>
      )}


      {/* delete*/}
      {activeAction === "delete" && (
        <div className="mt-3 bg-gray-300 border border-gray-700 font-serif rounded-xl p-3">

          <p className="text-lg">
            Are you sure you want to delete?
          </p>

          <div className="flex gap-2">
            <button onClick={handleDelete} className="mt-2 bg-red-500 hover:bg-red-600 font-serif rounded-xl text-white px-2 py-1 text-lg ">
              Delete
            </button>

            <button onClick={() => setActiveAction(null)} className="mt-2 bg-white hover:bg-gray-200 font-serif rounded-xl py-1 px-2 text-lg">
              Cancel
            </button>
          </div>

        </div>
      )}

    </div>

  )
}

export default PostCard;


