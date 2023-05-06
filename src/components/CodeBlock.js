import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function CodeBlock({ language, value }) {
  return (
    <SyntaxHighlighter language={language} style={atomOneDark}>
      {value}
    </SyntaxHighlighter>
  );
}
