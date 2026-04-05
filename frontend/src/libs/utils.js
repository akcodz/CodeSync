export const getDifficultyBadgeClass = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "px-2.5 py-0.5 text-xs font-medium rounded-md bg-zinc-800 text-green-400/80 border border-zinc-700";

    case "medium":
      return "px-2.5 py-0.5 text-xs font-medium rounded-md bg-zinc-800 text-yellow-400/80 border border-zinc-700";

    case "hard":
      return "px-2.5 py-0.5 text-xs font-medium rounded-md bg-zinc-800 text-red-400/80 border border-zinc-700";

    default:
      return "px-2.5 py-0.5 text-xs font-medium rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700";
  }
};