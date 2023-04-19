import Input from "./Input";
import Output from "./Output";

// Add commandHistory, historyIndex, and setHistoryIndex as props
export default function Command({
                                    command,
                                    output,
                                    onSubmit,
                                    commandHistory,
                                    historyIndex,
                                    setHistoryIndex,
                                    isValidCommand, // Add this prop
                                }) {
    return (
        <div>
            <Input
                command={command}
                onSubmit={(command) => onSubmit(command)}
                commandHistory={commandHistory}
                historyIndex={historyIndex}
                setHistoryIndex={setHistoryIndex}
                isValidCommand={isValidCommand} // Pass down the isValidCommand prop
            />
            {output && <Output output={output}/>}
        </div>
    );
}


