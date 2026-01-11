"use client";

import { FileUploader } from "@aws-amplify/ui-react-storage";

export default function MigrationFileUploader() {
  function handleUploadError(err: any) {}

  function handleUploadSuccess(successEvent: any) {}
  return (
    <div className="file-uploader">
      <FileUploader
        acceptedFileTypes={["*"]}
        path={`migration/managers/`}
        autoUpload={false}
        maxFileCount={1}
        isResumable
        onUploadError={handleUploadError}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
