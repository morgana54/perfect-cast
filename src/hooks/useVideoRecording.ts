import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

export const useVideoRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(() => {
    if (mediaRecorderRef.current && !isRecording) {
      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast.success("Recording started");
    }
  }, [isRecording]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording stopped");
    }
  }, [isRecording]);

  const handleVideoSave = useCallback(async (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `recording-${new Date().toISOString()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const setupMediaRecorder = useCallback(
    (stream: MediaStream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        chunksRef.current = [];
        handleVideoSave(blob);
      };
    },
    [handleVideoSave]
  );

  return {
    isRecording,
    startRecording,
    stopRecording,
    setupMediaRecorder,
  };
};
