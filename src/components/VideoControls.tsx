import { cn } from "@/lib/utils";
import { Status } from "@11labs/react";
import { LoaderCircle, Mic, RefreshCcw, Square } from "lucide-react";

interface VideoControlsProps {
  isMicOn: boolean;
  isCameraOn: boolean;
  onStart: () => void;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onEndCall: () => void;
  onRestart: () => void;
  agentStatus: Status;
  isSpeaking: boolean;
}

export const VideoControls = ({
  isMicOn,
  isCameraOn,
  onToggleMic,
  onToggleCamera,
  onEndCall,
  onStart,
  onRestart,
  agentStatus,
  isSpeaking,
}: VideoControlsProps) => {
  return (
    <>
      {agentStatus === "connected" && (
        <div className="absolute bottom-3 left-4">
          <SpeakingIndicator isSpeaking={isSpeaking} />
        </div>
      )}

      <div className="absolute bottom-2 right-2 glass-panel rounded-full mx-auto p-2 flex items-center gap-2">
        {agentStatus === "connected" && (
          <>
            <button
              onClick={onRestart}
              className={cn(
                "control-button border border-input bg-background hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <RefreshCcw className="w-6 h-6" />
            </button>
          </>
        )}
        <button
          onClick={agentStatus === "connected" ? onEndCall : onStart}
          className={cn(
            "control-button text-white",
            agentStatus === "connected"
              ? "bg-destructive hover:bg-destructive/90"
              : "bg-primary hover:bg-primary/90"
          )}
        >
          {agentStatus === "connected" && <Square className="w-6 h-6" />}
          {agentStatus === "disconnected" && <Mic className="w-6 h-6" />}
          {(agentStatus === "connecting" ||
            agentStatus === "disconnecting") && (
            <LoaderCircle className="w-6 h-6 animate-spin" />
          )}
        </button>
      </div>
    </>
  );
};

interface SpeakingIndicatorProps {
  isSpeaking: boolean;
}
const SpeakingIndicator = ({ isSpeaking }: SpeakingIndicatorProps) => {
  return (
    <div className="flex items-center gap-[2px] h-6">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={cn(
            "w-1 h-1 rounded-full transition-all duration-100 glass-panel",
            {
              "animate-speaking-wave-1": isSpeaking && index === 0,
              "animate-speaking-wave-2": isSpeaking && index === 1,
              "animate-speaking-wave-3": isSpeaking && index === 2,
              "animate-speaking-wave-4": isSpeaking && index === 3,
              "animate-speaking-wave-5": isSpeaking && index === 4,
              "animate-speaking-wave-6": isSpeaking && index === 5,
              "animate-speaking-wave-7": isSpeaking && index === 6,
            }
          )}
          style={{
            animationDelay: isSpeaking ? `${index * 60}ms` : "0ms",
            animationDuration: "500ms",
          }}
        />
      ))}
    </div>
  );
};
