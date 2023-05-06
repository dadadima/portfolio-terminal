import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const dataPath = path.join(process.cwd(), 'sourceCodeData.json');
    const fileContents = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    res.status(200).json({ fileContents });
  } catch (error) {
    console.error('Error in sourceCode API:', error);
    res.status(500).json({
      message: 'An error occurred while fetching the source code.',
      error: error.message,
    });
  }
}
