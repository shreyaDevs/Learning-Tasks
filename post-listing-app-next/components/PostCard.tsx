"use client";
import Link from "next/link";
import { useState } from "react";
import { addPosts, updatePosts, deletePosts } from "@/api/posts";

type Props = {
  id: number;
  title: string;
  body: string;
  onUpdated?: (id: number, data: PostData) => void;
  onDeleted?: (id: number) => void;
};

type PostData = {
  title: string,
  body: string,
}

export default function PostCard({ id, title, body, onUpdated, onDeleted }: Props) {

  const [activeAction, setActiveAction] = useState<"create" | "update" | "delete" | (null)>(null);

  const [updatedPost, setUpdatedPost] = useState<PostData>({
    title: "",
    body: ""
  });

  const openUpdateForm = () => {
    setUpdatedPost({ title, body });
    setActiveAction("update");
  };



  const handleUpdate = async () => {
    if (
      !updatedPost.title ||
      !updatedPost.body
    )
      return;

    await updatePosts(
      id.toString(),
      updatedPost
    );

    onUpdated?.(id, updatedPost);

    setActiveAction(null);
  };


  const handleDelete = async () => {
    await deletePosts(id.toString());

    onDeleted?.(id);

    setActiveAction(null);
  };

  return (
    <div className="border border-mauve-600 rounded-xl shadow p-4">

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif">
          {id}. Title: {title}
        </h2>

        <div className="flex gap-2">
          <Link href={`/posts/${id}`}>
            <button className="bg-white text-mauve-700 hover:bg-gray-100 border border-gray-700 rounded py-1 px-2 font-serif">
              View
            </button>
          </Link>

          <button onClick={openUpdateForm}
            className="bg-white text-mauve-700 hover:bg-gray-100 border border-gray-700 rounded py-1 px-2 font-serif" >
            Update
          </button>

          <button onClick={() => setActiveAction("delete")}
            className="bg-white text-mauve-700 hover:bg-gray-100 border border-gray-700 rounded py-1 px-2 font-serif">
            Delete
          </button>
        </div>
      </div>

      <p className="text-gray-700 mt-2">
        Body: {body.slice(0, 50)}...
      </p>


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