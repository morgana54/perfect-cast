import { useState, useRef, useCallback } from "react";

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

export const useVideoRecording = () => {
  const [recordingState, setRecordingState] = useState<RecordingState>({
    type: "stopped",
  });
  const isRecording = recordingState.type === "recording";

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const currentRecordingRef = useRef<PromiseWithResolvers<Blob> | null>(null);

  const startRecording = useCallback(() => {
    if (mediaRecorderRef.current && !isRecording) {
      mediaRecorderRef.current.start();
      setRecordingState({ type: "recording" });
    }
  }, [isRecording]);

  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();

      setRecordingState({ type: "recorded", blob: null });
      const blob = (await currentRecordingRef.current?.promise) ?? null;
      setRecordingState({ type: "recorded", blob });
    }
  }, [isRecording]);

  const setupMediaRecorder = useCallback((stream: MediaStream) => {
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstart = async () => {
      chunksRef.current = [];
      currentRecordingRef.current = Promise.withResolvers<Blob>();
    };

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      currentRecordingRef.current?.resolve(blob);
    };
  }, []);

  const resetRecordingState = () => {
    setRecordingState({ type: "stopped" });
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
    setupMediaRecorder,
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
