import React from 'react';
import get from 'lodash/get';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { EditMapDrawerContent } from './components/EditMapDrawerContent';
import { MapPage } from '../MapPage';
import { classNames as cn } from './styles';
import { IMap } from 'shared/types';
import { IDisplayMap } from 'pages/MapPage/types';
import { getDefaultDisplayMap, convertIMapToEditState, MODES } from '../../helpers'

interface IState {
    currentMap: IDisplayMap;
    mode: MODES;
}

interface IProps {
    map?: IMap;
    refreshMap: (mapId: string) => void;
}

export class EditMap extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        const currentMap = !!props.map
            ? convertIMapToEditState(this.props.map!)
            : getDefaultDisplayMap(get(this.props, 'map.userByUploaderId.userSteamInfoByUserId'));
        this.state = {
            currentMap,
            mode: props.map ? MODES.EDIT : MODES.ADD,
        }
        this.setCurrentMap = this.setCurrentMap.bind(this);
    }

    public componentDidUpdate (prevProps: IProps) {
        if (prevProps.map !== this.props.map && !!this.props.map) {
            console.log(this.props.map)
            this.setState(() => ({
                mode: MODES.EDIT,
                currentMap: convertIMapToEditState(this.props.map!),
            }));
        }
    }

    public setCurrentMap = (map: IDisplayMap) => {
        this.setState(() => ({
            currentMap: map,
        }))
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
                        <EditMapDrawerContent
                            setCurrentMap={this.setCurrentMap}
                            mode={this.state.mode}
                            refreshMap={this.props.refreshMap}
                            mapState={this.props.map ? convertIMapToEditState(this.props.map) : undefined}
                            originalMap={this.props.map}
                        />
                    </div>
                </Drawer>
                <main className={cn.content}>
                    <MapPage map={this.state.currentMap} />
                </main>
            </>
        )
    }
}