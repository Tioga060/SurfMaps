import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#5C7293',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#0044ff',
        },
        // error: will use the default color
    },
});
