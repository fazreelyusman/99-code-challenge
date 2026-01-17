import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="
      sticky top-0 z-30 bg-white/50 dark:bg-gray-800/40 backdrop-blur-md 
      w-full p-4 flex items-center justify-between 
      border-b border-border text-header 
      transition-all
    ">
      <div className="flex items-center gap-2">
        <img
          src="/favicon.png"
          alt="TokenSwapz Logo"
          className="h-8 w-8 object-contain"
        />
        <span className="font-headline text-xl font-bold text-primary">
          TokenSwapz
        </span>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
