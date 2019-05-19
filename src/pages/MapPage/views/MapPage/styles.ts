import { style, cssRaw  } from 'typestyle';
import { globalColors, theme } from 'shared/styles';

const stageBoxHeight = '40px';
const mapImageWH = '150px';

//todo update this dynamically
export const classNames = {
    mapBackgroundImage: style({
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
    }),
    mapPageContainer: style({
        width: '100vw',
        maxWidth: '100%',
        minHeight: '100vh',
        alignItems: 'center',
        overflow: 'hidden',
    }),
    mapPageBody: style({
        maxWidth: '1200px',
        padding: '1rem',
        margin: 'auto',
        minHeight: '100vh',
        backgroundColor: globalColors.pageBackground.toString(),
    }),
    mapInfo: style({
        marginTop: '-0.3rem',
    }),
    mapCard: style({
        backgroundColor: globalColors.cardColor.toString(),
        padding: '1rem',
        marginBottom: '1rem',
    }),
    stageText: style({
        paddingTop: '0.60rem',
    }),
    stageBox: style({
        border: '2px solid',
        marginTop: '0.5rem',
        height: stageBoxHeight,
        cursor: 'pointer',
    }),
    stageBoxColor: style({
        borderColor: globalColors.themePrimary.toString(),
    }),
    bonusBoxColor: style({
        borderColor: globalColors.themeSecondary.toString(),
    }),
    stageTriangle: style({
        width: 0,
        height: 0,
        borderTop: '40px solid',
        borderRight: '40px solid transparent',
        position: 'absolute',
    }),
    stageTriangleColor: style({
        borderTopColor: globalColors.themePrimary.toString(),
    }),
    bonusTriangleColor: style({
        borderTopColor: globalColors.themeSecondary.toString(),
    }),
    textColor: style({
        color: theme.palette.text.primary.toString(),
    }),
    badgeContainer: style({
        $nest: {
            '& > *': {
                marginRight: '0.5rem',
            }
        }
    }),
    scrollImageContainer: style({
        //override below
    }),
    scrollImageContainerSmall: style({
        height: '170px',
    }),
    scrollImageContainerBig: style({
        height: '340px',
    }),
    scrollImage: style({
        width: mapImageWH,
        height: mapImageWH,
    }),
};

cssRaw(`
.${classNames.scrollImageContainer} {
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
}

.${classNames.scrollImageContainer}::-webkit-scrollbar {
    display: none
}
`);
