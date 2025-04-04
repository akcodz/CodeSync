import React from "react";

const features = [
  {
    icon: "ri-terminal-box-line",
    title:"Realtime Collaboration",
    description: "<span class='text-yellow-400'>Work seamlessly</span> with your team in a <span class='text-purple-400'>shared coding environment</span>.",
    size: "col-span-2",
  },
  {
    icon: "ri-user-smile-line",
    title:"Team Friendly",
    description: "<span class='text-pink-400'>Easily invite collaborators</span> and manage <span class='text-purple-400'>project access</span>.",
    size: "",
  },
  {
    icon: "ri-lock-2-line",
    title: "Secure & Fast",
    description: "<span class='text-blue-400'>Industry-standard encryption</span> to keep your <span class='text-green-400'>code safe</span>.",
    size: "",
  },
  {
    icon: "ri-cloud-line",
    title:"Cloud Sync",
    description: "<span class='text-yellow-400'>Access your projects</span> anytime, anywhere, on <span class='text-orange-400'>any device</span>.",
    size: "col-span-2",
  },
];

const Features = () => {
  return (
    <section className=" py-20 text-gray-300">
      <div className="max-w-6xl mx-auto text-center px-6">
        {/* Heading */}
        <h2 className="text-5xl font-bold font-heading  mb-12">
          Why Choose Live Script?
        </h2>

        {/* Bento Grid Layout */}
        <div className="grid md:grid-cols-3 gap-6 font-body">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gray-950 p-8 rounded-2xl border border-gray-600 shadow-lg flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-xl ${feature.size}`}
            >
              {/* Icon */}
              <div className="text-5xl mb-4">
                <i className={`${feature.icon} text-yellow-400`}></i>
              </div>

              {/* Title */}
              <h3
                className="text-2xl font-semibold mb-2"
                dangerouslySetInnerHTML={{ __html: feature.title }}
              ></h3>

              {/* Description */}
              <p
                className="text-gray-400"
                dangerouslySetInnerHTML={{ __html: feature.description }}
              ></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
