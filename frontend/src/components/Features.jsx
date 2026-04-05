import React from "react";

const features = [
  {
    icon: "ri-terminal-box-line",
    title: "Real-time Collaboration",
    description:
      "Code together with teammates in a shared editor with instant synchronization and zero setup.",
    size: "md:col-span-2",
  },
  {
    icon: "ri-video-line",
    title: "Video Calls for Interviews",
    description:
      "Conduct technical interviews or pair programming sessions with built-in video calling.",
    size: "",
  },
  {
    icon: "ri-chat-3-line",
    title: "Live Chat",
    description:
      "Communicate seamlessly with collaborators using integrated real-time chat.",
    size: "",
  },
  {
    icon: "ri-cpu-line",
    title: "AI Code Assistance",
    description:
      "Get instant code suggestions, optimizations, and feedback powered by AI.",
    size: "md:col-span-2",
  },
  {
    icon: "ri-bug-line",
    title: "Run & Debug Code",
    description:
      "Execute code instantly and identify errors with real-time output and debugging support.",
    size: "",
  },
  {
    icon: "ri-book-open-line",
    title: "Practice & Upskill",
    description:
      "Solve curated coding problems and improve your skills with built-in practice tools.",
    size: "",
  },
  {
  icon: "ri-robot-line",
  title: "AI Code Review",
  description:
    "Analyze your code with AI-powered insights covering performance, edge cases, and clean coding practices in real time.",
  size: "",
}
];

const Features = () => {
  return (
    <section className="bg-[#121212] py-20 text-zinc-300">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight">
            Why Choose CodeSync?
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg">
            Everything you need to collaborate, practice, and build — all in one platform.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid md:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl bg-[#181818] border border-zinc-800 
              hover:border-zinc-600 transition-all duration-300 
              flex flex-col gap-3 ${feature.size}`}
            >
              {/* ICON */}
              <div className="text-3xl text-zinc-300">
                <i className={feature.icon}></i>
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-zinc-100">
                {feature.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;