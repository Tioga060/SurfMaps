import { style } from 'typestyle';
import { globalSizes } from 'shared/styles';

//todo update this dynamically
export const classNames = {
    topBar: style({
        marginLeft: globalSizes.modalWidth,
        width: `calc(100% - ${globalSizes.modalWidth}px)`,
    }),
    menuButton: style({
        marginLeft: -12,
        marginRight: 20,
    }),
}