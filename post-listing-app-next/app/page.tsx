import Link from "next/link"


export default function Home() {
  return (
    <main className="min-h-screen bg-[rgb(218,207,208)]">
      <h1 className="text-black text-center text-4xl font-serif py-5">
        Post Listing App
      </h1>

      <Link
        href="/posts">
        <button className="rounded-xl mt-3 bg-mauve-500 hover:bg-mauve-600
           text-white block mx-auto px-3 py-2 text-xl font-serif">
          Click Here To Fetch All The Posts..
        </button>
      </Link>

    </main>
  );
}
