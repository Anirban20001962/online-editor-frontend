import 'xterm/css/xterm.css';
import Editor from '@monaco-editor/react';
import { Buttons, Terminal } from './components';
import { useEffect, useRef, useState } from 'react';
import socket from './socket';
import EVENTS from './events';
import { DEFAULT_THEME, LANGUAGES } from './constants';
import { Box, Spinner, Container } from '@chakra-ui/react';
import { useEditorTheme } from './hooks';

function App() {
    const [language, setLanguage] = useState('javascript');
    const [content, setContent] = useState(LANGUAGES[language].initialContent);
    const [theme, setTheme] = useState(DEFAULT_THEME);
    const [colors, setColors] = useState();
    const [fontSize, setFontSize] = useState(18);
    const [themesAvaliable, colorsAvaliable] = useEditorTheme();
    const editorRef = useRef(null);

    useEffect(() => {
        const editor = document.querySelector('.editor');
        if (editor) editor.focus();
    }, [colors]);

    const handleEditorDidMount = (_editor, monaco) => {
        for (let theme in themesAvaliable) {
            monaco.editor.defineTheme(theme, themesAvaliable[theme]);
        }
        monaco.editor.setTheme(DEFAULT_THEME);
        setColors(colorsAvaliable[DEFAULT_THEME]);
        editorRef.current = monaco;
    };

    const updateTheme = (e) => {
        const value = e.target.value;
        setTheme(value);
        setColors(colorsAvaliable[value]);
    };

    const runCode = () => {
        socket.emit(EVENTS.RUN, {
            content,
            language,
            ext: LANGUAGES[language].ext,
        });
    };

    if (!colorsAvaliable || !themesAvaliable) {
        return (
            <Container
                width="100vw"
                height="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Spinner size="lg" />
            </Container>
        );
    }

    return (
        <Box width="100%" overflow="hidden" height="100vh">
            <Box>
                {colors && (
                    <Buttons
                        runCode={runCode}
                        setLanguage={setLanguage}
                        setContent={setContent}
                        updateTheme={updateTheme}
                        theme={theme}
                        language={language}
                        themes={Object.keys(themesAvaliable)}
                        colors={colors}
                        fontSize={fontSize}
                        setFontSize={setFontSize}
                    />
                )}
                <Editor
                    value={content}
                    onChange={(value) => setContent(value)}
                    language={language}
                    options={{
                        fontSize,
                        theme,
                        fontFamily: 'Inconsolata',
                        acceptSuggestionOnEnter: true,
                        autoIndent: true,
                        minimap: {
                            enabled: false,
                        },
                    }}
                    theme={theme}
                    height="80vh"
                    loading={<Spinner size="lg" />}
                    onMount={handleEditorDidMount}
                    className="editor"
                />
            </Box>
            <Box>{colors && <Terminal colors={colors} />}</Box>
        </Box>
    );
}

export default App;
