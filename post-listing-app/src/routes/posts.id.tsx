import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { fetchPostsById, fetchCommentsByPostId } from "../api/posts";
import CommentCard from "../components/CommentCard";


const PostDetailsPage = () => {
    const { id } = useParams({
        from: "/posts/$id"
    });

    const postQuery = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPostsById(id),
    });

    const commentsQuery = useQuery({
        queryKey: ["comments", id],
        queryFn: () => fetchCommentsByPostId(id),
    });

    if (postQuery.isLoading) {
        return <h2 className="text-center text-xl p-4">Loading comments..</h2>
    }

    if (postQuery.error) {
        return <h2 className="text-center text-xl p-4">Failed to load posts</h2>
    }

    return (
        <div className="min-h-screen bg-fuchsia-100 p-4 ">
            <h2 className="font-serif text-3xl text-mauve-800 text-center mb-3">Selected Post -
                <p className="text-xl text-mauve-950 mt-2">{id}-{"  "}Title:{"  "}
                    <span className="text-mauve-700">{postQuery.data.title}</span>
                </p>

                <p className="text-xl text-mauve-950">Body:{"  "}
                    <span className="text-mauve-700">{postQuery.data.body}</span>
                </p>
            </h2>

            <h3 className="text-3xl font-serif py-2">Comments:</h3>

            {commentsQuery.isLoading && (
                <p>Loading commnets..</p>
            )}

            {commentsQuery.error && (
                <p>Failed to load comments</p>
            )}

            {commentsQuery.data?.map((comment: any) => (
                <CommentCard
                id={comment.id}
                    key={comment.id}
                    name={comment.name}
                    email={comment.email}
                    body={comment.body}
                />
            ))}

        </div>
    )
}

export default PostDetailsPage;

