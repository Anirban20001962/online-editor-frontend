import { IconButton, Icon } from '@chakra-ui/react';

const Button = ({ iconName, onClick, label }) => {
    return (
        <IconButton
            sx={{
                '&::before': {
                    content: 'attr(data-label)',
                    zIndex: 10,
                    fontSize: 'xs',
                    bg: 'inherit',
                    color: 'inherit',
                    borderRadius: 'inherit',
                    bottom: '-15px',
                    position: 'absolute',
                    display: 'none',
                },

                '&:hover::before': {
                    display: 'flex',
                    px: '2',
                    py: '1',
                },
            }}
            data-label={label}
            icon={<Icon as={iconName} />}
            bg="inherit"
            color="inherit"
            onClick={onClick}
            size="md"
        />
    );
};

export default Button;
