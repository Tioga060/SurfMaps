import { style } from 'typestyle';
import { color } from 'csx';

const THEME_COLOR = color('#5C7293');
const THEME_SECONDARY = color('rgba(92, 114, 147, 0.54)');
const CARD_COLOR = color('#373740');
const DRAWER_COLOR = color('#33333d');
const TEXT_COLOR = color('#FFFFFF');

console.log(TEXT_COLOR.toString())

export const classNames = {
    drawerBackground: style({
        backgroundColor: DRAWER_COLOR.toString(),
    }),

    overflowAuto: style({
        overflow: 'auto',
    }),

    // Drawer Content
    drawerCard: style({
        backgroundColor: CARD_COLOR.toString(),
        padding: '0.5rem',
        marginBottom: '0.5rem',
        $nest: {
            '& > *': {
                marginLeft: 'auto',
                marginRight: 'auto',
                textAlign: 'center',
            }
        }
    }),

    tierSliderContainer: style({
        padding: '1rem',
        overflowX: 'hidden',
    }),

    textColor: style({
        color: `${TEXT_COLOR.toString()} !important`,
    }),
    themeBorder: style({
        borderColor: `${THEME_COLOR.toString()} !important`,
        $nest: {
            '&:before, &:after': {
                borderColor: `${THEME_COLOR.toString()} !important`,
            }
        }
    }),
    themeColor: style({
        color: `${THEME_COLOR.toString()} !important`,
    }),
    themeColorBackground: style({
        backgroundColor: `${THEME_COLOR.toString()} !important`,
    }),
    themeColorBackgroundSecondary: style({
        backgroundColor: `${THEME_SECONDARY.toString()} !important`,
    }),
}
