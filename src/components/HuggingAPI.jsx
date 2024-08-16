import React, { useEffect, useState } from "react";
import { HfInference } from "@huggingface/inference";
import imgloadanimation from '../assets/imgloadani.gif'
export default function HuggingAPI({image_prompts}) {
  const HF_TOKEN = "hf_neseCUcnhkTMCuCcMSUEHmeqnTeXkb";
  const inference = new HfInference(HF_TOKEN);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  console.log("Hugging API :", image_prompts);
  const prompts = image_prompts 
  const [count,setCount] = useState(1)
  const getImageResponses = async () => {
    try {
      console.log("getimageresponse called")
      console.log("count",count)
      setCount(count+1)
      setLoading(true);
      const imageResults = await Promise.all(
        prompts.map(async (prompt) => {
          const result = await inference.textToImage({
            model: "stabilityai/stable-diffusion-xl-base-1.0",
            inputs: prompt,
            parameters: {
              guidance_scale: 7.5,
              styles: ["comic sketch","pencil sketch","manga art"],
              num_inference_steps: 25,
              negative_prompt:[]
            },
          });

          // Convert Blob to an Object URL
          return URL.createObjectURL(result);
        })
      );

      setImages(imageResults); // Set all image sources

      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (image_prompts.length <= 0) return;
    getImageResponses();
  }, [image_prompts]);

  return (
    <div className="w-full comic-neue-regular min-h-screen flex flex-col text-xl justify-center items-center">
      {/* <h1 className="text-3xl font-mono"> Sketch AI</h1> */}
      {/* <button onClick={getImageResponses}  className="bg-orange-600 hover:bg-orange-700 font-mono font-medium text-xl text-white py-2 px-8 rounded-md">Generate Images</button> */}
      <div className="flex gap-5 flex-wrap justify-center">
        {loading ? <p className="flex flex-col justify-center items-center text-lg"><img src={imgloadanimation} className=" w-96" alt="loading" /> Generating Sketch Images...</p> : images.map((src, index) => (
          <div key={index}>
            {/* <h2> Image {index + 1}:</h2> */}
            <img src={src} alt={`Generated from Hugging Face API - Prompt ${index + 1}`}  className="mx-2  sm:w-96 sm:h-72 border border-gray-950 border-4"/>
          </div>
        ))}
      </div>
    </div>
  );
}
