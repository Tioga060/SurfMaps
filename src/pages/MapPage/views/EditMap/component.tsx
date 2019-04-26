import React from 'react';
import {
    Headline4,
} from '@material/react-typography';
import Drawer, { DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle } from '@material/react-drawer';
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
                            <Headline4 className="mt-3">
                                Add/Edit Map
                            </Headline4>
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