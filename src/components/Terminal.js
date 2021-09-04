import { useEffect, useState } from 'react';
import socket from '../socket';
import EVENTS from '../events';
import { Box, Heading, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { IoTerminal } from 'react-icons/io5';

/**
 * @type {motion<import("@chakra-ui/react").ChakraComponent>}
 */
const MotionBox = motion(Box);

const Terminal = ({ colors }) => {
    const [output, setOutput] = useState([]);
    useEffect(() => {
        socket.on(EVENTS.RUNNING, (data) => setOutput(data));

        socket.on(EVENTS.OUTPUT, (data) => {
            let outSocket = data.split('\n');
            // outSocket.pop();
            outSocket = outSocket.map((el, index) => {
                if (el === '') {
                    return undefined;
                }
                return <p key={index}>{'> ' + el}</p>;
            });
            setOutput(outSocket);
        });
    }, [colors]);

    return (
        // showOutput && (
        <MotionBox
            color={colors.foreground}
            bg={colors.background}
            width="100%"
            // position="absolute"
            bottom="0"
            drag="y"
            height="350px"
            overflow="hidden"
            dragConstraints={{
                top: -200,
                bottom: 0,
            }}
            dragMomentum={false}
            marginTop="-1"
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            dragElastic={0}
        >
            <MotionBox
                textAlign="left"
                px="4"
                py="2"
                bg={colors.lineHighlightBackground}
                whileHover={{
                    cursor: 'n-resize',
                }}
            >
                <Heading as="h4" fontSize="lg" fontWeight="medium">
                    <Icon as={IoTerminal} mr="2" />
                    Output
                </Heading>
            </MotionBox>
            <Box px="4">
                {/* <Textarea readOnly> */}
                {output}
                {/* </Textarea> */}
            </Box>
        </MotionBox>
        // )
    );
};

export default Terminal;
