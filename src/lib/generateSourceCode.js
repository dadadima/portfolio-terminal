const fs = require('fs');
const path = require('path');
const readFilesRecursively = require('./readFiles');

const outputFile = 'sourceCodeData.json';

function generateSourceCode() {
  try {
    const srcDirectory = path.join(process.cwd(), 'src');
    const fileContents = readFilesRecursively(srcDirectory);
    const formattedFileContents = fileContents.map(file => ({
      ...file,
      content: file.content.split('\n'),
    }));
    fs.writeFileSync(outputFile, JSON.stringify(formattedFileContents, null, 2));
    console.log(`Generated ${outputFile}`);
  } catch (error) {
    console.error('Error generating source code:', error);
    process.exit(1);
  }
}

generateSourceCode();
