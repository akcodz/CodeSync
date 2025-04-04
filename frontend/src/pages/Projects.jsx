import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { ImHome } from "react-icons/im";
import { HiMiniUserPlus } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    language: "",
  });

  const [projectCode, setProjectCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const languages =  [
    { name: "JavaScript", value: "javascript", icon: "🟨" },
    { name: "TypeScript", value: "typescript", icon: "🟦" },
    { name: "Python", value: "python", icon: "🐍" },
    { name: "C++", value: "cpp", icon: "🔵" },
    { name: "Java", value: "java", icon: "☕" },
    { name: "Go", value: "go", icon: "💎" },
    { name: "HTML", value: "html", icon: "🔶" },
    { name: "JSON", value: "json", icon: "📄" },
    { name: "SQL", value: "sql", icon: "💾" },
  ];

  // Fetch projects on page load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URI}/projects/user-projects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjects(response.data.projects);
      } catch (err) {
        setError(err.response.data.message || "An error occurred");
      }
    };

    fetchProjects();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BASE_URI}/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(projects.filter((project) => project._id !== id));
    } catch (err) {
      setError(err.response.data.message || "An error occurred");
    }
  };

  // Handle form submission (create project)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectData.name.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URI}/projects/create`,
        projectData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setProjects([...projects, response.data.project]); // Fix: Correctly update projects array
        setProjectData({ name: "", description: "",language:"" });
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!projectCode.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URI}/projects/join`,
        { joinCode: projectCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setProjects([...projects, response.data.project]);
        setProjectCode("");
        setIsJoinModalOpen(false);
      }
    } catch (err) {
      console.error("Error joining project:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white  relative">
      <div className="w-full ">
        {/* Page Title */}
        <div className="w-full flex items-center justify-between mb-16  px-6 py-4 ">
          {" "}
          <Link
            to="/"
            className=" text-gray-300 hover:text-gray-300 transition "
          >
            <ImHome size={32} />
          </Link>
          <h2 className="text-6xl font-heading text-center text-gray-300 font-bold ">
            Your Projects
          </h2>
          {/* Floating Add Icon */}
          <div className="flex gap-8 px-2">
            {" "}
            <button
              className="flex  items-center gap-3  text-lg text-gray-300 border-2 border-gray-100 rounded-lg px-3 py-1 font-medium hover:border-gray-400 hover:text-gray-200 transition-all duration-500 ease-in-out"
              onClick={() => setIsJoinModalOpen(true)}
            >
              <span className="inline-block text-lg">Join</span>{" "}
              <HiMiniUserPlus />
            </button>
            <button
              className="text-lg px-3 py-1 text-black  bg-[white] border-2 border-gray-100 rounded-lg   hover:bg-gray-100 hover:text-[#121212] transition-all duration-500 ease-in-out font-medium"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="inline-block text-lg">Create</span>{" "}
              <i className="ri-add-line text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {projects.length === 0 ? (
            <p className="text-gray-300">
              No projects yet. Click create to add one!
            </p>
          ) : (
            projects.map((project) => (
              <div
                key={project._id}
                className="bg-gray-950/70 p-6 rounded-lg relative border border-gray-600 hover:border-gray-400 transition-all duration-500 ease-in-out"
              >
                <i
                  onClick={() => handleDelete(project._id)}
                  className="ri-delete-bin-7-line text-gray-500 hover:text-gray-300 absolute top-4 right-4 cursor-pointer"
                ></i>
                <h4 className="text-xl font-semibold mb-2">{project.name}</h4>
                <p className="text-gray-500 mb-4">
                  {project.description || "No description"}
                </p>
               <div className="flex items-center justify-between"> <p className="text-gray-400 w-fit font-semibold underline underline-offset-5 hover:text-gray-200 transition-all duration-500 ease-in-out">
                  Code: {project.joinCode}
                </p>
                <p className="text-gray-400 w-fit font-semibold underline underline-offset-5 hover:text-gray-200 transition-all duration-500 ease-in-out">
                  Language: {project.language}
                </p></div>
                <button
                  onClick={() => navigate(`/projects/${project._id}`,{ state: {project } }) }
                  className="mt-4 w-full bg-gray-950/70 border border-gray-400 text-white py-2 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition-all duration-500 ease-in-out"
                >
                  Open Project
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#121212]/20 flex justify-center items-center z-50 ">
          <div className="relative backdrop-blur-md  p-8 rounded-lg border">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-300 hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <IoClose size={24} />
            </button>

            <h3 className="text-xl font-semibold mb-4 text-gray-300">
              Create a New Project
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={projectData.name}
                onChange={handleChange}
                placeholder="Project Name"
                required
                className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 font-body placeholder:text-gray-400"
              />
              <textarea
                name="description"
                value={projectData.description}
                onChange={handleChange}
                placeholder="Project Description (Optional)"
                className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 font-body placeholder:text-gray-400 resize-none"
              />{" "}
              <select
                name="language"
                value={projectData.language}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 font-body text-gray-400"
              >
                <option value=""
                    className="text-gray-300 bg-[#121212] " disabled>
                  Select Programming Language
                </option>
                {languages.map((lang) => (
                  <option
                    key={lang.name}
                    value={lang.value}
                    className="flex justify-between gap-4 text-gray-300 bg-[#121212] hover:bg-gray-300 hover:text-[#121212] transition-all duration-500 ease-in-out"
                  >
                    {lang.name} 
                    
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="mt-4 w-full bg-gray-950/70 border border-gray-400 text-white py-2 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition-all duration-500 ease-in-out"
              >
                Create Project
              </button>
            </form>
          </div>
        </div>
      )}
      {isJoinModalOpen && (
        <div className="fixed inset-0 bg-[#121212]/20 flex justify-center items-center z-50 ">
          <div className="relative backdrop-blur-md  p-6 rounded-lg border">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-300 hover:text-white"
              onClick={() => setIsJoinModalOpen(false)}
            >
              <IoClose size={24} />
            </button>

            <h3 className="text-xl font-semibold mb-4 text-gray-300">
              join a Project
            </h3>
            <form onSubmit={handleJoin} className="space-y-4">
              <input
                type="text"
                name="code"
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
                placeholder="Project Code"
                required
                className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 font-body placeholder:text-gray-400"
              />

              <button
                type="submit"
                className="mt-4 w-full bg-gray-950/70 border border-gray-400 text-white py-2 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition-all duration-500 ease-in-out"
              >
                Join Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
