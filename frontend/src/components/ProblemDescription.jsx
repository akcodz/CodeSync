import { getDifficultyBadgeClass } from "../libs/utils";

function ProblemDescription({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}) {
  return (
    <div className="h-full overflow-y-auto bg-[#121212] text-zinc-200">

      {/* HEADER */}
      <div className="p-6 border-b border-zinc-800 bg-[#121212] sticky top-0 z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-zinc-100">
              {problem.title}
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              {problem.category}
            </p>
          </div>

          <span
            className={`px-2 py-1 text-xs rounded-md border ${getDifficultyBadgeClass(
              problem.difficulty
            )}`}
          >
            {problem.difficulty}
          </span>
        </div>

        {/* SELECTOR */}
        <div className="mt-4">
          <select
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-md 
            bg-[#181818] border border-zinc-800 text-zinc-300
            focus:outline-none focus:border-zinc-600"
          >
            {allProblems.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} — {p.difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-8">

        {/* DESCRIPTION */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-100">
            Description
          </h2>

          <div className="text-sm leading-relaxed text-zinc-300 space-y-3">
            <p>{problem.description.text}</p>

            {problem.description.notes.map((note, idx) => (
              <p key={idx} className="text-zinc-400">
                {note}
              </p>
            ))}
          </div>
        </section>

        {/* EXAMPLES */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-100">
            Examples
          </h2>

          {problem.examples.map((example, idx) => (
            <div
              key={idx}
              className="border border-zinc-800 rounded-lg bg-[#181818]"
            >
              {/* HEADER */}
              <div className="px-4 py-2 border-b border-zinc-800 text-sm text-zinc-400">
                Example {idx + 1}
              </div>

              {/* BODY */}
              <div className="p-4 font-mono text-sm space-y-3">
                <div>
                  <span className="text-zinc-500">Input:</span>
                  <pre className="mt-1 text-zinc-200 whitespace-pre-wrap">
                    {example.input}
                  </pre>
                </div>

                <div>
                  <span className="text-zinc-500">Output:</span>
                  <pre className="mt-1 text-zinc-200 whitespace-pre-wrap">
                    {example.output}
                  </pre>
                </div>

                {example.explanation && (
                  <div className="pt-2 border-t border-zinc-800 text-xs text-zinc-400">
                    <span className="font-semibold text-zinc-300">
                      Explanation:
                    </span>{" "}
                    {example.explanation}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* CONSTRAINTS */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-100">
            Constraints
          </h2>

          <ul className="space-y-2 text-sm text-zinc-300">
            {problem.constraints.map((constraint, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-zinc-500">•</span>
                <code className="bg-[#181818] px-2 py-1 rounded text-zinc-300">
                  {constraint}
                </code>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default ProblemDescription;