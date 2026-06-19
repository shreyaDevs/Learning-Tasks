import { Comment } from "@/types/comment";

type Props = {
  comment: Comment;
  id: number,
};

export default function CommentCard({ comment, id }: Props) {



  return (
    <div className="border rounded p-4">
      <h3 className="font-serif text-xl">
        {id}. {" "} Name: {" "} {comment.name}
      </h3>

      <p className="font-serif text-gray-600">
        Mail: {" "} {comment.email}
      </p>

      <p className="font-serif text-lg">
        Body: {" "} {comment.body}
      </p>
    </div>
  );
}