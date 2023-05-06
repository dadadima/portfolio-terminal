const fs = require('fs');
const path = require('path');

function readFilesRecursively(dir, fileContents = []) {
  const ignored = ['node_modules'];
  const filenames = fs.readdirSync(dir);

  filenames.forEach(filename => {
    if (ignored.includes(filename)) return;

    const filePath = path.join(dir, filename);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      readFilesRecursively(filePath, fileContents);
    } else {
      const ext = path.extname(filename);
      if (ext === '.js') {
        const content = fs.readFileSync(filePath, 'utf8');
        fileContents.push({
          filename: path.relative(process.cwd(), filePath),
          content,
          lang: ext.substring(1),
        });
      }
    }
  });

  return fileContents;
}

module.exports = readFilesRecursively;
