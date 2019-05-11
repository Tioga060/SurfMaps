import { style } from 'typestyle';
import { globalColors, globalSizes, theme } from 'shared/styles';

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
        minHeight: globalSizes.topBarHeight,
    }),

    content: style({
        flexGrow: 1,
        marginLeft: globalSizes.modalWidth,
    }),

    overflowAuto: style({
        overflow: 'auto',
    }),

    drawerCard: style({
        backgroundColor: globalColors.cardColor.toString(),
        outline: '2px solid transparent',
        marginTop: '0.5rem',
        $nest: {
            '& > *': {
                marginLeft: 'auto',
                marginRight: 'auto',
                textAlign: 'center',
            }
        }
    }),

    drawerCardContent: style({
        padding: '0.5rem'
    }),

    drawerCardHeader: style({
        backgroundColor: theme.palette.secondary.main.toString(),
        padding: '0.5rem 0',
        position: 'sticky',
        top: 0,
    }),

    drawerCardError: style({
        outline: `2px solid ${theme.palette.error.light.toString()}`
    }),

    textFieldSmall: style({
        fontSize: globalSizes.smallFont
    }),

    stageNameWidth: style({
        width: '100px',
        marginTop: '1.3rem',
    }),

    tabWidth: style({
        minWidth: globalSizes.modalWidth/3.5,
        maxWidth: globalSizes.modalWidth/3.5,
    })
}
