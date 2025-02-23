export const Header = () => {
  return (
    <header className="sticky h-16 top-0 left-0 right-0 p-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-500/20 animate-fade-in z-20">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">Casting Session</h1>
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      </div>
      <div className="text-sm text-muted-foreground">AI Casting Director</div>
    </header>
  );
};
