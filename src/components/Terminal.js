import { useEffect, useRef, useState } from 'react';
import { CONTENTS } from '@/utils/commandHelper';
import Command from './Command';
import styles from './Terminal.module.css';

export default function Terminal() {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(false);
  const terminalRef = useRef(null);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);

  const escapeHTML = str =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const executeCommand = async command => {
    if (command === 'clear') {
      setCommands([]);
      return;
    }

    if (command === '') {
      return '';
    }

    const parts = command.split(' ').filter(part => part !== '');
    const [baseCommand, ...args] = parts;
    command = parts.join(' ');

    const commandAcceptsArgs = baseCommand === 'theme';

    if (baseCommand in CONTENTS && (args.length === 0 || commandAcceptsArgs)) {
      return await CONTENTS[baseCommand](...args);
    } else {
      return CONTENTS._error(escapeHTML(command));
    }
  };

  const addCommand = async command => {
    setLoading(true);

    const newCommand = { command, output: 'Loading...' };
    setCommands(prevCommands => [...prevCommands, newCommand]);

    const output = await executeCommand(command);
    newCommand.output = output;

    setCommandHistory(prevCommandHistory => [...prevCommandHistory, command]);
    setHistoryIndex(prevHistoryIndex => prevHistoryIndex + 1);

    setLoading(false);
    if (terminalRef) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  const focusInputField = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.ctrlKey && event.key === 'l') {
        event.preventDefault();
        addCommand('clear');
      } else if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        focusInputField();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.terminal} ref={terminalRef}>
      {commands.map(({ command, output }, index) => (
        <Command command={command} output={output} key={index} />
      ))}
      {!loading && (
        <Command
          onSubmit={command => addCommand(command)}
          commandHistory={commandHistory}
          historyIndex={historyIndex}
          setHistoryIndex={setHistoryIndex}
          inputRef={inputRef}
        />
      )}
    </div>
  );
}
