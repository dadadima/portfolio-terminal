import fs from 'fs';
import path from 'path';

function readFilesRecursively(dir, fileContents = []) {
  const filenames = fs.readdirSync(dir);

  filenames.forEach((filename) => {
    const filePath = path.join(dir, filename);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      readFilesRecursively(filePath, fileContents);
    } else if (/\.js$/.test(filename)) {
      const content = fs.readFileSync(filePath, 'utf8');
      fileContents.push({
        filename: path.relative(process.env.NODE_ENV === 'production' ? process.env.PROJECT_ROOT : process.cwd(), filePath),
        content,
        lang: 'javascript',
      });
    }
  });

  return fileContents;
}

export default readFilesRecursively;
