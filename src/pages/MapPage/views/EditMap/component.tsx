import React from 'react';
import {
    Headline4,
    Headline5,
    Body1,
} from '@material/react-typography';
import Drawer, { DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle } from '@material/react-drawer';
import { EditMapDrawerContent } from './components/EditMapDrawerContent';
import { MapPage } from '../../';
import { mockMap } from '../../_mocks/_data';

import './styles.scss';

export class EditMap extends React.Component {
    public render() {
        return (
            <>
                <Drawer
                    className="drawer"
                >
                    <DrawerHeader className="drawer-header">
                            <Headline4 className="drawer-header-text">
                                Add/Edit Map
                            </Headline4>
                    </DrawerHeader>
                    <DrawerContent className="drawer-content">
                        <EditMapDrawerContent/>
                    </DrawerContent>
                </Drawer>

                <DrawerAppContent className='drawer-app-content'>
                    <MapPage map={mockMap} />
                </DrawerAppContent>
            </>
        )
    }
}