import "./App.css";
import "xterm/css/xterm.css";
import Editor from "@monaco-editor/react";
import { Terminal } from "./components";
import { useCallback, useState } from "react";
import socket from "./socket";
import EVENTS from "./events";

const LANGUAGES = {
    javascript: {
        ext: ".js",
    },
    python: {
        ext: ".py",
    },
    typescript: {
        ext: ".ts",
    },
};

function App() {
    const [content, setContent] = useState("///Start coding");
    const [language, setLanguage] = useState(Object.keys(LANGUAGES)[0]);
    const [theme, setTheme] = useState("vs-dark");
    const [isEditorReady, setIsEditorReady] = useState(false);

    const handleEditorDidMount = () => {
        setIsEditorReady(true);
    };

    const toggleTheme = () => {
        setTheme(theme === "vs-dark" ? "light" : "vs-dark");
    };

    const runCode = useCallback(() => {
        socket.emit(EVENTS.RUN, {
            content,
            language,
            ext: LANGUAGES[language].ext,
        });
    }, [content, language]);

    return (
        <div className="container">
            <Terminal />
            <div>
                <div className="flex">
                    <button onClick={toggleTheme} disabled={isEditorReady}>
                        {theme}
                    </button>
                    <button onClick={runCode} disabled={isEditorReady}>
                        Run
                    </button>
                    <select
                        onChange={(e) => {
                            setLanguage(e.target.value);
                        }}
                    >
                        {Object.keys(LANGUAGES).map((lang, i) => (
                            <option value={lang} key={i}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </div>
                <Editor
                    value={content}
                    onChange={(value) => setContent(value)}
                    language={language}
                    theme={theme}
                    height="100%"
                    editorDidMount={handleEditorDidMount}
                />
            </div>
        </div>
    );
}

export default App;
