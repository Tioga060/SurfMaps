import { createContext } from 'react';

export interface IRootContext {
    sidebarIsOpen: boolean;
    setSidebarIsOpen: (isOpen: boolean) => void;
}

export const RootContext = createContext<IRootContext>({
    sidebarIsOpen: false,
    setSidebarIsOpen: () => {},
});
