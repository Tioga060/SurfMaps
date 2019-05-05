import React from 'react';
import debounce from 'lodash/debounce';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { EditMapDrawerContent } from './components/EditMapDrawerContent';
import { MapPage, MapPageContainer } from '../../';
import { mockMap } from '../../_mocks/_data';
import { classNames as cn } from './styles';
import { IMap } from 'shared/types';

export enum MODES {
    ADD,
    EDIT,
}

interface IState {
    currentMap: IMap;
    currentMapId: string;
    mode: MODES;
}

interface IProps {}

export class EditMap extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            currentMap: mockMap,
            currentMapId: '',
            mode: MODES.ADD,
        }
        this.setCurrentMap = this.setCurrentMap.bind(this);
        this.refreshMap = debounce(this.refreshMap.bind(this), 250);
    }

    public componentDidUpdate() {
        console.log(this.state.currentMapId);
    }

    public setCurrentMap = (map: IMap) => {
        this.setState(() => ({
            currentMap: map,
        }))
    }

    public refreshMap = (mapId: string) => {
        this.setState(() => ({
            currentMapId: mapId,
            mode: MODES.EDIT,
        }));
    }

    public render() {
        return (
            <>
                <Drawer
                    className={cn.drawer}
                    variant="permanent"
                    classes={{
                        paper: cn.drawerPaper
                    }}
                >
                    <div className={cn.drawerHeader}>
                        <Typography variant="h5" className="mt-3" align="center">
                            Add/Edit Map
                        </Typography>
                    </div>
                    <Divider />
                    <div className="p-2">
                        <EditMapDrawerContent setCurrentMap={this.setCurrentMap} mode={this.state.mode} refreshMap={this.refreshMap}/>
                    </div>
                </Drawer>
                <main className={cn.content}>
                    {!this.state.currentMapId.length
                        ? <MapPage map={this.state.currentMap} />
                        : <MapPageContainer mapId={this.state.currentMapId} />
                    }
                </main>
            </>
        )
    }
}