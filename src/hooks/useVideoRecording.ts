import { useState, useRef, useCallback, useEffect } from "react";

export type RecordingState =
  | {
      type: "stopped";
    }
  | {
      type: "recording";
    }
  | {
      type: "recorded";
      blob: Blob | null;
    };

export const useVideoRecording = (stream: MediaStream | null) => {
  const [recordingState, setRecordingState] = useState<RecordingState>({
    type: "stopped",
  });
  const isRecording = recordingState.type === "recording";
  const currentRecordingRef = useRef<PromiseWithResolvers<Blob> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (!stream || !isRecording) return;

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    let chunks: Blob[] = [];
    const currentRecordingPromise = Promise.withResolvers<Blob>();
    currentRecordingRef.current = currentRecordingPromise;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onstart = async () => {
      chunks = [];
    };

    mediaRecorder.onstop = async () => {
      console.log(1);

      const blob = new Blob(chunks, { type: "video/webm" });
      currentRecordingPromise.resolve(blob);
    };

    mediaRecorder.start();

    return () => mediaRecorder.stop();
  }, [stream, isRecording]);

  const startRecording = useCallback(async () => {
    if (recordingState.type === "recording") return;

    setRecordingState({ type: "recording" });
  }, [recordingState.type]);

  const stopRecording = useCallback(async () => {
    if (recordingState.type === "recorded") return;

    setRecordingState({ type: "recorded", blob: null });
    const blob = (await currentRecordingRef.current?.promise) ?? null;
    setRecordingState({ type: "recorded", blob });
  }, [recordingState.type]);

  const resetRecordingState = () => {
    if (recordingState.type === "stopped") return;

    setRecordingState({ type: "stopped" });
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
    recordingState,
    resetRecordingState,
  };
};

const downloadBlob = async (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `recording-${new Date().toISOString()}.webm`;
  a.click();
  URL.revokeObjectURL(url);
};
