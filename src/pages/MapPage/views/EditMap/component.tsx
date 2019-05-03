import React from 'react';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { EditMapDrawerContent } from './components/EditMapDrawerContent';
import { MapPage } from '../../';
import { mockMap } from '../../_mocks/_data';
import { classNames as cn } from './styles';
import { IMap } from 'shared/types';

interface IState {
    currentMap: IMap;
}

interface IProps {}

export class EditMap extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            currentMap: mockMap,
        }
        this.setCurrentMap = this.setCurrentMap.bind(this);
    }

    public setCurrentMap = (map: IMap) => {
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
                        <EditMapDrawerContent setCurrentMap={this.setCurrentMap}/>
                    </div>
                </Drawer>
                <main className={cn.content}>
                    <MapPage map={this.state.currentMap} />
                </main>
            </>
        )
    }
}