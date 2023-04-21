import { useEffect, useState } from 'react';
import { CONTENTS } from '../utils/commandHelper';
import styles from './Input.module.css';

export default function Input({
  command,
  onSubmit,
  commandHistory,
  historyIndex,
  setHistoryIndex,
}) {
  const [_command, setCommand] = useState(command ? command : '');
  const [isValidCommand, setIsValidCommand] = useState(false);

  const handleKeyDown = e => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, 0);
      setHistoryIndex(newIndex);
      setCommand(commandHistory[newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      setCommand(commandHistory[newIndex] || '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      autocompleteCommand();
    }
  };

  const autocompleteCommand = () => {
    const matchingCommands = Object.keys(CONTENTS).filter(cmd =>
      cmd.startsWith(_command.trim())
    );

    if (matchingCommands.length === 1) {
      setCommand(matchingCommands[0]);
    }
  };

  const checkValidCommand = cmd => {
    return cmd.trim() in CONTENTS || cmd.trim() === 'clear';
  };

  const handleSubmit = e => {
    e.preventDefault();
    setCommand('');
    return onSubmit(_command.trim());
  };

  useEffect(() => {
    setIsValidCommand(checkValidCommand(_command));
  }, [_command]);

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <label htmlFor="command">
        <span>🚀</span> <span style={{ color: 'var(--primary)' }}>~</span>{' '}
        <span style={{ color: 'var(--secondary)' }}>❯</span>
      </label>

      <input
        type="text"
        className={`${styles.input} ${
          isValidCommand ? styles.validCommand : ''
        }`}
        value={_command}
        onChange={e => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={!!command}
        ref={input => input && !command && input.focus()}
        autoFocus={command === ''}
      />
    </form>
  );
}
