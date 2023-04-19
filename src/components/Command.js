import Input from "./Input";
import Output from "./Output";

// Add commandHistory, historyIndex, and setHistoryIndex as props
export default function Command({command, output, onSubmit, commandHistory, historyIndex, setHistoryIndex}) {
    return (
        <div>
            <Input
                command={command}
                onSubmit={(command) => onSubmit(command)}
                commandHistory={commandHistory}
                historyIndex={historyIndex}
                setHistoryIndex={setHistoryIndex} // Add this prop
            />
            {output && <Output output={output}/>}
        </div>
    );
}

