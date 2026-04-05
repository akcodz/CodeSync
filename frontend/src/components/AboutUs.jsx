import { FaCode, FaUsers, FaRocket } from "react-icons/fa";

const AboutUs = () => {
  const sections = [
    {
      icon: <FaCode size={28} className="text-zinc-300" />,
      title: "Modern Collaborative Coding",
      description:
        "CodeSync provides a real-time coding environment where developers can write, edit, and review code together seamlessly. Built for interviews, pair programming, and team collaboration — all directly in the browser.",
    },
    {
      icon: <FaUsers size={28} className="text-zinc-300" />,
      title: "Built for Teams & Individuals",
      description:
        "Whether you're preparing for coding interviews, working on projects with friends, or mentoring others, CodeSync enables a shared coding experience with zero setup and instant synchronization.",
    },
    {
      icon: <FaRocket size={28} className="text-zinc-300" />,
      title: "AI-Powered Productivity",
      description:
        "With integrated AI code review, smart suggestions, and real-time feedback, CodeSync helps developers write better code faster — reducing debugging time and improving overall efficiency.",
    },
  ];

  return (
    <section className="bg-[#121212] text-zinc-300 py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight">
            About CodeSync
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            CodeSync is a real-time collaborative coding platform designed to
            simplify how developers build, learn, and work together — powered by
            intelligent tooling and seamless communication.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-[#181818] border border-zinc-800 
              hover:border-zinc-600 transition-all duration-300"
            >
              {/* ICON */}
              <div className="mb-4">{section.icon}</div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                {section.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-zinc-400 leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>

        {/* FOOTER STATEMENT */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-zinc-400 text-sm leading-relaxed">
            Our mission is to redefine collaborative development by combining
            real-time interaction with intelligent assistance — enabling
            developers to focus on what truly matters: building great software.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;