import readFilesRecursively from '@/lib/readFiles';
import path from 'path';

export default async function handler(req, res) {
  try {
    const srcDirectory = path.join(process.env.PROJECT_ROOT || __dirname, '..', '..', 'src');
    console.log('srcDirectory:', srcDirectory);

    const fileContents = readFilesRecursively(srcDirectory);
    console.log('fileContents:', fileContents);

    res.status(200).json({ fileContents });
  } catch (error) {
    console.error('Error in sourceCode API:', error);
    res.status(500).json({
      message: 'An error occurred while fetching the source code.',
      error: error.message,
    });
  }
}
