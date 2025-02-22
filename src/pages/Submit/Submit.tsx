import { Header } from "@/components/Header";
import { VideoContainer } from "@/components/VideoContainer";
import { VideoControls } from "@/components/VideoControls";
import { toast } from "sonner";
import { useConversation } from "@11labs/react";
import { useVideoRecording } from "@/hooks/useVideoRecording";
import { useCamera } from "@/hooks/useCamera";
import { SCREENPLAY } from "@/constants/screenplay";
import { ADDITIONAL_USER_INFO } from "@/constants/userInfor";

import "./Submit.css";

export const Submit = () => {
  const { isRecording, startRecording, stopRecording, setupMediaRecorder } =
    useVideoRecording();

  const { isCameraOn, setIsCameraOn, isMicOn, setIsMicOn, videoRef } =
    useCamera(setupMediaRecorder);

  const a = useConversation({
    agentId: "lnCRtGJsv1ZtyVcsM9Rt",
    dynamicVariables: {
      screenplay: SCREENPLAY,
      user_name: "Bartek",
      user_role: "HAN",
      agent_role: "BEN",
      additional_user_info: ADDITIONAL_USER_INFO,
    },
  });

  const handleEndCall = () => undefined;
  const handleRestartCall = () => undefined;

  console.log(a);
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
        {SCREENPLAY}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header />

      <button
        className="absolute top-8 left-4 p-4 text-white bg-primary"
        onClick={() => {
          onStart();
        }}
      >
        Start
      </button>

      {/* <main className="pt-24 pb-32 px-4 flex flex-col items-center justify-center min-h-screen">
        <VideoContainer>
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
        </VideoContainer>
      </main> */}

      {/* <VideoControls
        isMicOn={isMicOn}
        isCameraOn={isCameraOn}
        onToggleMic={() => setIsMicOn(!isMicOn)}
        onToggleCamera={() => setIsCameraOn(!isCameraOn)}
        onStart={onStart}
        onEndCall={handleEndCall}
        onRestartCall={handleRestartCall}
      /> */}
    </div>
  );
};
