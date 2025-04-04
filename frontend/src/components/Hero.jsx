import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";

const Hero = () => {
  const [text, setText] = useState(`
import React from 'react';

// Main Component
const App = () => {
  const message = "Welcome to Your Collaborative Code Editor 🚀";

  const features = [
    "Real-time AI Assistance ✅",
    "Collaborate Seamlessly ✨",
    "Smart Code Suggestions ⚡",
    "Instant Error Detection 🔍",
    "Enhanced Coding Speed 💻"
  ];

  const renderFeatures = () => {
    return features.map((feature, index) => (
      <li key={index}>{feature}</li>
    ));
  };

  console.log("Happy Coding! 🚀");

  return (
    <div>
      <h1>{message}</h1>
      <ul>{renderFeatures()}</ul>
    </div>
  );
};

export default App;
`);

  useEffect(() => {
    prism.highlightAll();
  }, [text]);


  return (
    <section className="w-full h-screen bg-[#121212] p-8 pt-12 overflow-hidden">
      <h1 className="text-8xl font-heading text-gray-300 text-center">
        Your Code Editor.
        <br /> Supercharged with AI.
      </h1>
      <div className="relative h-[70%] w-[80%] mx-auto mt-16">
        {/* Highlighted Code */}
        <pre className="p-4 h-full rounded-lg border-2 border-gray-700 shadow-2xl shadow-gray-600 overflow-auto"
          style={{ backgroundColor: "#171717", fontSize: "1.3rem" }}
        >
          <code className="language-javascript">{text}</code>
        </pre>

    
      </div>
    </section>
  );
};

export default Hero;
