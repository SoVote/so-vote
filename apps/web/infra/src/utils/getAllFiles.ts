import * as fs from "fs";
import * as pathUtils from "path";

export const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []) => {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const path = `${dirPath}/${file}`
    if (fs.statSync(path).isDirectory()) {
      arrayOfFiles = getAllFiles(path, arrayOfFiles);
    } else {
      arrayOfFiles.push(pathUtils.join(path));
    }
  });

  return arrayOfFiles;
}