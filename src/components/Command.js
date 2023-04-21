import Input from './Input';
import Output from './Output';

// Add commandHistory, historyIndex, setHistoryIndex, isValidCommand as props
export default function Command({
  command,
  output,
  onSubmit,
  commandHistory,
  historyIndex,
  setHistoryIndex,
  isValidCommand,
}) {
  return (
    <div>
      <Input
        command={command}
        onSubmit={command => onSubmit(command)}
        commandHistory={commandHistory}
        historyIndex={historyIndex}
        setHistoryIndex={setHistoryIndex}
        isValidCommand={isValidCommand}
      />
      {output && <Output output={output} />}
    </div>
  );
}
