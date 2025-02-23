
import { VideoControls } from "@/components/VideoControls";
import { useConversation } from "@11labs/react";
import { RecordingState, useVideoRecording } from "@/hooks/useVideoRecording";
import { Listing } from "@/supabase/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "@/supabase/useClient";
import { assertIsNotNullish } from "@/lib/assertIsNotNullish";
import { Header } from "@/components/Header";
import { useRef, useState, useEffect, useCallback } from "react";
import { ADDITIONAL_USER_INFO } from "@/constants/userInfor";
import { SubmissionDialog } from "@/components/SubmissionDialog/SubmissionDialog";
import { cn } from "@/lib/utils";

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
  const { id } = useParams();

  const {
    isRecording,
    startRecording,
    stopRecording,
    resetRecordingState,
    recordingState,
  } = useVideoRecording(stream);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;      
    }
  }, [stream, videoRef]);

  const characterDescriptions = Object.entries(listing.context_characters)
    .map(
      ([name, info]) =>
        `${name}:\nAge: ${info.age}\nDescription: ${info.description}\nBackground: ${info.background}\nPersonality: ${info.personality}`
    )
    .join("\n\n");

  const a = useConversation({
    agentId: listing.agent_id,
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
          {listing.displayed_screenplay}
        </div>
      </main>

      <SubmissionDialog
        recordingState={recordingState}
        recordingId={recordingId}
        onRecordAgain={resetRecordingState}
        listingId={id}
        isOpen={recordingState.type === "recorded"}
        onOpenChange={(open) => {
          if (!open) resetRecordingState();
        }}
      />
    </div>
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
