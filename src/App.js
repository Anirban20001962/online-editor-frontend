import 'xterm/css/xterm.css';
import Editor from '@monaco-editor/react';
import { Buttons, Terminal } from './components';
import { useEffect, useRef, useState } from 'react';
import socket from './socket';
import EVENTS from './events';
import { DEFAULT_THEME, EXTENSIONS, LANGUAGES } from './constants';
import { Box, Spinner, Container, useMediaQuery } from '@chakra-ui/react';
import { useEditorTheme } from './hooks';
import { fileOpen, fileSave } from 'browser-fs-access';
import Head from './components/Head';

function App() {
    const [language, setLanguage] = useState('javascript');
    const [content, setContent] = useState(LANGUAGES[language].initialContent);
    const [theme, setTheme] = useState(DEFAULT_THEME);
    const [colors, setColors] = useState();
    const [fontSize, setFontSize] = useState(18);
    const [themesAvaliable, colorsAvaliable] = useEditorTheme();
    const editorRef = useRef(null);

    const [isLarger600] = useMediaQuery('(min-width: 600px)');

    useEffect(() => {
        const editor = document.querySelector('.editor');
        if (editor) editor.focus();
    }, [colors]);

    useEffect(() => {
        if (!isLarger600) {
            setFontSize(12);
        }
    }, [isLarger600]);

    const openFile = async () => {
        const extensions = EXTENSIONS;
        console.log(extensions);
        const blob = await fileOpen({
            extensions,
            excludeAcceptAllOption: true,
        });
        const text = await blob.text();
        const ext = blob.name.split('.')[1];
        const lang = Object.keys(LANGUAGES).filter(
            (l) => LANGUAGES[l].ext === '.' + ext
        )[0];

        setLanguage(lang);
        setContent(text);
    };

    const saveFile = async () => {
        // const extensions = Object.values(LANGUAGES).map((v) => v.ext);
        let { ext } = LANGUAGES[language];

        const blob = new Blob([content], {
            type: [`text/${ext}`],
        });

        await fileSave(blob, {
            fileName: `code${ext}`,
            extensions: [ext],
            startIn: 'downloads',
        });
    };

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
            <Head description="Online Editor for Ts, Js, C , Cpp and Python" />
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
                        saveFile={saveFile}
                        openFile={openFile}
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
