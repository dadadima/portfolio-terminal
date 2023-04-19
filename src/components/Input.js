import {useEffect, useState} from "react";
import {CONTENTS} from "../utils/commandHelper";
import styles from "./Input.module.css";

export default function Input({
                                  command,
                                  onSubmit,
                                  commandHistory,
                                  historyIndex,
                                  setHistoryIndex,
                              }) {
    const [_command, setCommand] = useState(command ? command : "");
    const [isValidCommand, setIsValidCommand] = useState(false);

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

    const checkValidCommand = (cmd) => {
        return cmd in CONTENTS || cmd === "clear";
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setCommand("");
        return onSubmit(_command);
    };

    useEffect(() => {
        setIsValidCommand(checkValidCommand(_command));
    }, [_command]);

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="command">
                {/*<span style={{color: "#ff9e64"}}>🚀</span>{" "}*/}
                <span style={{color: "var(--primary)"}}>~</span>{" "}
                <span style={{color: "var(--secondary)"}}>❯</span>
            </label>

            <input
                type="text"
                className={`${styles.input} ${isValidCommand ? styles.validCommand : ""}`}
                value={_command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={command ? true : false}
                ref={(input) => input && !command && input.focus()}
                autoFocus={command === ""}
            />
        </form>
    );
}
