import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { red, green, blue } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        status: {
            success: green,
            error: red
        }
    },
});

const ThemeOrganizer = (props) => {
    console.log(theme);
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
};

export default ThemeOrganizer;