import { style } from 'typestyle';
import { globalColors } from 'shared/styles';

const imageSize = '80px';

export const classNames = {
    thumbnail: style({
        display: 'inline-flex',
        maxWidth: imageSize,
        maxHeight: imageSize,
        borderRadius: 4,
        border: `2px dashed ${globalColors.themePrimary.toString()}`,
        margin: 4,
        padding: 4,
        boxSizing: 'border-box',
        cursor: 'pointer',
        $nest: {
            '&:hover': {
                borderColor: '#ff3300',
            }
        }
    }),
    thumbInner: style({
        display: 'flex',
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden'
    }),
    img: style({
        display: 'block',
        maxWidth: imageSize,
        maxHeight: imageSize,
    }),
    dropZoneContainer: style({
        padding: '0.5rem',
        borderRadius: '4px',
        flexGrow: 1,
    }),
    dropZone: style({
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    }),
    componentContainer: style({
        border: '1px solid',
        borderColor: globalColors.themePrimary.toString(),
        borderRadius: '4px',
        backgroundColor: globalColors.cardColor.toString(),
    }),
    imageContainer: style({
        maxHeight: '200px',
        overflowY: 'auto',
    }),
    idleStyle: style({
        borderColor: '#b7b7b7',
    }),
    activeStyle: style({
        borderColor: globalColors.themePrimary.toString(),
    }),
    acceptStyle: style({
        backgroundColor: '#e2ead5',
    }),
    rejectStyle: style({
        backgroundColor: '#ead5d5',
    }),
};
