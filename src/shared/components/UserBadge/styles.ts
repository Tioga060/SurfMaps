import { style } from 'typestyle';

export const classNames = {
    iconImage: style({
        width: '20px',
        height: '20px',
    }),
    noNameWidth: style({
        minWidth: '20px',
    }),
    nameOverflow: style({
        minWidth: 0,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    })
};
