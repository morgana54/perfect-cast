
import { RecordingState } from "@/hooks/useVideoRecording";
import { VideoPopupContent } from "../VideoPopup/VideoPopupContent";
import { Button } from "../ui/button";
import { LoaderCircle, RefreshCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useSupabaseUpload } from "@/supabase/useUpload";
import { useClient } from "@/supabase/useClient";
import { assertIsNotNullish } from "@/lib/assertIsNotNullish";

interface SubmissionDialogProps {
  recordingState: RecordingState;
  recordingId: string | null;
  onRecordAgain: () => void;
  listingId: string | undefined;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubmissionDialog({
  recordingState,
  recordingId,
  onRecordAgain,
  listingId,
  isOpen,
  onOpenChange,
}: SubmissionDialogProps) {
  const upload = useSupabaseUpload();
  const client = useClient();

  const onSubmit = async () => {
    if (
      recordingState.type !== "recorded" ||
      !recordingState.blob ||
      !recordingId ||
      !listingId
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
      .insert({
        user_name: "KUBA",
        bucket_video_url: videoUrl,
        eleven_conversation_id: recordingId,
        listing_id: parseInt(listingId),
      })
      .select();

    console.log(data, error);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[1200px] max-w-max">
        <DialogHeader>
          <DialogTitle>Here's your casting recording</DialogTitle>
          <DialogDescription>
            {upload.uploadedUrl ? (
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
            ) : (
              <>
                <p className="mb-4 mt-1">Do you want to submit it?</p>
                <VideoPopupContent
                  className="w-full aspect-video object-cover rounded-xl"
                  blob={
                    recordingState.type === "recorded"
                      ? recordingState.blob
                      : null
                  }
                />
                <div className="flex mt-4 gap-4">
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={onSubmit}
                    disabled={upload.isUploading}
                  >
                    {upload.isUploading && (
                      <LoaderCircle className="animate-spin" />
                    )}
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
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
