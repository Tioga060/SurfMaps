import React, {useState} from 'react';
import { RootContext } from 'shared/context';
import { TopBar } from '../TopBar';
import { PageRouter } from '../Router';

export const Body: React.StatelessComponent = () => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    return (
        <RootContext.Provider value={{sidebarIsOpen, setSidebarIsOpen}} >
            <TopBar/>
            <PageRouter/> 
        </RootContext.Provider>
    );
};
