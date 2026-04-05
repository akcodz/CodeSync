import axios from "axios";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { HiMiniUserPlus, HiPlus } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import logo from "../public/logo.png";

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

  const languages = [
    { name: "JavaScript", value: "javascript" },
    { name: "TypeScript", value: "typescript" },
    { name: "Python", value: "python" },
    { name: "C++", value: "cpp" },
    { name: "Java", value: "java" },
    { name: "Go", value: "go" },
  ];

  // 🔹 Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URI}/projects/user-projects`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setProjects(res.data.projects);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching projects");
      }
    };

    fetchProjects();
  }, []);

  // 🔹 Input Change
  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  // 🔹 Delete Project
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BASE_URI}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  // 🔹 Create Project
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectData.name.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URI}/projects/create`,
        projectData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setProjects((prev) => [...prev, res.data.project]);
      setProjectData({ name: "", description: "", language: "" });
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Join Project
  const handleJoin = async (e) => {
    e.preventDefault();
    if (!projectCode.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URI}/projects/join`,
        { joinCode: projectCode },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setProjects((prev) => [...prev, res.data.project]);
      setProjectCode("");
      setIsJoinModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-zinc-200">
      {/* HEADER */}
      <div className="w-full border-b border-zinc-800 bg-[#121212]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          {/* LEFT */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center w-16 h-12 bg-amber-900  ">
              <img
                src={logo}
                className="h-full scale-140 w-full object-center object-contain"
                alt="logo"
              />
            </div>
          </Link>

          {/* CENTER */}
          <h2 className="text-xl md:text-2xl font-semibold text-zinc-100">
            Your Projects
          </h2>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsJoinModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm 
        rounded-md border border-zinc-800 text-zinc-300 
        hover:bg-zinc-800 hover:text-zinc-100 transition"
            >
              <HiMiniUserPlus className="size-4" />
              Join
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm 
        rounded-md bg-zinc-100 text-[#121212] font-medium 
        hover:bg-zinc-200 transition"
            >
              <HiPlus className="size-4" />
              Create
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* EMPTY STATE */}
        {projects.length === 0 && (
          <div className="text-center text-zinc-500 py-10">
            No projects yet. Create or join one!
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="relative p-5 rounded-xl bg-[#181818] border border-zinc-800 
              hover:border-zinc-600 transition-all duration-200 group"
            >
              {/* DELETE */}
              <button
                onClick={() => handleDelete(project._id)}
                className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-300"
              >
                <i className="ri-delete-bin-7-line"></i>
              </button>

              <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white">
                {project.name}
              </h3>

              <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                {project.description || "No description provided"}
              </p>

              <div className="flex items-center justify-between mt-4 text-xs text-zinc-500">
                <span className="px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700">
                  {project.language || "N/A"}
                </span>
                <span className="font-mono">#{project.joinCode}</span>
              </div>

              <button
                onClick={() =>
                  navigate(`/projects/${project._id}`, { state: { project } })
                }
                className="mt-4 w-full py-2 text-sm rounded-md 
                border border-zinc-700 text-zinc-300 
                hover:bg-zinc-800 hover:text-white transition"
              >
                Open Project
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="w-full max-w-md bg-[#181818] border border-zinc-800 rounded-xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-200"
              onClick={() => setIsModalOpen(false)}
            >
              <IoClose size={22} />
            </button>

            <h3 className="text-lg font-semibold text-zinc-100 mb-4">
              Create Project
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={projectData.name}
                onChange={handleChange}
                placeholder="Project name"
                className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-sm text-zinc-200"
              />

              <textarea
                name="description"
                value={projectData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-sm text-zinc-200"
              />

              <select
                name="language"
                value={projectData.language}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-sm text-zinc-300"
              >
                <option value="">Select language</option>
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.name}
                  </option>
                ))}
              </select>

              <button className="w-full py-2 rounded-md bg-zinc-100 text-[#121212] text-sm font-medium">
                Create Project
              </button>
            </form>
          </div>
        </div>
      )}

      {/* JOIN MODAL */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="w-full max-w-md bg-[#181818] border border-zinc-800 rounded-xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-200"
              onClick={() => setIsJoinModalOpen(false)}
            >
              <IoClose size={22} />
            </button>

            <h3 className="text-lg font-semibold text-zinc-100 mb-4">
              Join Project
            </h3>

            <form onSubmit={handleJoin} className="space-y-4">
              <input
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
                placeholder="Enter project code"
                className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-sm text-zinc-200"
              />

              <button className="w-full py-2 rounded-md bg-zinc-100 text-[#121212] text-sm font-medium">
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
