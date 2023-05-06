import fs from 'fs';
import path from 'path';

function readFilesRecursively(dir, fileContents = []) {
  const filenames = fs.readdirSync(dir);

  filenames.forEach(filename => {
    const filePath = path.join(dir, filename);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      readFilesRecursively(filePath, fileContents);
    } else if (/\.js$/.test(filename)) {
      const content = fs.readFileSync(filePath, 'utf8');
      fileContents.push({
        filename: path.relative(process.cwd(), filePath),
        content,
        lang: 'javascript',
      });
    }
  });

  return fileContents;
}

export default async function handler(req, res) {
  try {
    // Read the contents of the 'src' directory and its subdirectories
    const srcDirectory = path.join(process.cwd(), 'src');
    const fileContents = readFilesRecursively(srcDirectory);

    res.status(200).json({ fileContents });
  } catch (error) {
    console.error('Error in sourceCode API:', error);
    res.status(500).json({
      message: 'An error occurred while fetching the source code.',
      error: error.message,
    });
  }
}
