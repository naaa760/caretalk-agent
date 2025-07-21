"use client";

import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

export default function Home() {
  const emotions = [
    { value: 0, label: "😔 Down", color: "from-blue-500/50" },
    { value: 25, label: "😊 Content", color: "from-green-500/50" },
    { value: 50, label: "😌 Peaceful", color: "from-purple-500/50" },
    { value: 75, label: "🤗 Happy", color: "from-yellow-500/50" },
    { value: 100, label: "✨ Excited", color: "from-pink-500/50" },
  ];

  const [emotion, setEmotion] = useState(50);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentEmotion =
    emotions.find((em) => Math.abs(emotion - em.value) < 15) || emotions[2];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/beam.jpg"
        alt="Background Beam"
        fill
        style={{ objectFit: "cover" }}
        className="-z-10 opacity-80"
        priority
      />
      {/* Large heading and subheading styled like the reference image, now larger and with a beige-white-silver glittery gradient */}
      <div className="w-full flex flex-col items-center justify-center mb-8 mt-32">
        <h1
          className="text-center font-extrabold leading-[1] tracking-[-0.04em] uppercase font-sans text-[8vw] md:text-[6vw] glitter-text"
          style={{
            fontFamily: "Montserrat, Oswald, Arial, sans-serif",
            letterSpacing: "-0.04em",
            background:
              "linear-gradient(135deg, #d4af37 0%, #f5e6d3 15%, #e6ddd4 30%, #d3d3d3 45%, #c0c0c0 60%, #b8b8b8 75%, #a8a8a8 90%, #9e9e9e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            filter:
              "drop-shadow(0 0 15px rgba(192, 192, 192, 0.5)) drop-shadow(0 0 30px rgba(212, 175, 55, 0.3))",
          }}
        >
          Find Peace
          <br />
          <span className="block">of Mind</span>
        </h1>
        <span
          className="block text-center text-[1.5rem] md:text-[2rem] font-serif font-bold italic -mt-4 mb-2 bg-gradient-to-r from-[#f5e9da] via-white to-[#c0c0c0] bg-clip-text text-transparent drop-shadow-lg"
          style={{ fontFamily: "Georgia, Times, serif" }}
        ></span>
        <br />
        <br />
        <p
          className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl text-center mt-2 max-w-2xl drop-shadow-lg px-4 sm:px-6 md:px-8 mx-auto"
          style={{
            fontFamily: "'Kalam', 'Comfortaa', 'Quicksand', cursive",
            fontWeight: "400",
            letterSpacing: "0.5px",
            lineHeight: "1.7",
            padding: "0 1rem",
            textShadow:
              "0 2px 8px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.1)",
          }}
        >
          Experience a new way of emotional support. Our AI companion is here to
          listen, understand, and guide you through life's journey.
          <style jsx>{`
            @import url("https://fonts.googleapis.com/css2?family=Kalam:wght@300;400&family=Comfortaa:wght@300;400&family=Quicksand:wght@300;400&display=swap");
          `}</style>
        </p>
      </div>
      {/* Emotion slider section only, no background or extra styling */}
      <div className="w-full max-w-[600px] mx-auto space-y-6 py-8">
        <div className="space-y-2 text-center">
          <p className="text-sm text-white font-medium">
            Whatever you're feeling, we're here to listen
          </p>
          <div className="flex justify-between items-center px-2">
            {emotions.map((em) => (
              <div
                key={em.value}
                className={`transition-all duration-500 ease-out cursor-pointer hover:scale-105 ${
                  Math.abs(emotion - em.value) < 15
                    ? "opacity-100 scale-110 transform-gpu"
                    : "opacity-50 scale-100"
                }`}
                onClick={() => setEmotion(em.value)}
              >
                <div className="text-2xl transform-gpu">
                  {em.label.split(" ")[0]}
                </div>
                <div className="text-xs text-white mt-1 font-medium">
                  {em.label.split(" ")[1]}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative px-2">
          <Slider
            value={[emotion]}
            onValueChange={(value) => setEmotion(value[0])}
            min={0}
            max={100}
            step={1}
            className="py-4"
          />
        </div>
        <div className="text-center">
          <p className="text-sm text-white animate-pulse">
            Slide to express how you're feeling today
          </p>
        </div>
      </div>
    </div>
  );
}
