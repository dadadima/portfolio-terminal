// pages/sourceCodePage.js
import React, { useState, useEffect } from 'react';

export default function SourceCodePage() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/sourceCode');
      const data = await response.json();
      setFiles(data.fileContents);
    };

    fetchData();
  }, []);

  // Render the files data
  // ...
}
