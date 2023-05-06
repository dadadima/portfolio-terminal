const fs = require('fs');
const path = require('path');

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

module.exports = readFilesRecursively;
