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
            <div className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] bg-purple-300 opacity-40 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-[-40px] right-[-40px] w-[250px] h-[250px] bg-lime-400 opacity-35 rounded-full blur-[70px]"></div>
            <div className="absolute top-1/3 right-1/4 w-[200px] h-[150px] bg-purple-300 opacity-35 rounded-full blur-[60px]"></div>
            <div className="absolute top-1/2 left-1/3 w-[180px] h-[180px] bg-green-400 opacity-30 rounded-full blur-[50px]"></div>
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

        {/* New Testimonial Cards Section */}
        <div className="w-full py-12 px-4 bg-white relative overflow-hidden">
          {/* Purple and Green Shining Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] bg-purple-300 opacity-40 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-[-40px] right-[-40px] w-[250px] h-[250px] bg-lime-400 opacity-35 rounded-full blur-[70px]"></div>
            <div className="absolute top-1/3 right-1/4 w-[200px] h-[150px] bg-purple-300 opacity-35 rounded-full blur-[60px]"></div>
            <div className="absolute top-1/2 left-1/3 w-[180px] h-[180px] bg-lime-400 opacity-30 rounded-full blur-[50px]"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-medium mb-3 leading-tight"
                style={{
                  fontFamily: "'Playfair Display', 'Times New Roman', serif",
                  background:
                    "linear-gradient(90deg, #e6e6fa 0%, #e0cfff 30%, #b39ddb 60%, #000000 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                  filter:
                    "drop-shadow(0 0 20px rgba(179, 157, 219, 0.25)) drop-shadow(0 0 40px rgba(0,0,0,0.18))",
                  textShadow:
                    "0 0 30px rgba(179, 157, 219, 0.18), 0 0 60px rgba(0,0,0,0.12)",
                }}
              >
                People are at the
                <br />
                heart of what we do
              </h1>
              <p
                className="text-sm md:text-base text-gray-600 max-w-lg mx-auto italic"
                style={{
                  fontFamily:
                    "'Dancing Script', 'Pacifico', 'Great Vibes', cursive",
                }}
              >
                We collaborate with thousands of creators, entrepreneurs and
                complete legends.
              </p>
            </div>

            {/* Cards Container - Compact Fan Layout */}
            <div className="relative flex justify-center items-center h-96 mb-8 max-w-5xl mx-auto">
              {/* Card 1 - Far Left */}
              <div className="absolute left-0 top-8 transform -rotate-3 z-10 hover:rotate-0 hover:scale-105 transition-all duration-300 hover:z-50">
                <div className="w-56 h-40 bg-gradient-to-br from-purple-100 via-blue-50 to-white rounded-2xl p-5 shadow-xl border border-white/80">
                  <p
                    className="text-gray-700 text-sm leading-tight mb-3 italic font-normal"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    "Sam is the first external PM recruiter I've spoken with who
                    gets it. His understanding of the PM space"
                  </p>
                  <div className="flex items-center mt-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 shadow-md">
                      MJ
                    </div>
                    <div>
                      <p
                        className="text-gray-800 font-medium text-sm"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Michal Jhon
                      </p>
                      <p
                        className="text-gray-600 text-xs"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        28 years
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Left */}
              <div className="absolute left-1/4 top-4 transform -rotate-2 z-20 hover:rotate-0 hover:scale-105 transition-all duration-300 hover:z-50">
                <div className="w-56 h-40 bg-gradient-to-br from-pink-100 via-orange-50 to-white rounded-2xl p-5 shadow-xl border border-white/80">
                  <p
                    className="text-gray-700 text-sm leading-tight mb-3 italic font-normal"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    "Sam is the first external PM recruiter I've spoken with who
                    gets it. His understanding of the PM space"
                  </p>
                  <div className="flex items-center mt-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 shadow-md">
                      SJ
                    </div>
                    <div>
                      <p
                        className="text-gray-800 font-medium text-sm"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Sarah Johnson
                      </p>
                      <p
                        className="text-gray-600 text-xs"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        32 years
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Center */}
              <div className="relative z-30 transform hover:scale-105 transition-all duration-300">
                <div className="w-60 h-44 bg-gradient-to-br from-green-100 via-yellow-50 to-white rounded-2xl p-6 shadow-2xl border border-white/80">
                  <p
                    className="text-gray-700 text-sm leading-tight mb-3 italic font-normal"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    "Sam is the first external PM recruiter I've spoken with who
                    gets it. His understanding of the PM space"
                  </p>
                  <div className="flex items-center mt-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-lime-200 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 shadow-md">
                      DK
                    </div>
                    <div>
                      <p
                        className="text-gray-800 font-medium text-sm"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        David Kim
                      </p>
                      <p
                        className="text-gray-600 text-xs"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        29 years
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4 - Right */}
              <div className="absolute right-1/4 top-4 transform rotate-2 z-20 hover:rotate-0 hover:scale-105 transition-all duration-300 hover:z-50">
                <div className="w-56 h-40 bg-gradient-to-br from-orange-100 via-pink-50 to-white rounded-2xl p-5 shadow-xl border border-white/80">
                  <p
                    className="text-gray-700 text-sm leading-tight mb-3 italic font-normal"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    "Sam is the first external PM recruiter I've spoken with who
                    gets it. His understanding of the PM space"
                  </p>
                  <div className="flex items-center mt-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-lime-200 to-blue-200 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 shadow-md">
                      AL
                    </div>
                    <div>
                      <p
                        className="text-gray-800 font-medium text-sm"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Alex Lee
                      </p>
                      <p
                        className="text-gray-600 text-xs"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        26 years
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5 - Far Right */}
              <div className="absolute right-0 top-8 transform rotate-3 z-10 hover:rotate-0 hover:scale-105 transition-all duration-300 hover:z-50">
                <div className="w-56 h-40 bg-gradient-to-br from-yellow-100 via-orange-50 to-white rounded-2xl p-5 shadow-xl border border-white/80">
                  <p
                    className="text-gray-700 text-sm leading-tight mb-3 italic font-normal"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    "Sam is the first external PM recruiter I've spoken with who
                    gets it. His understanding of the PM space"
                  </p>
                  <div className="flex items-center mt-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 shadow-md">
                      RW
                    </div>
                    <div>
                      <p
                        className="text-gray-800 font-medium text-sm"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Rachel Wong
                      </p>
                      <p
                        className="text-gray-600 text-xs"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        31 years
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Solar System Section */}
        <div className="w-full py-20 px-4 relative overflow-hidden bg-black">
          {/* Purple and Green Shining Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-300 opacity-20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] bg-lime-400 opacity-15 rounded-full blur-[80px]"></div>
            <div className="absolute top-1/2 left-1/4 w-[200px] h-[200px] bg-blue-400 opacity-10 rounded-full blur-[60px]"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Mobile Layout - Stacked */}
            <div className="md:hidden space-y-8">
              {/* Top Text Blocks */}
              <div className="grid grid-cols-1 gap-6">
                <div className="text-center">
                  <h3
                    className="text-2xl font-semibold mb-3 bg-gradient-to-r from-purple-400 via-purple-300 to-white bg-clip-text text-transparent tracking-tight leading-tight"
                    style={{
                      fontFamily:
                        "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                    }}
                  >
                    Equal breathe
                  </h3>
                  <p
                    className="text-gray-300 text-sm leading-relaxed font-light tracking-wide"
                    style={{
                      fontFamily:
                        "'Inter', 'SF Pro Text', -apple-system, sans-serif",
                    }}
                  >
                    There is no one-size-fits-all solution to mental well-being.
                    Aura is the first all.
                  </p>
                </div>
                <div className="text-center">
                  <h3
                    className="text-2xl font-semibold mb-3 bg-gradient-to-r from-lime-400 via-lime-300 to-blue-300 bg-clip-text text-transparent tracking-tight leading-tight"
                    style={{
                      fontFamily:
                        "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                    }}
                  >
                    Reduce anxiety
                  </h3>
                  <p
                    className="text-gray-300 text-sm leading-relaxed font-light tracking-wide"
                    style={{
                      fontFamily:
                        "'Inter', 'SF Pro Text', -apple-system, sans-serif",
                    }}
                  >
                    There is no one-size-fits-all solution to mental well-being.
                    Aura is the first all.
                  </p>
                </div>
              </div>

              {/* Central Solar System Graphic */}
              <div className="flex justify-center">
                <div className="relative w-64 h-64 flex items-center justify-center">
                  {/* Central Image - Meditation figure */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <img
                      src="/sol.png"
                      alt="Central Meditation"
                      className="w-20 h-20"
                    />
                  </div>
                  {/* Orbital Rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border border-gray-600/30 rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-44 h-44 border border-gray-600/20 rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-56 h-56 border border-gray-600/10 rounded-full"></div>
                  </div>
                  {/* Orbital Elements */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-lime-400 rounded-full"></div>
                  <div className="absolute top-1/4 left-4 w-2.5 h-2.5 bg-orange-400 rounded-full"></div>
                  <div className="absolute top-1/4 right-4 w-2.5 h-2.5 bg-purple-400 rounded-full"></div>
                  <div className="absolute top-1/2 right-1 w-2.5 h-2.5 bg-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">+</span>
                  </div>
                  <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-300 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-2.5 h-2.5 bg-lime-300 rounded-full"></div>
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-300 rounded-full flex items-center justify-center">
                    <div className="w-2 h-1 bg-pink-300 rounded-full"></div>
                  </div>
                  {/* Decorative Plus Signs */}
                  <div className="absolute top-8 left-8 text-yellow-400 text-xs">
                    +
                  </div>
                  <div className="absolute top-12 right-12 text-yellow-400 text-xs">
                    +
                  </div>
                  <div className="absolute bottom-8 left-12 text-yellow-400 text-xs">
                    +
                  </div>
                  <div className="absolute bottom-12 right-8 text-yellow-400 text-xs">
                    +
                  </div>
                </div>
              </div>

              {/* Bottom Text Blocks */}
              <div className="grid grid-cols-1 gap-6">
                <div className="text-center">
                  <h3
                    className="text-2xl font-semibold mb-3 bg-gradient-to-r from-blue-300 via-blue-200 to-lime-400 bg-clip-text text-transparent tracking-tight leading-tight"
                    style={{
                      fontFamily:
                        "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                    }}
                  >
                    Muscle backpain
                  </h3>
                  <p
                    className="text-gray-300 text-sm leading-relaxed font-light tracking-wide"
                    style={{
                      fontFamily:
                        "'Inter', 'SF Pro Text', -apple-system, sans-serif",
                    }}
                  >
                    There is no one-size-fits-all solution to mental well-being.
                    Aura is the first all.
                  </p>
                </div>
                <div className="text-center">
                  <h3
                    className="text-2xl font-semibold mb-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-lime-400 bg-clip-text text-transparent tracking-tight leading-tight"
                    style={{
                      fontFamily:
                        "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                    }}
                  >
                    Stress reduce
                  </h3>
                  <p
                    className="text-gray-300 text-sm leading-relaxed font-light tracking-wide"
                    style={{
                      fontFamily:
                        "'Inter', 'SF Pro Text', -apple-system, sans-serif",
                    }}
                  >
                    There is no one-size-fits-all solution to mental well-being.
                    Aura is the first all.
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Original Corner Positioning */}
            <div className="hidden md:flex min-h-[420px] items-center justify-center relative">
              {/* Four Text Sections - Corners, slightly closer to center */}
              <div className="absolute top-6 left-6 w-48 text-left">
                <h3
                  className="text-3xl font-semibold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-white bg-clip-text text-transparent tracking-tight leading-tight"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                  }}
                >
                  Equal breathe
                </h3>
                <p
                  className="text-gray-300 text-sm leading-relaxed font-light tracking-wide"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Text', -apple-system, sans-serif",
                  }}
                >
                  There is no one-size-fits-all solution to mental well-being.
                  Aura is the first all.
                </p>
              </div>
              <div className="absolute top-6 right-6 w-48 text-right">
                <h3
                  className="text-3xl font-semibold mb-4 bg-gradient-to-r from-lime-400 via-lime-300 to-blue-300 bg-clip-text text-transparent tracking-tight leading-tight"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                  }}
                >
                  Reduce anxiety
                </h3>
                <p
                  className="text-gray-300 text-sm leading-relaxed font-light tracking-wide"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Text', -apple-system, sans-serif",
                  }}
                >
                  There is no one-size-fits-all solution to mental well-being.
                  Aura is the first all.
                </p>
              </div>
              <div className="absolute bottom-6 left-6 w-48 text-left">
                <h3
                  className="text-3xl font-semibold mb-4 bg-gradient-to-r from-blue-300 via-blue-200 to-lime-400 bg-clip-text text-transparent tracking-tight leading-tight"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                  }}
                >
                  Muscle backpain
                </h3>
                <p
                  className="text-gray-300 text-sm leading-relaxed font-light tracking-wide"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Text', -apple-system, sans-serif",
                  }}
                >
                  There is no one-size-fits-all solution to mental well-being.
                  Aura is the first all.
                </p>
              </div>
              <div className="absolute bottom-6 right-6 w-48 text-right">
                <h3
                  className="text-3xl font-semibold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-300 to-lime-400 bg-clip-text text-transparent tracking-tight leading-tight"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                  }}
                >
                  Stress reduce
                </h3>
                <p
                  className="text-gray-300 text-sm leading-relaxed font-light tracking-wide"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Text', -apple-system, sans-serif",
                  }}
                >
                  There is no one-size-fits-all solution to mental well-being.
                  Aura is the first all.
                </p>
              </div>
              {/* Central Solar System Graphic - Centered */}
              <div className="relative w-80 h-80 flex items-center justify-center mx-auto">
                {/* Central Image - Meditation figure */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <img
                    src="/sol.png"
                    alt="Central Meditation"
                    className="w-30 h-30"
                  />
                </div>
                {/* Orbital Rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 border border-gray-600/30 rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-56 h-56 border border-gray-600/20 rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 border border-gray-600/10 rounded-full"></div>
                </div>
                {/* Orbital Elements */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-lime-400 rounded-full"></div>
                <div className="absolute top-1/4 left-6 w-3 h-3 bg-orange-400 rounded-full"></div>
                <div className="absolute top-1/4 right-6 w-3 h-3 bg-purple-400 rounded-full"></div>
                <div className="absolute top-1/2 right-2 w-3 h-3 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">+</span>
                </div>
                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-300 rounded-full"></div>
                <div className="absolute bottom-6 right-6 w-3 h-3 bg-lime-300 rounded-full"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-purple-300 rounded-full flex items-center justify-center">
                  <div className="w-3 h-1 bg-pink-300 rounded-full"></div>
                </div>
                {/* Decorative Plus Signs */}
                <div className="absolute top-12 left-12 text-yellow-400 text-xs">
                  +
                </div>
                <div className="absolute top-16 right-16 text-yellow-400 text-xs">
                  +
                </div>
                <div className="absolute bottom-12 left-16 text-yellow-400 text-xs">
                  +
                </div>
                <div className="absolute bottom-16 right-12 text-yellow-400 text-xs">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Showcase Section - Medimind */}
        <div className="w-full min-h-[60vh] bg-gradient-to-b from-white via-[#fff7f2] to-[#fbeee6] flex flex-col justify-between relative overflow-hidden pt-16 pb-8">
          {/* Wavy background image */}
          <img
            src="/wavy.png"
            alt="Wavy background"
            className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none z-0"
          />
          {/* Soft top fade */}
          <div className="absolute top-0 left-0 w-full h-20 z-10 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-b from-white/90 via-white/60 to-transparent blur-md"></div>
          </div>
          {/* Soft bottom fade */}
          <div className="absolute bottom-0 left-0 w-full h-20 z-10 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-t from-[#fbeee6]/90 via-[#fff7f2]/60 to-transparent blur-md"></div>
          </div>
          {/* Mobile layout */}
          <div className="flex flex-col items-center justify-center w-full md:hidden z-10">
            <span
              className="block text-base font-serif text-gray-400 mb-1 tracking-wide"
              style={{ fontWeight: 300, letterSpacing: "0.08em" }}
            >
              Follow us
            </span>
            <span
              className="block text-2xl font-serif font-bold bg-gradient-to-r from-black via-gray-700 to-black text-transparent bg-clip-text drop-shadow-lg tracking-tight leading-none mb-4"
              style={{
                fontFamily: "'Playfair Display',serif",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                textShadow: "0 2px 24px #b39ddb55, 0 1px 0 #fff",
              }}
            >
              @MEDIMIND
            </span>
            <div className="grid grid-cols-3 gap-3 w-full max-w-xs mx-auto mb-6">
              <div className="w-full aspect-square rounded-xl overflow-hidden shadow-md border border-white/30">
                <img
                  src="/k.png"
                  alt="k"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full aspect-square rounded-xl overflow-hidden shadow-md border border-white/30">
                <img
                  src="/k1.png"
                  alt="k1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full aspect-square rounded-xl overflow-hidden shadow-md border border-white/30">
                <img
                  src="/k2.png"
                  alt="k2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full aspect-square rounded-xl overflow-hidden shadow-md border border-white/30">
                <img
                  src="/k3.png"
                  alt="k3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full aspect-square rounded-xl overflow-hidden shadow-md border border-white/30">
                <img
                  src="/k4.png"
                  alt="k4"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full aspect-square rounded-xl overflow-hidden shadow-md border border-white/30">
                <img
                  src="/k5.png"
                  alt="k5"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Footer - mobile */}
            <div className="w-full flex flex-col items-center gap-2 px-2 mt-2 z-20">
              <div className="flex items-center gap-2 mb-1">
                <img src="/logo.svg" alt="Medimind Logo" className="w-6 h-6" />
                <span className="font-serif font-semibold text-base text-gray-800">
                  Medimind
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-1">
                © 2077 Musefit. All rights reserved.
              </div>
              <div className="flex items-center gap-2">
                <a href="#" aria-label="Twitter" className="hover:opacity-80">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.28 0-.56-.02-.83-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:opacity-80">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook" className="hover:opacity-80">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .729.592 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.729 0 1.324-.595 1.324-1.324v-21.35c0-.733-.595-1.325-1.324-1.325z" />
                  </svg>
                </a>
                <a href="#" aria-label="Peace" className="hover:opacity-80">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8zm1-7h3a1 1 0 1 0 0-2h-3V7a1 1 0 1 0-2 0v3H7a1 1 0 1 0 0 2h3v3a1 1 0 1 0 2 0v-3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Desktop layout (hidden on mobile) */}
          <div className="relative flex flex-col items-center justify-center min-h-[40vh] w-full hidden md:flex">
            {/* Colored glows behind images */}
            <div className="absolute left-10 top-10 w-40 h-40 bg-purple-200 opacity-30 rounded-full blur-2xl z-0"></div>
            <div className="absolute right-10 top-20 w-44 h-44 bg-pink-200 opacity-25 rounded-full blur-2xl z-0"></div>
            <div
              className="absolute left-1/2 bottom-0 w-56 h-32 bg-yellow-100 opacity-30 rounded-full blur-2xl z-0"
              style={{ transform: "translateX(-50%)" }}
            ></div>
            {/* Images - scattered layout */}
            <div className="relative w-full max-w-4xl h-[320px] mx-auto z-10">
              {/* Top left small */}
              <div
                className="absolute left-0 top-16 w-24 h-24 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md border border-white/40 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ zIndex: 2 }}
              >
                <img
                  src="/k.png"
                  alt="k"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/60 to-transparent"></div>
              </div>
              {/* Bottom left large */}
              <div
                className="absolute left-24 bottom-0 w-40 h-40 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md border border-white/40 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ zIndex: 3 }}
              >
                <img
                  src="/k1.png"
                  alt="k1"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/60 to-transparent"></div>
              </div>
              {/* Top center large */}
              <div
                className="absolute left-1/2 top-0 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md border border-white/40 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ transform: "translateX(-50%)", zIndex: 4 }}
              >
                <img
                  src="/k2.png"
                  alt="k2"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200/60 to-transparent"></div>
              </div>
              {/* Bottom center medium */}
              <div
                className="absolute left-1/2 bottom-0 w-36 h-36 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md border border-white/40 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ transform: "translateX(-50%)", zIndex: 3 }}
              >
                <img
                  src="/k3.png"
                  alt="k3"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-200/60 to-transparent"></div>
              </div>
              {/* Top right large */}
              <div
                className="absolute right-24 top-4 w-44 h-44 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md border border-white/40 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ zIndex: 3 }}
              >
                <img
                  src="/k4.png"
                  alt="k4"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/60 to-transparent"></div>
              </div>
              {/* Bottom right small */}
              <div
                className="absolute right-0 bottom-12 w-24 h-24 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md border border-white/40 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ zIndex: 2 }}
              >
                <img
                  src="/k5.png"
                  alt="k5"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200/60 to-transparent"></div>
              </div>
            </div>
            {/* Centered text */}
            <div
              className="absolute left-1/2 top-1/2 flex flex-col items-center"
              style={{ transform: "translate(-50%,-50%)", zIndex: 10 }}
            >
              <span
                className="block text-lg md:text-xl font-serif text-gray-400 mb-2 tracking-wide"
                style={{ fontWeight: 300, letterSpacing: "0.08em" }}
              >
                Follow us
              </span>
              <span
                className="block text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-serif font-bold bg-gradient-to-r from-black via-gray-700 to-black text-transparent bg-clip-text drop-shadow-lg tracking-tight leading-none"
                style={{
                  fontFamily: "'Playfair Display',serif",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  textShadow: "0 2px 24px #b39ddb55, 0 1px 0 #fff",
                }}
              >
                @MEDIMIND
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
