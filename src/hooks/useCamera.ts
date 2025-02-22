import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

export const useCamera = (
  onMediaRecorderSetup: (stream: MediaStream) => void
) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const setupCamera = async () => {
      console.log("setupCamera");

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: isCameraOn,
          audio: isMicOn,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          onMediaRecorderSetup(stream);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        toast.error("Failed to access camera");
      }
    };

    if (isCameraOn) {
      setupCamera();
    } else if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isCameraOn, isMicOn, onMediaRecorderSetup]);

  return {
    isCameraOn,
    setIsCameraOn,
    isMicOn,
    setIsMicOn,
    videoRef,
  };
};
