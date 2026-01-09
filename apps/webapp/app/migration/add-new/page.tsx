"use client";
import MigrationFileUploader from "@/components/migration/file-uploader.component";
import { FileUploader } from "@aws-amplify/ui-react-storage";

export default function AddNewNewFilePage() {
  return (
    <div className="min-h-screen items-center justify-center">
      <h1 className="text-3xl">Add New Files</h1>
      <div className="file-type">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Select the file Type</legend>
          <div className="flex flex-row gap-4">
            <label className="input w-fit">
              <input
                type="radio"
                name="file-type"
                className="radio border-gray-500"
              />
              <span className="label">Manager</span>
            </label>
            <label className="input w-fit">
              <input type="radio" name="file-type" className="radio" />
              <span className="label">Cheeti</span>
            </label>
            <label className="input w-ft">
              <input type="radio" name="file-type" className="radio" />
              <span className="label">Cheeti Paata</span>
            </label>
          </div>
        </fieldset>
      </div>
      <div className="field-input">
        <MigrationFileUploader />
      </div>
    </div>
  );
}
