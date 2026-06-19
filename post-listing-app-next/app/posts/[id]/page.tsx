import Link from "next/link";
import { fetchPostsById, fetchCommentsByPostId } from "@/api/posts";
import CommentCard from "@/components/CommentCard";
import { Comment } from "@/types/comment";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostPage({ params }: Props) {

  const { id } = await params;

  const post = await fetchPostsById(id);

  const comments = await fetchCommentsByPostId(id);


  return (
    <div className="p-4 bg-[rgb(218,207,208)] min-h-screen">

      <h1 className="font-serif text-center text-4xl">
        Selected Post-
      </h1>

      <h2 className="mt-3 text-center text-2xl font-serif mb-2">
        {id}. {" "} {post.title}
      </h2>

      <p className="mb-4 text-center font-serif text-xl">
        {post.body}</p>

      <h2 className="text-2xl font-serif mb-2">
        Comments:
      </h2>

      <div className="grid gap-4">
        {comments.map((comment: Comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            id={comment.id}
          />
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link href="/posts">
          <button className="font-serif text-xl bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded">
            Back to Posts
          </button>
        </Link>
      </div>
      
    </div>
  );
}