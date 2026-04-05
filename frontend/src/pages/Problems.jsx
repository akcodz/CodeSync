import { useState } from "react";
import { Link } from "react-router";
import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../libs/utils";
import ProblemsNavbar from "../components/ProblemsNavbar";

function Problems() {
  const problems = Object.values(PROBLEMS);

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");

  // 🔥 FILTER LOGIC
  const filteredProblems = problems.filter((problem) => {
    const query = search.toLowerCase();

    const matchesSearch =
      problem.title.toLowerCase().includes(query) ||
      problem.category.toLowerCase().includes(query);

    const matchesDifficulty =
      difficulty === "" ||
      problem.difficulty.toLowerCase() === difficulty;

    return matchesSearch && matchesDifficulty;
  });

  // 📊 STATS (based on ALL problems, not filtered)
  const easyProblemsCount = problems.filter(
    (p) => p.difficulty === "Easy"
  ).length;

  const mediumProblemsCount = problems.filter(
    (p) => p.difficulty === "Medium"
  ).length;

  const hardProblemsCount = problems.filter(
    (p) => p.difficulty === "Hard"
  ).length;

  return (
    <div className="min-h-screen bg-[#121212] text-zinc-200">
      <ProblemsNavbar
        search={search}
        setSearch={setSearch}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100">
            Practice Problems
          </h1>
          <p className="text-zinc-400 mt-2">
            Sharpen your coding skills with curated challenges
          </p>
        </div>

        {/* EMPTY STATE */}
        {filteredProblems.length === 0 && (
          <div className="text-center text-zinc-500 py-10">
            No problems found
          </div>
        )}

        {/* PROBLEMS LIST */}
        <div className="space-y-4">
          {filteredProblems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="group block"
            >
              <div className="p-5 rounded-xl bg-[#181818] border border-zinc-800 
              hover:border-zinc-600 transition-all duration-200">
                
                <div className="flex items-center justify-between gap-4">
                  
                  {/* LEFT */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      
                      {/* ICON */}
                      <div className="size-11 rounded-lg bg-zinc-800 flex items-center justify-center">
                        <Code2Icon className="size-5 text-zinc-300" />
                      </div>

                      {/* TITLE */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition">
                            {problem.title}
                          </h2>

                          <span className={getDifficultyBadgeClass(problem.difficulty)}>
                            {problem.difficulty}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-500 mt-1">
                          {problem.category}
                        </p>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                      {problem.description.text}
                    </p>
                   
                  </div>

                  {/* RIGHT CTA */}
                  <div className="flex items-center gap-2 text-zinc-400 group-hover:text-zinc-200 transition">
                    <span className="text-sm font-medium">Solve</span>
                    <ChevronRightIcon className="size-5 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* STATS FOOTER */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total", value: problems.length },
            { label: "Easy", value: easyProblemsCount },
            { label: "Medium", value: mediumProblemsCount },
            { label: "Hard", value: hardProblemsCount },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-[#181818] border border-zinc-800 
              hover:border-zinc-600 transition"
            >
              <p className="text-sm text-zinc-500">{stat.label}</p>
              <h2 className="text-2xl font-bold mt-1 text-zinc-100">
                {stat.value}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Problems;