import readFilesRecursively from '@/lib/readFiles';

export default async function handler(req, res) {
  try {
    const srcDirectory = process.env.NODE_ENV === 'production' ? `${process.env.PROJECT_ROOT}/src` : `${process.cwd()}/src`;
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
