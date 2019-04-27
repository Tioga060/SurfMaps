import { style } from 'typestyle';
import { globalColors } from 'shared/styles';

const userListHeight = '160px';

export const classNames = {
    addUserContainer: style({
        border: '1px solid',
        borderColor: globalColors.themePrimary.toString(),
        borderRadius: '4px',
        backgroundColor: globalColors.cardColor.toString(),
    }),
    userListContainer: style({
        maxHeight: userListHeight,
        overflowY: 'auto',
        padding: '0.5rem',
    }),
    buttonSize: style({
        height: '36px',
        width: '36px',
        padding: 0,
    }),
};
