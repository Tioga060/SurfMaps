import { style } from 'typestyle';
import { globalSizes } from 'shared/styles';

//todo update this dynamically
export const classNames = {
    topBarDrawerNormal: style({
        width: '100%',
    }),
    topBarDrawerOffset: style({
        marginLeft: globalSizes.modalWidth,
        width: `calc(100% - ${globalSizes.modalWidth}px)`,
    }),
    menuButton: style({
        marginLeft: -12,
        marginRight: 20,
    }),
}