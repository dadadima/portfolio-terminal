import { useEffect, useRef, useState } from 'react';
import { CONTENTS } from '../utils/commandHelper';
import Command from './Command';
import styles from './Terminal.module.css';

export default function Terminal() {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(false);
  const terminalRef = useRef(null);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const escapeHTML = str =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const addCommand = async command => {
    let output;
    setLoading(true);
    setCommands([...commands, { command, output: 'Loading...' }]);
    if (`${command}` in CONTENTS) {
      output = await CONTENTS[`${command}`]();
    } else if (command === 'clear') {
      setLoading(false);
      return setCommands([]);
    } else {
      output = CONTENTS.error(escapeHTML(command));
    }

    setCommandHistory([...commandHistory, command]);
    setHistoryIndex(commandHistory.length + 1);

    setLoading(false);
    setCommands([...commands.slice(0, commands.length), { command, output }]);
    if (terminalRef) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.ctrlKey && event.key === 'l') {
        event.preventDefault(); // Prevent the default browser action for Ctrl+L (e.g. focusing the address bar)
        addCommand('clear');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [commands]);

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
        />
      )}
    </div>
  );
}
