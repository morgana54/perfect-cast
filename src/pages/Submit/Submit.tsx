import { Header } from "@/components/Header";
import { VideoContainer } from "@/components/VideoContainer";
import { VideoControls } from "@/components/VideoControls";
import { toast } from "sonner";
import { useConversation } from "@11labs/react";
import { useVideoRecording } from "@/hooks/useVideoRecording";
import { useCamera } from "@/hooks/useCamera";
import { SCREENPLAYS } from "@/constants/screenplay";
import { ADDITIONAL_USER_INFO } from "@/constants/userInfor";

import "./Submit.css";

export const Submit = () => {
  const { isRecording, startRecording, stopRecording, setupMediaRecorder } =
    useVideoRecording();

  const { isCameraOn, setIsCameraOn, isMicOn, setIsMicOn, videoRef } =
    useCamera(setupMediaRecorder);

  const selectedScreenplay = SCREENPLAYS[3];

  // Flatten the data structure to primitives
  const characterDescriptions = Object.entries(
    selectedScreenplay.context.characters
  )
    .map(
      ([name, info]) =>
        `${name}:\nAge: ${info.age}\nDescription: ${info.description}\nBackground: ${info.background}\nPersonality: ${info.personality}`
    )
    .join("\n\n");

  const a = useConversation({
    agentId: "lnCRtGJsv1ZtyVcsM9Rt",
    dynamicVariables: {
      screenplay_text: selectedScreenplay.scene,
      scene_description: selectedScreenplay.originalScene,
      scene_setting: selectedScreenplay.context.setting,
      scene_context: selectedScreenplay.context.sceneContext,
      characters: characterDescriptions,
      movie_title: selectedScreenplay.title,
      movie_genre: selectedScreenplay.genre,
      user_name: "KUBA",
      user_role: selectedScreenplay.userRole,
      agent_role: selectedScreenplay.agentRole,
      additional_info: ADDITIONAL_USER_INFO,
    },
  });

  const handleEndCall = () => undefined;
  const handleRestartCall = () => undefined;

  const onStart = async () => {
    const r = await a.startSession();
    console.log(r);
  };

  return (
    <div>
      <div className="video-backdrop sticky ml-auto p-4 top-0 left-0 inline-block">
        <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video h-72">
          {isCameraOn ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-lg text-center text-muted-foreground">
                Camera is off
              </div>
            </div>
          )}

          <VideoControls
            isMicOn={isMicOn}
            isCameraOn={isCameraOn}
            onToggleMic={() => setIsMicOn(!isMicOn)}
            onToggleCamera={() => setIsCameraOn(!isCameraOn)}
            agentStatus={a.status}
            onStart={onStart}
            onEndCall={() => a.endSession()}
          />
        </div>
      </div>

      <div className="p-4 font-mono text-wrap whitespace-pre-wrap max-w-[1200px] mx-auto">
        {selectedScreenplay.scene}
      </div>
    </div>
  );
};
