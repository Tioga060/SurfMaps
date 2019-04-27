import React from 'react';
import Typography from '@material-ui/core/Typography';
import Drawer, { DrawerAppContent, DrawerContent, DrawerHeader } from '@material/react-drawer';
import { EditMapDrawerContent } from './components/EditMapDrawerContent';
import { MapPage } from '../../';
import { mockMap } from '../../_mocks/_data';
import { classNames as cn } from './styles';

import './styles.scss';

export class EditMap extends React.Component {
    public render() {
        return (
            <>
                <Drawer
                    className={cn.drawerBackground}
                >
                    <DrawerHeader className="m-0">
                        <Typography variant="h5" className="mt-3" align="center">
                            Add/Edit Map
                        </Typography>
                    </DrawerHeader>
                    <DrawerContent className="p-2">
                        <EditMapDrawerContent/>
                    </DrawerContent>
                </Drawer>

                <DrawerAppContent className={cn.overflowAuto}>
                    <MapPage map={mockMap} />
                </DrawerAppContent>
            </>
        )
    }
}