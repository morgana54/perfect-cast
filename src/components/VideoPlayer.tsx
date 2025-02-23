import { useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface VideoPlayerProps {
  url: string;
}

export const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Get the public URL for the video if it's a Supabase storage path
  const videoUrl = url.startsWith('https://') 
    ? url 
    : `${supabase.storage.from('videos').getPublicUrl(url).data.publicUrl}`;

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      className="w-full h-full object-cover rounded-xl"
      controls
      playsInline
    />
  );
};
