import {
    IconButton,
    Select,
    Stack,
    StackItem,
    Input,
    Icon,
} from "@chakra-ui/react";
import { LANGUAGES } from "../constants";
import { IoPlay } from "react-icons/io5";

export default function Buttons({
    updateTheme,
    runCode,
    setLanguage,
    theme,
    language,
    colors,
    themes,
    fontSize,
    handleFontSize,
}) {
    return (
        <Stack
            spacing="2"
            direction="row"
            justifyContent="flex-end"
            sx={{
                "& select, & input": {
                    fontFamily: "inherit",
                    width: "6rem",
                },
                "select option": {
                    bg: colors.background,
                    color: colors.foreground,
                    borderColor: "transparent",
                    fontFamily: "inherit",
                    fontWeight: "medium",
                },
                "& select ,&  button, & input": {
                    border: "none",
                    outline: "none",
                },
                "& select:focus,& button:focus": {
                    outline: "none",
                },
            }}
            color={colors.foreground}
            bg={colors.background}
            px="2"
            py="1"
        >
            <StackItem>
                <Select
                    fontWeight="medium"
                    onChange={updateTheme}
                    value={theme}
                    bg="inherit"
                    color="inherit"
                    textOverflow="ellipsis"
                >
                    {themes.map((t, i) => (
                        <option value={t} key={i}>
                            {t}
                        </option>
                    ))}
                </Select>
            </StackItem>
            <StackItem>
                <Input
                    type="number"
                    value={fontSize}
                    onChange={handleFontSize}
                ></Input>
            </StackItem>
            <StackItem>
                <Select
                    fontWeight="medium"
                    value={language}
                    onChange={(e) => {
                        setLanguage(e.target.value);
                    }}
                    bg="inherit"
                    color="inherit"
                    textOverflow="ellipsis"
                >
                    {Object.keys(LANGUAGES).map((lang, i) => (
                        <option value={lang} key={i}>
                            {lang}
                        </option>
                    ))}
                </Select>
            </StackItem>
            <StackItem>
                <IconButton
                    icon={<Icon as={IoPlay} />}
                    onClick={runCode}
                    bg="inherit"
                    color="inherit"
                >
                    Run
                </IconButton>
            </StackItem>
        </Stack>
    );
}
