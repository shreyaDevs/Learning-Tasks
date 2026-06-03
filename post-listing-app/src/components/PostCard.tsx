import {Link} from "@tanstack/react-router";
type Props = {
  id: number;
  title: string;
  body: string;
};

const PostCard = ({ id, title, body} : Props ) => {
  return (
    <div className="border-2 border-solid border-mauve-500 mb-2 rounded-2xl p-3">
      <h3 className="font-serif text-black text-xl">{id}.{" "}Title:
        <span className="text-gray-800 text-lg">{"  "}{title}</span>
      </h3>
      <p className="font-serif text-black text-xl">Body:
        <span className="text-gray-800 text-lg">{"  "}{body.slice(0, 80)}...</span>
      </p>

      <Link to={`/posts/${id}`} className="font-serif text-blue-800 underline">
        Read more
      </Link>

    </div>

  )
}

export default PostCard;


