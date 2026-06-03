
import { useNavigate } from "@tanstack/react-router";
console.log("App component rendered");

function App() {

  const navigate = useNavigate();

  return (
    <div className=" min-h-screen bg-fuchsia-100 p-4">
      <h1 className="text-center  text-3xl font-serif text-cyan-950">
        LIST OF POSTS
      </h1>
      <h2 className="text-center text-2xl font-serif text-mauve-600 pt-6 ">
        Click the button to get all the posts..
      </h2>
      <button id="fetchPosts" onClick={() => {
        console.log("button clicked");
        navigate({ to: "/posts" })
      }}
        className="block mx-auto rounded-2xl bg-cyan-800 px-4 py-2 text-white text-xl 
        font-sans my-6 hover:bg-cyan-900">
        Fetch posts
      </button>
      
    </div>
  )
}

export default App
