import { cn } from "@/lib/utils";

interface VideoContainerProps {
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const VideoContainer = ({
  isLoading,
  children,
  className,
}: VideoContainerProps) => {
  return (
    <div className={cn("video-container animate-fade-in", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="loading-spinner" />
        </div>
      )}
      {children}
    </div>
  );
};
