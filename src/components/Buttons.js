import {
    IconButton,
    Select,
    Stack,
    StackItem,
    Input,
    NumberInput,
    NumberInputField,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputStepper,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormLabel,
    useDisclosure,
    ModalCloseButton,
    Flex,
    Heading,
} from '@chakra-ui/react';
import { LANGUAGES } from '../constants';
import { IoPlay, IoSettings } from 'react-icons/io5';

const Options = ({ isOpen, onClose, color, bg, ...props }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent
                bg={bg}
                color={color}
                sx={{
                    'select option': {
                        bg: bg,
                        color: color,
                        fontFamily: 'inherit',
                        fontWeight: 'medium',
                    },
                    '& select, & input': {
                        border: `2px solid ${color}`,
                    },

                    '& select:focus, & input:focus, & input:hover, & select:hover':
                        {
                            boxShadow: 'none',
                            borderColor: color,
                        },
                }}
            >
                <ModalCloseButton />
                <ModalHeader>Settings</ModalHeader>
                <ModalBody>{props.children}</ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};

export default function Buttons({
    updateTheme,
    runCode,
    setLanguage,
    setContent,
    theme,
    language,
    colors,
    themes,
    fontSize,
    setFontSize,
}) {
    const handleFontSize = (value) => setFontSize(value);
    const { onOpen, isOpen, onClose } = useDisclosure();
    return (
        <Stack
            spacing="2"
            direction="row"
            justifyContent="flex-end"
            color={colors.foreground}
            bg={colors.background}
            px="2"
            py="1"
            className="base-name"
        >
            <Flex alignItems="center" justifyContent="center" mr="auto">
                <Heading as="h3" size="lg">
                    Snippet Ground
                </Heading>
            </Flex>
            <Options
                isOpen={isOpen}
                onClose={onClose}
                color={colors.foreground}
                bg={colors.background}
            >
                <Stack>
                    <StackItem>
                        <FormLabel>Theme: </FormLabel>
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
                        <FormLabel>Font Size: </FormLabel>
                        <NumberInput
                            type="number"
                            sx={{
                                '.base-name &': {
                                    width: '3.5rem',
                                },
                            }}
                            value={fontSize}
                            max={40}
                            onChange={handleFontSize}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </StackItem>
                    <StackItem>
                        <FormLabel>Language: </FormLabel>
                        <Select
                            fontWeight="medium"
                            value={language}
                            onChange={(e) => {
                                let { value } = e.target;
                                setLanguage(value);
                                setContent(LANGUAGES[value].initialContent);
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
                </Stack>
            </Options>
            <StackItem>
                <Input
                    readOnly
                    value={`Language: ${language}`}
                    w="fit-content"
                />
            </StackItem>
            <StackItem>
                <IconButton
                    icon={<Icon as={IoSettings} />}
                    bg="inherit"
                    color="inherit"
                    onClick={onOpen}
                    size="md"
                />
            </StackItem>
            <StackItem>
                <IconButton
                    icon={<Icon as={IoPlay} />}
                    onClick={runCode}
                    bg="inherit"
                    color="inherit"
                    size="md"
                >
                    Run
                </IconButton>
            </StackItem>
        </Stack>
    );
}
