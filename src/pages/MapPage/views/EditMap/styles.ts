import { style } from 'typestyle';
import { globalColors, globalSizes } from 'shared/styles';

export const classNames = {
    drawer: style({
        width: globalSizes.modalWidth,
        flexShrink: 0,
    }),

    drawerPaper: style({
        width: globalSizes.modalWidth,
        overflowX: 'hidden',
    }),

    drawerHeader: style({
        height: globalSizes.topBarHeight,
    }),

    content: style({
        flexGrow: 1,
        marginLeft: globalSizes.modalWidth,
    }),

    overflowAuto: style({
        overflow: 'auto',
    }),

    // Drawer Content
    drawerCard: style({
        backgroundColor: globalColors.cardColor.toString(),
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

    textFieldSmall: style({
        fontSize: globalSizes.smallFont
    }),
}
