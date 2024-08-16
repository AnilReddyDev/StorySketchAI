import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import HuggingAPI from "./HuggingAPI";
import textanimation from '../assets/textloadani.gif'
import { useNavigate } from "react-router-dom";
function GeminiAPI() {
  const [inputValue, setInputValue] = useState("");
  const [promptResponses, setPromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);
 const navigate =  useNavigate();
  const [image_prompts, setImage_prompts] = useState([]);
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAPHp4ROPNftGW2g9EyME_c5SmQ" // Replace with your actual API key
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    const value = localStorage.getItem("password");
    if (value === "sketch1234") {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [navigate]);
  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const completeInputValue = "I HAVE A STORY THAT I WANT TO TRANSLATE INTO A SERIES OF COMIC BOOK-STYLE IMAGES. PLEASE HELP ME DIVIDE THE STORY INTO KEY SCENES AND CREATE INDEPENDENT IMAGE GENERATION PROMPTS FOR EACH SCENE. EACH PROMPT SHOULD BE SELF-CONTAINED, FOCUSING ON A SPECIFIC MOMENT IN THE STORY WITH CLEAR DETAILS LIKE SHOT ANGLES, TYPES OF SHOTS (E.G., CLOSE-UP, WIDE-ANGLE), SPECIFIC ACTIONS, AND THE OVERALL VISUAL STYLE. THE PROMPTS SHOULD FOLLOW THE SEQUENCE OF THE STORY BUT BE WRITTEN IN A WAY THAT EACH ONE STANDS ALONE FOR ACCURATE IMAGE GENERATION.GENERATE THE PROMPTS INDIVIDUALLY, BUT, SHOULD INCLUDE THE EXACT SAME ELEMENTS LIKE THE TYPE OF SHIRT A PERSON WEARING OR THE ENVIRONMENT PRESENT IN ALL THE PROMPTS WHENEVER THE SAME PERSON OR ENVIRONMENT IS NARRATED. THE PROMPT SHOULD BE AS SIMPLE AND STRAIGHTFORWARD AS POSSIBLE WITHOUT ANY UNWANTED EMOTIONS. INCLUDE 'COMIC' KEYWORD IN EVERY PROMPT AT LAST. HERE'S THE STORY: "+ inputValue +" .PLEASE PROVIDE A LIST OF SEQUENTIAL, SELF-CONTAINED IMAGE GENERATION PROMPTS FOR EACH KEY SCENE. RETURN THE RESULT AS A PLAIN JSON ARRAY WITHOUT ANY ADDITIONAL FORMATTING, CODE BLOCKS, OR TEXT OUTSIDE OF THE ARRAY"
      console.log("Complete Input value", completeInputValue);
      const result = await model.generateContent(completeInputValue);
      setInputValue("");

      // Await the response text to get the full content
      let response = await result.response.text();

      // Ensure the response is correctly formatted JSON
      response = response.trim();
      if (response.startsWith("```json")) {
          response = response.replace(/^```json/, "").replace(/```$/, "");
      } else if (response.startsWith("```")) {
          response = response.replace(/^```/, "").replace(/```$/, "");
      }
      
      console.log("Response", response);
      const scenes = JSON.parse(response); // Parse the cleaned JSON string
      console.log("Scenes", scenes);

      // Extract prompts and update state
      const prompts = scenes.map((scene) => scene.prompt);
      setImage_prompts(scenes);
      setPromptResponses((prevResponses) => [...prevResponses, ...prompts]);

      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-hero-pattern bg-cover comic-neue-regular min-h-screen flex justify-center items-end bg-slate-50">
      <div className="w-full h-auto flex flex-col justify-center mb-8 gap-5">
        <div className="w-full flex justify-center mb-20 mt-5">
          {/* {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>This message is shown while your answer to your prompt is being generated</p>
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center gap-5">
              {promptResponses.map((promptResponse, index) => (
                <div key={index} className="w-7/12">
                  <pre
                    className={`response-text ${
                      index === promptResponses.length - 1 ? "fw-bold" : ""
                    } text-lg whitespace-pre-wrap `}
                  >
                    {promptResponse}
                  </pre>
                </div>
              ))}
            </div>
          )} */}{loading ? <p className="w-8/12 sm:w-5/12 mb-16 sm:mb-0 flex justify-start items-center gap-2 sm:gap-4 text-lg"> <img src={textanimation} className="w-10 h-5 font-bold" alt="loading..." /> Scenes creation is underway.</p> : image_prompts.length>0 &&
          <HuggingAPI image_prompts={promptResponses}/>
          }
        </div>
        <div className="w-full flex justify-center gap-2 sm:gap-5 fixed  bottom-0 py-5">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Give me a scene"
            className="form-control text-xl w-8/12 sm:w-4/12 h-14 rounded-xl border-gray-950 border-4 outline-none shadow-[3px_5px_0px_0px_rgba(0,0,0)] px-4  py-2 "
          />
          <button
            onClick={getResponseForGivenPrompt}
            className="bg-[#fff200]  hover:bg-[#fff200]/80  border-gray-950 border-4 text-black shadow-[3px_5px_0px_0px_rgba(0,0,0)] text-xl font-semibold py-2 px-6 sm:px-8 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default GeminiAPI;
