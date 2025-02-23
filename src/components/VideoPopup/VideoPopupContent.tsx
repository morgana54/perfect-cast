
import { useEffect, useRef } from "react";

interface VideoPopupContentProps {
  blob: Blob | null;
  className?: string;
}

export function VideoPopupContent({ blob, className }: VideoPopupContentProps) {
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
