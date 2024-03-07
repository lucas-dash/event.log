"use client";

import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { useState } from "react";
import useUser from "@/lib/hooks/useUser";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";

type UploaderProps = {
  avatar?: boolean;
};

export default function Uploader({ avatar }: UploaderProps) {
  const user = useUser();

  const onBeforeRequest = async (req: any) => {
    const supabase = createSupabaseClient();

    const { data } = await supabase.auth.getSession();
    req.setHeader("Authorization", `Bearer ${data?.session?.access_token}`);
  };

  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
        maxFileSize: 5 * 1024 * 1024,
      },
    }).use(Tus, {
      endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`,
      onBeforeRequest,
      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contetnType",
        "cacheControl",
      ],
    }),
  );

  uppy.on("file-added", (files) => {
    // eslint-disable-next-line no-param-reassign
    files.meta = {
      ...files.meta,
      bucketName: "covers",
      contentType: files.type,
    };
  });

  const handleUploads = () => {
    if (uppy.getFiles().length !== 0) {
      if (!avatar) {
        uppy.setFileMeta(uppy.getFiles()[0].id, {
          objectName: `${user?.id}/events/${uppy.getFiles()[0].name}`,
        });

        uppy.upload();
      }
      if (avatar) {
        uppy.setFileMeta(uppy.getFiles()[0].id, {
          objectName: `${user?.id}/avatar/${uppy.getFiles()[0].name}`,
        });

        uppy.upload();
      }
    } else {
      alert("No files to upload");
    }
  };

  return (
    <div className="space-y-2">
      <Dashboard uppy={uppy} hideUploadButton />
      {avatar && (
        <Button className="w-full" onClick={handleUploads}>
          Upload Cover
        </Button>
      )}
    </div>
  );
}
