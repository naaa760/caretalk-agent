"use client";

import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect, useRef } from "react";

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
    const timeout = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  const currentEmotion =
    emotions.find((em) => Math.abs(emotion - em.value) < 15) || emotions[2];

  // Carousel logic for Meditation Cards Carousel Section
  const cardCount = 6;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const scrollToCard = (idx) => {
    setActiveIndex(idx);
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector("div > div");
      if (card) {
        const cardWidth = card.offsetWidth + 24; // 24px gap (space-x-6)
        scrollRef.current.scrollTo({
          left: cardWidth * idx,
          behavior: "smooth",
        });
      }
    }
  };

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

      <br />
      {/* Main content with fade-in animation */}
      <div
        className={`transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } w-full flex flex-col items-center justify-center`}
      >
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
            Experience a new way of emotional support. Our AI companion is here
            to listen, understand, and guide you through life's journey.
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
        {/* Spacer to push carousel below the fold */}
        <div style={{ minHeight: "24vh" }}></div>
        {/* Meditation Cards Carousel Section */}
        <div className="w-full mt-4 bg-black py-16 px-4 relative overflow-hidden">
          {/* Soft white fade border */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div
              className="absolute inset-0 rounded-3xl border-0"
              style={{
                boxShadow: "0 0 60px 20px rgba(255,255,255,0.18)",
                filter: "blur(8px)",
              }}
            ></div>
          </div>
          {/* Purple and Green Shining Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] bg-purple-300 opacity-30 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-[-40px] right-[-40px] w-[250px] h-[250px] bg-lime-400 opacity-25 rounded-full blur-[70px]"></div>
            <div className="absolute top-1/3 right-1/4 w-[200px] h-[150px] bg-purple-300 opacity-20 rounded-full blur-[60px]"></div>
          </div>
          <div className="relative z-10 rounded-3xl overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 max-w-7xl mx-auto">
              <h2
                className="text-white text-4xl md:text-5xl font-serif mb-6 md:mb-0"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                The best sleep of your life is just the start
              </h2>
              <button className="bg-orange-300 hover:bg-orange-300 text-white text-sm px-3 py-1.5 rounded-full font-medium flex items-center gap-2 transition-all duration-300 md:text-lg md:px-6 md:py-3 w-32 md:w-auto max-w-32 md:max-w-none">
                Explore more
                <span className="inline-block bg-orange-300 rounded-full p-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17l9.2-9.2M17 17V7H7"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div
              className="w-full overflow-x-auto max-w-7xl mx-auto scrollbar-hide"
              ref={scrollRef}
              style={{ scrollBehavior: "smooth" }}
            >
              <div
                className="flex space-x-6 pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* Cards */}
                {/* ... six card divs as before ... */}
                <div className="relative flex-shrink-0 w-80 h-96 rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105 bg-black">
                  <img
                    src="/1.jpg"
                    alt="Meditation 1"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-300/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                    <h3
                      className="text-white text-lg font-normal"
                      style={{
                        fontFamily: "'Inter', 'Segoe UI', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      Staying Track
                    </h3>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="relative flex-shrink-0 w-80 h-96 rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105 bg-black">
                  <img
                    src="/2.jpg"
                    alt="Meditation 2"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-orange-400/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                    <h3
                      className="text-white text-lg font-normal"
                      style={{
                        fontFamily: "'Inter', 'Segoe UI', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      Staying Track
                    </h3>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="relative flex-shrink-0 w-80 h-96 rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105 bg-black">
                  <img
                    src="/3.jpg"
                    alt="Meditation 3"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-lime-400/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                    <h3
                      className="text-white text-lg font-normal"
                      style={{
                        fontFamily: "'Inter', 'Segoe UI', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      Staying Track
                    </h3>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                {/* New cards for 4.jpg, 5.jpg, 6.jpg */}
                <div className="relative flex-shrink-0 w-80 h-96 rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105 bg-black">
                  <img
                    src="/4.jpg"
                    alt="Meditation 4"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-300/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                    <h3
                      className="text-white text-lg font-normal"
                      style={{
                        fontFamily: "'Inter', 'Segoe UI', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      Staying Track
                    </h3>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="relative flex-shrink-0 w-80 h-96 rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105 bg-black">
                  <img
                    src="/5.jpg"
                    alt="Meditation 5"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-orange-400/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                    <h3
                      className="text-white text-lg font-normal"
                      style={{
                        fontFamily: "'Inter', 'Segoe UI', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      Staying Track
                    </h3>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="relative flex-shrink-0 w-80 h-96 rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105 bg-black">
                  <img
                    src="/6.jpg"
                    alt="Meditation 6"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-lime-400/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                    <h3
                      className="text-white text-lg font-normal"
                      style={{
                        fontFamily: "'Inter', 'Segoe UI', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      Staying Track
                    </h3>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
            {/* Dots navigation */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: cardCount }).map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    activeIndex === idx ? "bg-white" : "bg-gray-500/40"
                  }`}
                  onClick={() => scrollToCard(idx)}
                  aria-label={`Go to card ${idx + 1}`}
                />
              ))}
            </div>
            <style jsx global>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
}
