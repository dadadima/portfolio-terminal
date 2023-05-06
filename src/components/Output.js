import React from 'react';
import styles from './Output.module.css';
import CodeBlock from './CodeBlock';

export default function Output({ output }) {
  const isSourceCode = Array.isArray(output);
  const formattedOutput = isSourceCode
    ? output.map((file, index) => (
        <div key={index}>
          <p className={styles.filename}>{file.filename}</p>
          <CodeBlock language={file.lang} value={file.content} />
          <br/>
        </div>
      ))
    : output;

  return (
    <div>
      {isSourceCode ? (
        formattedOutput
      ) : (
        <div dangerouslySetInnerHTML={{ __html: formattedOutput }} />
      )}
    </div>
  );
}
