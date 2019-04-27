import React from 'react';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { EditMapDrawerContent } from './components/EditMapDrawerContent';
import { MapPage } from '../../';
import { mockMap } from '../../_mocks/_data';
import { classNames as cn } from './styles';

export class EditMap extends React.Component {
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
                        <EditMapDrawerContent/>
                    </div>
                </Drawer>
                <main className={cn.content}>
                    <MapPage map={mockMap} />
                </main>
            </>
        )
    }
}