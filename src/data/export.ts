/**
 * @author Niklas Korz
 * This module defines functions for exporting and saving projects to the local filesystem.
 */
import { saveAs } from "file-saver";
import Zip from "jszip";
import Project from "../project/Project";

/**
 * Serializes the given project as JSON and compresses it along its audio
 * data in a ZIP file. The audio data is saved as one file per audio in a
 * dedicated subdirectory "audio".
 */
export const createZip = async (project: Project): Promise<Blob> => {
  const metadata = project.toData();
  const zip = new Zip();
  zip.file("metadata.json", JSON.stringify(metadata));

  const audioLibrary: Array<{ id: number; name: string; type: string }> = [];
  const audioFolder = zip.folder("audio");
  for await (const [key, value] of project.audioLibrary.entries()) {
    audioLibrary.push({ id: key, name: value.name, type: value.type });
    audioFolder.file(key.toString(), value.data);
  }
  zip.file("audioLibrary.json", JSON.stringify(audioLibrary));

  return zip.generateAsync({ type: "blob" });
};

/**
 * Saves the given project, including its audio data, as a zip file on the
 * user's local filesystem
 */
export const saveAsZip = async (project: Project): Promise<void> => {
  const data = await createZip(project);
  saveAs(data, `${project.name}.audio3d.zip`);
};
