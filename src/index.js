import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Fonts } from './components';

const theme = extendTheme({
    components: {
        Select: {
            defaultProps: {
                size: 'lg',
            },
        },
        Input: {
            defaultProps: {
                size: 'lg',
            },
        },
        Button: {
            defaultProps: {
                size: 'lg',
                variant: 'base',
            },
            variants: {
                base: {},
            },
        },
    },
    fonts: {
        heading: 'Inconsolata-Bold',
        body: 'Inconsolata',
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <Fonts />
            <App />
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
