import { useRef, useEffect, useState } from "react";
import { Terminal as Xterm } from "xterm";
import socket from "../socket";
import EVENTS from "../events";
const Terminal = () => {
    const terminalRef = useRef(null);
    const [terminal] = useState(
        new Xterm({
            cursorBlink: true,
            cols: 80,
            rows: 300,
            theme: {
                // foreground: "black",
                background: "#292D3E",
                foreground: "#A6ACCD",
                selection: "#717CB470",
            },
            fontFamily: "Source Code Pro",
            fontSize: 12,
            fontWeight: 500,
        })
    );

    useEffect(() => {
        terminal.open(terminalRef.current);

        terminal.onData((data) => {
            socket.emit(EVENTS.INPUT, data);
        });
        socket.on(EVENTS.OUTPUT, (data) => {
            terminal.write(data);
            terminal.focus();
        });
    }, [terminal]);

    // useEffect(() => {
    //     terminal.clear();
    //     terminal.writeln(output);
    // }, [output, terminal]);

    return <div className="terminal" ref={terminalRef}></div>;
};

export default Terminal;
