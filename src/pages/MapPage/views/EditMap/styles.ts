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
