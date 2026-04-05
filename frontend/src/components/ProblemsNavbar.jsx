import { Link } from "react-router";
import { SearchIcon } from "lucide-react";
import logo from "../public/logo.png";

function ProblemsNavbar({ search, setSearch, difficulty, setDifficulty }) {
  return (
    <div className="sticky top-0 z-50 bg-[#121212]/90 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* LEFT: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center w-16 h-12 bg-amber-900  ">
                      <img src={logo} className="h-full scale-140 w-full object-center object-contain" alt="logo" />
                    </div>
        </Link>

        {/* CENTER: Search */}
        <div className="flex-1 max-w-md relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 
            text-sm text-zinc-200 placeholder:text-zinc-500 
            focus:outline-none focus:border-zinc-600 transition"
          />
        </div>

        {/* RIGHT: Filters + Nav */}
        <div className="flex items-center gap-3">

          {/* Difficulty Filter */}
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 
            text-sm text-zinc-300 focus:outline-none focus:border-zinc-600"
          >
            <option value="">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          {/* Back */}
          <Link
            to="/projects"
            className="px-3 py-2 text-sm rounded-md border border-zinc-800 
            text-zinc-300 hover:bg-zinc-800 transition"
          >
            Projects
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProblemsNavbar;