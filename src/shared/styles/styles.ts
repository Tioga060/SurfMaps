import { createMuiTheme } from '@material-ui/core/styles';
import { color } from 'csx';

export const globalColors = {
    pageBackground: color('#2d2d35'), // OLD: #33333d
    themePrimary: color('#5C7293'),
    themePrimaryMuted: color('#404554'),
    themeSecondary: color('#996666'),
    error: color('#FF0000'),

    cardColor: color('#373740'),
};

export const globalSizes = {
    modalWidth: 280,
    topBarHeight: '64px',
    smallFont: '14px',
};

export const theme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            default: globalColors.pageBackground.toString(),
            paper: globalColors.pageBackground.toString(),
        },
        primary: {
            // light: will be calculated from palette.primary.main,
            main: globalColors.themePrimary.toString(),
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: globalColors.themeSecondary.toString(),
        },
        // error: will use the default color
    },
    typography: {
        useNextVariants: true,
    },
});
