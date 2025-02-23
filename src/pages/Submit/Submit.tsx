import { VideoControls } from "@/components/VideoControls";
import { useConversation } from "@11labs/react";
import { RecordingState, useVideoRecording } from "@/hooks/useVideoRecording";
import { useCamera } from "@/hooks/useCamera";
import { SceneContext, Screenplay, SCREENPLAYS } from "@/constants/screenplay";
import { ADDITIONAL_USER_INFO } from "@/constants/userInfor";

import "./Submit.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, RefreshCcw } from "lucide-react";
import { useSupabaseUpload } from "@/supabase/useUpload";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Header } from "@/components/Header";

export const Submit = () => {
  const [screenplayIdx, setScreenplayIdx] = useState<number>(0);
  const screenplay = useMemo(() => SCREENPLAYS[screenplayIdx], [screenplayIdx]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const stream = useStream();
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, videoRef]);

  const {
    isRecording,
    startRecording,
    stopRecording,
    resetRecordingState,
    recordingState,
  } = useVideoRecording(stream);

  // Flatten the data structure to primitives
  const characterDescriptions = Object.entries(screenplay.context.characters)
    .map(
      ([name, info]) =>
        `${name}:\nAge: ${info.age}\nDescription: ${info.description}\nBackground: ${info.background}\nPersonality: ${info.personality}`
    )
    .join("\n\n");

  const a = useConversation({
    agentId: "2CWlVlqCNatM9QFfyuIN",
    dynamicVariables: {
      screenplay_text: screenplay.scene,
      scene_description: screenplay.originalScene,
      scene_setting: screenplay.context.setting,
      scene_context: screenplay.context.sceneContext,
      characters: characterDescriptions,
      movie_title: screenplay.title,
      movie_genre: screenplay.genre,
      user_name: "KUBA",
      user_role: screenplay.userRole,
      agent_role: screenplay.agentRole,
      additional_info: ADDITIONAL_USER_INFO,
    },
    onDisconnect: () => {
      console.log("onDisconnect");

      stopRecording();
    },
    onDebug: console.log,
  });

  const [recordingId, setRecordingId] = useState<string | null>(null);

  const onStart = useCallback(async () => {
    startRecording();

    const recordingId = await a.startSession({});
    setRecordingId(recordingId);
  }, [a, startRecording]);
  const onStop = useCallback(async () => {
    stopRecording();
    await a.endSession();
  }, [a, stopRecording]);
  const onRestart = useCallback(async () => {
    await onStop();
    await onStart();
  }, [onStart, onStop]);

  const previousScreenplayIdx = useRef(screenplayIdx);
  useEffect(() => {
    if (previousScreenplayIdx.current === screenplayIdx) return;

    previousScreenplayIdx.current = screenplayIdx;
    onStop();
  }, [onStop, screenplayIdx]);

  return (
    <div>
      <Header />

      <div className="sticky ml-auto p-4 top-16 left-0 inline-block float-right">
        <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video h-72 bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={cn("w-full h-full object-cover", {
              hidden: recordingState.type === "recorded",
            })}
          />

          <VideoControls
            agentStatus={a.status}
            onStart={onStart}
            onEndCall={onStop}
            onRestart={onRestart}
            isSpeaking={a.isSpeaking && isRecording}
          />
        </div>
      </div>

      <main className="p-4 max-w-[800px] mx-auto pb-32">
        <div className="font-mono text-wrap whitespace-pre-wrap">
          <div className="-mx-3">
            <Select
              value={String(screenplayIdx)}
              onValueChange={(v) => setScreenplayIdx(+v)}
            >
              <SelectTrigger className="w-[320px] text-2xl h-12 font-bold text-left">
                <SelectValue placeholder="Screenplay" />
              </SelectTrigger>
              <SelectContent>
                {SCREENPLAYS.map((s, i) => (
                  <SelectItem key={String(i)} value={String(i)}>
                    {s.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-xl font-bold mt-4 mb-1">Genre</div>
          <div>{screenplay.genre}</div>
          <div className="text-xl font-bold mt-4 mb-1">Scene setting</div>
          <div>{screenplay.context.setting}</div>

          <div className="text-xl font-bold mt-4 mb-1">Scene context</div>
          <div>{screenplay.context.sceneContext}</div>

          <div className="text-xl font-bold mt-4 mb-1">Your role</div>
          <div className="text-center font-bold text-lg">
            <span className="bg-blue-200 px-3 py-1 rounded-sm">
              {screenplay.userRole}
            </span>
          </div>

          <div className="text-xl font-bold mt-4 mb-1">Screenplay</div>

          {screenplay.scene}
        </div>
      </main>

      <Dialog
        open={recordingState.type === "recorded"}
        onOpenChange={(o) => {
          if (!o) resetRecordingState();
        }}
      >
        <DialogContent className="w-[1200px] max-w-max">
          <DialogHeader>
            <DialogTitle>Here's your casting recording</DialogTitle>
            <DialogDescription>
              <SubmitPopupContents
                recordingState={recordingState}
                recordingId={recordingId}
                onRecordAgain={resetRecordingState}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface SubmitPopupContentsProps {
  recordingState: RecordingState;
  recordingId: string | null;
  onRecordAgain: () => void;
}
function SubmitPopupContents({
  recordingState,
  recordingId,
  onRecordAgain,
}: SubmitPopupContentsProps) {
  const upload = useSupabaseUpload();
  const onSubmit = async () => {
    if (recordingState.type !== "recorded" || !recordingState.blob) return;

    const fileName = `${recordingId}.webm`;
    const bucketName = "screening";
    const uploadedUrl = await upload.uploadFile(
      recordingState.blob,
      fileName,
      bucketName
    );
  };

  if (upload.uploadedUrl) {
    return (
      <>
        <p className="mb-4 mt-1">Your casting recording has been submitted!</p>
        {recordingState.type === "recorded" && recordingState.blob && (
          <VideoPopupContent
            className="w-full aspect-video object-cover rounded-xl"
            blob={recordingState.blob}
          />
        )}
      </>
    );
  }

  return (
    <>
      <p className="mb-4 mt-1">Do you want to submit it?</p>
      <VideoPopupContent
        className="w-full aspect-video object-cover rounded-xl"
        blob={recordingState.type === "recorded" ? recordingState.blob : null}
      />
      <div className="flex mt-4 gap-4">
        <Button
          variant="default"
          className="w-full"
          onClick={onSubmit}
          disabled={upload.isUploading}
        >
          {upload.isUploading && <LoaderCircle className="animate-spin" />}
          Submit
        </Button>
        <Button
          variant="destructive"
          className="w-full"
          disabled={upload.isUploading}
          onClick={onRecordAgain}
        >
          <RefreshCcw />
          Record Again
        </Button>
      </div>
    </>
  );
}

interface VideoPopupContentProps {
  blob: Blob | null;
  className?: string;
}
function VideoPopupContent({ blob, className }: VideoPopupContentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!blob || !videoRef.current) return;

    const blobUrl = URL.createObjectURL(blob);
    videoRef.current.src = blobUrl;

    return () => {
      URL.revokeObjectURL(blobUrl);
    };
  }, [blob]);

  return (
    <video ref={videoRef} controls autoPlay className={className}>
      Your browser does not support the video element.
    </video>
  );
}
const deepContextStringify = (context: SceneContext): string => {
  const characters = Object.entries(context.characters).map(
    ([name, value]) => `
  ${name}
    Age: ${value.age}
    Description: ${value.description}
    Background: ${value.background}
    Personality: ${value.personality}`
  );

  return (
    Object.entries(context)
      .filter(([key]) => key !== "characters")
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n") +
    "\n\nCharacters:" +
    characters.join("\n")
  );
};

function useStream() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let um: MediaStream | null = null;

    const setupStream = async () => {
      try {
        um = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(um);
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    setupStream();

    return () => {
      um?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return stream;
}
