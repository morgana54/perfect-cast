import { VideoControls } from "@/components/VideoControls";
import { useConversation } from "@11labs/react";
import { RecordingState, useVideoRecording } from "@/hooks/useVideoRecording";
import { useCamera } from "@/hooks/useCamera";
import {
  Character,
  SceneContext,
  Screenplay,
  SCREENPLAYS,
} from "@/constants/screenplay";
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
import { ArrowLeft, LoaderCircle, RefreshCcw } from "lucide-react";
import { useSupabaseUpload } from "@/supabase/useUpload";
import { cn } from "@/lib/utils";
import { GenericHeaderContents, Header } from "@/components/Header";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "@/supabase/useClient";
import { assertIsNotNullish } from "@/lib/assertIsNotNullish";
import { Listing, UserProfile } from "@/supabase/types";

export const Submit = () => {
  const { id } = useParams();

  const client = useClient();
  const { data, isLoading } = useQuery({
    queryKey: ["listing", id],
    queryFn: async () => {
      assertIsNotNullish(client);
      const { data } = await client.from("listings").select("*").eq("id", id);

      return data?.[0] as Listing | null;
    },
  });

  if (isLoading) {
    return (
      <div>
        <Header>
          <div className="flex gap-2 h-full items-center">
            <Button size="icon" variant="ghost" asChild>
              <Link to="/talent/listings">
                <ArrowLeft />
              </Link>
            </Button>
            <GenericHeaderContents />
          </div>
        </Header>
        <div
          className="w-full flex items-center justify-center"
          style={{
            height: "calc(100vh - 64px)",
          }}
        >
          <LoaderCircle className="animate-spin w-14 h-14" />
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>Not found</div>;
  }

  return <SubmitWithoutLoad listing={data} />;
};

interface SubmitProps {
  listing: Listing;
}
export const SubmitWithoutLoad = ({ listing }: SubmitProps) => {
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
  const characterDescriptions = Object.entries(listing.context_characters)
    .map(
      ([name, info]) =>
        `${name}:\nAge: ${info.age}\nDescription: ${info.description}\nBackground: ${info.background}\nPersonality: ${info.personality}`
    )
    .join("\n\n");

  const a = useConversation({
    agentId: "2CWlVlqCNatM9QFfyuIN",
    dynamicVariables: {
      screenplay_text: listing.screenplay,
      scene_description: listing.originalScene,
      scene_setting: listing.context_setting,
      scene_context: listing.context_sceneContext,
      characters: characterDescriptions,
      movie_title: listing.title,
      movie_genre: listing.genre,
      user_name: "KUBA",
      user_role: listing.userRole,
      agent_role: listing.agentRole,
      additional_info: ADDITIONAL_USER_INFO,
    },
    onDisconnect: () => {
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

  return (
    <div>
      <Header>
        <div className="flex gap-2 h-full items-center">
          <Button size="icon" variant="ghost" asChild>
            <Link to="/talent/listings">
              <ArrowLeft />
            </Link>
          </Button>
          <GenericHeaderContents />
        </div>
      </Header>

      <div className="sticky ml-auto p-4 top-16 left-0 inline-block float-right">
        <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg aspect-video w-[512px] bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={cn("w-full h-full object-cover ", {
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

      <main className="p-4 max-w-[800px] pb-96 mx-auto">
        <div className="font-mono text-wrap whitespace-pre-wrap">
          <div className="text-xl font-bold mt-4 mb-1">Genre</div>
          <div>{listing.genre}</div>
          <div className="text-xl font-bold mt-4 mb-1">Scene setting</div>
          <div>{listing.context_setting}</div>

          <div className="text-xl font-bold mt-4 mb-1">Scene context</div>
          <div>{listing.context_sceneContext}</div>

          <div className="text-xl font-bold mt-4 mb-1">Your role</div>
          <div className="text-center font-bold text-lg">
            <span className="bg-blue-200 px-3 py-1 rounded-sm">
              {listing.userRole}
            </span>
          </div>

          <div className="text-xl font-bold mt-4 mb-1">Screenplay</div>

          {listing.screenplay}
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
  const client = useClient();

  const onSubmit = async () => {
    if (
      recordingState.type !== "recorded" ||
      !recordingState.blob ||
      !recordingId
    )
      return;
    assertIsNotNullish(client);

    const fileName = `${recordingId}.webm`;
    const bucketName = "screening";
    const videoUrl = await upload.uploadFile(
      recordingState.blob,
      fileName,
      bucketName
    );

    const { data, error } = await client
      .from("submissions")
      .insert<Partial<UserProfile>>({
        user_name: "KUBA",
        bucket_video_url: videoUrl,
        eleven_conversation_id: recordingId,
      })
      .select();

    console.log(data, error);
  };

  if (upload.uploadedUrl) {
    return (
      <>
        <p className="mb-4 mt-1">
          Your casting recording has been submitted.{" "}
          <strong>We'll call you back soon!</strong>
        </p>
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
