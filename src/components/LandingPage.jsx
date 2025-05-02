import { useNavigate } from "react-router-dom";
import imageprocess from "../assets/imageprocess.svg";
import textprocess from "../assets/textprocess.svg";
import writingIcon from "../assets/writeing.svg";
export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full comic-neue-regular bg-hero-pattern bg-cover  min-h-screen flex flex-col  justify-center items-center ">
      <div className="w-full min-h-screen bg-hero-pattern bg-cover bg-center text-white flex flex-col justify-center items-center px-4">
        <h1 className="text-3xl sm:text-6xl font-bold text-center">
          Turn Stories Into Comics with AI
        </h1>
        <p className="mt-4 text-xl sm:text-2xl max-w-2xl text-center">
          StorySketchAI transforms your text-based stories into visually
          engaging comic scenes using generative AI.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 px-8 py-3 text-xl bg-[#fff200] text-black font-semibold border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:bg-yellow-300"
        >
          Try Now
        </button>
        <p className=" text-black font-bold  absolute bottom-48 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
            />
          </svg>
        </p>
      </div>

      <div className="w-full min-h-screen bg-hero-pattern sm:bg-hero1-pattern bg-cover bg-center text-white flex flex-col justify-start pt-10 items-center px-4">
        <section className="w-full text-center flex flex-col gap-10 py-10">
          <h2 className="text-4xl font-bold underline mb-8">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 sm:px-20">
            <div>
              <img src={writingIcon} className="mx-auto rounded h-20 mb-4" />
              <h3 className="text-2xl text-gray-950 font-semibold">
                1. Write Your Story
              </h3>
              <p className="text-white font-semibold text-xl">
                Enter your story in plain text, describing key moments.
              </p>
            </div>
            <div>
              <img src={textprocess} className="mx-auto rounded h-20 mb-4" />
              <h3 className="text-2xl text-gray-950 font-semibold">
                2. Let AI Process It
              </h3>
              <p className="text-white font-semibold text-xl">
                Our model divides your story into scenes and creates comic-style
                prompts.
              </p>
            </div>
            <div>
              <img src={imageprocess} className="mx-auto rounded h-20 mb-4" />
              <h3 className="text-2xl text-gray-950 font-semibold">
                3. Get Comic Images
              </h3>
              <p className="text-white font-semibold text-xl">
                Watch as your story is turned into vivid, AI-generated comic
                panels.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-4xl py-16 text-black text-center">
          <h2 className="text-4xl font-bold mb-6 underline  text-white">
            Open Source
          </h2>
          <p className="mb-6 text-xl font-medium text-white">
            StorySketchAI is built for creators, by creators. It’s fully open
            source—contribute, fork, or star us on GitHub.
          </p>
          <a
            href="https://github.com/AnilReddyDev/StorySketchAI"
            target="_blank"
            className="mt-6 px-4 py-3 text-xl bg-[#a6ff00] text-black font-semibold border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:bg-green-300"
          >
            ⭐ View on GitHub
          </a>
        </section>
      </div>
    </div>
  );
}
