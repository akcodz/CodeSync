import { FaCode, FaUsers, FaRocket } from "react-icons/fa";

const AboutUs = () => {
  const sections = [
    {
      icon: <FaCode size={40} className="text-blue-400" />,
      title: "Let’s Build the Future of <span className='text-blue-400'>Coding</span> Together.",
      description: (
        <>
          At <span className="text-green-400">Live Script</span>, we empower <span className="text-yellow-400">developers</span> to collaborate in real-time, making <span className="text-red-400">coding seamless</span> and interactive.
          Whether you're a <span className="text-pink-400">solo coder</span> or working with a <span className="text-purple-400">team</span>, build, debug, and innovate—without limits.
        </>
      )
    },
    {
      icon: <FaUsers size={40} className="text-yellow-400" />,
      title: "<span className='text-yellow-400'>Our Journey</span>",
      description: (
        <>
          Live Script was born out of the <span className="text-blue-400">need</span> for a <span className="text-green-400">seamless real-time coding experience</span>. We envisioned a <span className="text-red-400">platform</span> where developers could <span className="text-yellow-400">collaborate</span> without constraints, enhancing <span className="text-purple-400">productivity</span> and innovation.
        </>
      )
    },
    {
      icon: <FaRocket size={40} className="text-purple-400" />,
      title: "Our <span className='text-purple-400'>Core Values</span>",
      description: (
        <>
          At <span className="text-green-400">Live Script</span>, we are driven by a commitment to <span className="text-blue-400">innovation</span>, <span className="text-yellow-400">collaboration</span>, and <span className="text-red-400">excellence</span>. Our core values define our <span className="text-pink-400">mission</span> and guide us in building the <span className="text-purple-400">ultimate real-time coding platform</span>.
        </>
      )
    }
  ];

  return (
    <section className="text-gray-300 py-16 px-8">
         {/* Heading */}
         <h2 className="text-5xl font-bold font-heading  text-center mb-12">
          Who Are We?
        </h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 font-body">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-gray-950 p-6 rounded-lg shadow-md text-white border border-gray-600 hover:shadow-xl  min-w-[300px] hover:border-gray-500  hover:scale-105 transition-all duration-500 ease-in-out "
          >
            <div className="mb-4 flex justify-center">{section.icon}</div>
            <h3
              className="text-2xl font-bold mb-4"
              dangerouslySetInnerHTML={{ __html: section.title }}
            />
            <p className="text-gray-400 text-lg">{section.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
