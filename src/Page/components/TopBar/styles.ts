import { style } from 'typestyle';
import { globalSizes } from 'shared/styles';

//todo update this dynamically
export const classNames = {
    topBar: style({
        marginLeft: '260px',
        width: `calc(100% - ${globalSizes.modalWidth})`,
    }),
    menuButton: style({
        marginLeft: -12,
        marginRight: 20,
    }),
}