import React from 'react';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function CodeBlock({ language, value }) {
  const formattedValue = Array.isArray(value) ? value.join('\n') : value;
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      customStyle={{
        borderRadius: '5px',
        padding: '1em',
      }}
      codeTagProps={{
        className: 'custom-code-tag-class',
      }}
      useInlineStyles={true}
      showLineNumbers={true}
      lineNumberContainerStyle={{
        float: 'left',
        paddingRight: '1em',
        userSelect: 'none',
      }}
      lineNumberStyle={lineNumber => ({
        color:
          lineNumber % 2 === 0
            ? 'rgba(255, 255, 255, 0.3)'
            : 'rgba(255, 255, 255, 0.5)',
      })}
      wrapLines={true}
      wrapLongLines={true}
      lineProps={lineNumber => ({
        style: {
          backgroundColor:
            lineNumber % 2 === 0 ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
        },
      })}
    >
      {formattedValue}
    </SyntaxHighlighter>
  );
}
