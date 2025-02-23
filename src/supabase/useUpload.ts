// hooks/useSupabaseUpload.ts
import { useState, useEffect } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useTokenContext } from "@/components/tokens/TokenContext";
import { useClient } from "./useClient";

interface UploadState {
  isUploading: boolean;
  error: string | null;
  uploadedUrl: string | null;
}

interface UseSupabaseUploadReturn extends UploadState {
  uploadFile: (
    file: File | Blob,
    fileName: string,
    bucketName: string
  ) => Promise<string | undefined>;
  reset: () => void;
}

export const useSupabaseUpload = (): UseSupabaseUploadReturn => {
  const supabase = useClient();
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    error: null,
    uploadedUrl: null,
  });

  const reset = () => {
    setState({
      isUploading: false,
      error: null,
      uploadedUrl: null,
    });
  };

  const uploadFile = async (
    fileOrBlob: File | Blob,
    fileName: string,
    bucketName: string
  ) => {
    if (!supabase) {
      setState((prev) => ({
        ...prev,
        error: "Supabase client not initialized",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isUploading: true,
      error: null,
      uploadedUrl: null,
    }));

    try {
      // Generate a unique file name if none provided
      const uniqueFileName = fileName || `${Date.now()}-upload`;

      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(uniqueFileName, fileOrBlob, {
          // You can specify content type if needed
          contentType: fileOrBlob.type || "application/octet-stream",
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(uniqueFileName);

      setState((prev) => ({
        ...prev,
        isUploading: false,
        uploadedUrl: publicUrl,
      }));

      return publicUrl;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isUploading: false,
        error: error instanceof Error ? error.message : "Upload failed",
      }));
    }
  };

  return {
    ...state,
    uploadFile,
    reset,
  };
};
