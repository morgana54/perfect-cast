export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between glass-panel animate-fade-in">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">Casting Session</h1>
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      </div>
      <div className="text-sm text-muted-foreground">AI Casting Director</div>
    </header>
  );
};
