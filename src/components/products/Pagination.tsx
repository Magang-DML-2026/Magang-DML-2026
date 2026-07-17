export default function Pagination() {
  return (
    <div className="w-full bg-[#f9fafb] pb-24 flex justify-center">
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-md border border-zinc-200 text-zinc-500 hover:bg-zinc-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-black text-white text-sm font-medium">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-100 text-sm font-medium transition-colors">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-100 text-sm font-medium transition-colors">
          3
        </button>
        <span className="w-8 h-8 flex items-center justify-center text-zinc-400">...</span>
        <button className="w-8 h-8 flex items-center justify-center rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-100 text-sm font-medium transition-colors">
          12
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md border border-zinc-200 text-zinc-500 hover:bg-zinc-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}
