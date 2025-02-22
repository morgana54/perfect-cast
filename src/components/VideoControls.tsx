import { cn } from "@/lib/utils";
import { Status } from "@11labs/react";
import {
  Camera,
  CameraOff,
  LoaderCircle,
  Mic,
  MicOff,
  Phone,
  Play,
  RefreshCw,
  Square,
} from "lucide-react";

interface VideoControlsProps {
  isMicOn: boolean;
  isCameraOn: boolean;
  onStart: () => void;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onEndCall: () => void;
  agentStatus: Status;
}

export const VideoControls = ({
  isMicOn,
  isCameraOn,
  onToggleMic,
  onToggleCamera,
  onEndCall,
  onStart,
  agentStatus,
}: VideoControlsProps) => {
  return (
    <div className="absolute bottom-2 right-2 glass-panel rounded-full mx-auto p-2 flex items-center gap-4">
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
        {agentStatus === "disconnected" && <Play className="w-6 h-6" />}
        {(agentStatus === "connecting" || agentStatus === "disconnecting") && (
          <LoaderCircle className="w-6 h-6 animate-spin" />
        )}
      </button>
    </div>
  );
};
