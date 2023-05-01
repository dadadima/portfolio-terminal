import Input from './Input';
import Output from './Output';

export default function Command({
  command,
  output,
  onSubmit,
  commandHistory,
  historyIndex,
  setHistoryIndex,
  inputRef,
}) {
  return (
    <div>
      <Input
        command={command}
        onSubmit={onSubmit}
        commandHistory={commandHistory}
        historyIndex={historyIndex}
        setHistoryIndex={setHistoryIndex}
        inputRef={inputRef}
      />
      {output && <Output output={output} />}
    </div>
  );
}
