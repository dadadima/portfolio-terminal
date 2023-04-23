import { useEffect, useState, useRef, useCallback } from 'react';
import { COMMANDS } from '@/utils/commands';
import { THEMES } from '@/utils/themes';
import styles from './Input.module.css';

const commandNames = COMMANDS.map(cmd => cmd.command);

export default function Input({
  command,
  onSubmit,
  commandHistory,
  historyIndex,
  setHistoryIndex,
}) {
  const [_command, setCommand] = useState(command ? command : '');
  const [isValidCommand, setIsValidCommand] = useState(false);
  const [autocompleteIndex, setAutocompleteIndex] = useState(0);
  const originalPrefixRef = useRef('');
  const matchingCommandsRef = useRef([]);

  const autocompleteCommand = useCallback(() => {
    if (!originalPrefixRef.current) {
      originalPrefixRef.current = _command.trim();
      matchingCommandsRef.current = commandNames.filter(cmd =>
        cmd.startsWith(originalPrefixRef.current)
      );
    }

    if (matchingCommandsRef.current.length > 0) {
      setCommand(
        matchingCommandsRef.current[
          autocompleteIndex % matchingCommandsRef.current.length
        ]
      );
      setAutocompleteIndex(autocompleteIndex + 1);
    } else {
      setAutocompleteIndex(0);
    }
  }, [autocompleteIndex, _command]);

  const handleKeyDown = useCallback(
    e => {
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
      } else {
        originalPrefixRef.current = '';
        matchingCommandsRef.current = [];
      }
    },
    [historyIndex, commandHistory, autocompleteCommand]
  );

  const checkValidCommand = useCallback(cmd => {
    const [baseCommand, ...args] = cmd.trim().split(' ');
    const isValidBaseCommand =
      commandNames.includes(baseCommand) || baseCommand === 'clear';

    if (!isValidBaseCommand) {
      return false;
    }

    if (baseCommand === 'theme' && args.length > 0) {
      return args[0] === '--help' || Object.keys(THEMES).includes(args[0]);
    }

    return args.length === 0;
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      setCommand('');
      return onSubmit(_command.trim());
    },
    [_command, onSubmit]
  );

  useEffect(() => {
    setIsValidCommand(checkValidCommand(_command));
  }, [_command, checkValidCommand]);

  return (
    <form onSubmit={handleSubmit}>
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
