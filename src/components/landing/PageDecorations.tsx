export function PageDecorations() {
  return (
    <>
      {/* Grid Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-50"></div>
      </div>

      {/* Small polygon decorations */}
      <div className="absolute top-[20%] left-[20%] w-8 h-8 bg-white/5 rotate-45"></div>
      <div className="absolute bottom-[20%] right-[30%] w-12 h-12 border border-white/10 rounded-lg rotate-12"></div>
      <div className="absolute top-[40%] right-[20%] w-6 h-6 border border-white/10 rounded-full"></div>
    </>
  );
}
