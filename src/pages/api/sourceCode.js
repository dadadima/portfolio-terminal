import path from 'path';
import readFilesRecursively from '../../lib/readFiles';

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
