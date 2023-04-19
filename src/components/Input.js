import {useState} from "react";
import styles from "./Input.module.css";

export default function Input({
                                  command,
                                  onSubmit,
                                  commandHistory,
                                  historyIndex,
                                  setHistoryIndex,
                              }) {
    const [_command, setCommand] = useState(command ? command : "");

    const handleKeyDown = (e) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            // Decrease the history index when moving up
            const newIndex = Math.max(historyIndex - 1, 0);
            setHistoryIndex(newIndex);
            setCommand(commandHistory[newIndex] || "");
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            // Increase the history index when moving down
            const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
            setHistoryIndex(newIndex);
            setCommand(commandHistory[newIndex] || "");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCommand("");
        return onSubmit(_command);
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="command">
                <span style={{color: "#ff9e64"}}>λ</span> ::{" "}
                <span style={{color: "var(--primary)"}}>~</span>{" "}
                <span style={{color: "var(--secondary)"}}>&gt;&gt;</span>
            </label>

            <input
                type="text"
                className={styles.input}
                value={_command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleKeyDown} // Add this event listener
                disabled={command ? true : false}
                ref={(input) => input && !command && input.focus()}
                autoFocus={command === ""}
            />
        </form>
    );
}
