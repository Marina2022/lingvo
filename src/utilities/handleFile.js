import Bugsnag from "@bugsnag/js";

/**
 * 
 * @param {Blob} file 
 * @param {(reader: FileReader, ev: ProgressEvent<FileReader>) => any} onload 
 * @param {(reader: FileReader, ev: ProgressEvent<FileReader>) => any | undefined} onerror
 */
export function getBase64(file, onload, onerror) {
  const reader = new FileReader();
  reader.onload = onload;
  reader.onerror = onerror || function(error) {
    console.log("Error: ", error);
    Bugsnag.notify(error)
  };
  reader.readAsDataURL(file);
}
