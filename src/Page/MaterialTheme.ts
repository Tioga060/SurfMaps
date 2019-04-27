import { createMuiTheme } from '@material-ui/core/styles';
import { globalColors } from 'shared/styles';

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
});
