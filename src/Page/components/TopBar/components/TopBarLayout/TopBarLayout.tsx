import React from 'react';
import TextField, { Input } from '@material/react-text-field';
import { TopAppBarSection, TopAppBarIcon, TopAppBarTitle } from "@material/react-top-app-bar";
import MaterialIcon from '@material/react-material-icon';
import './styles.scss';

export interface IProps {
    clickedSearch: () => void;
}

export const TopBarLayout: React.StatelessComponent<IProps> = (props) => (
    <>
        <TopAppBarSection align='start'>
            <TopAppBarIcon navIcon tabIndex={0}>
                <MaterialIcon hasRipple icon='menu' onClick={() => console.log('click')} />
            </TopAppBarIcon>
            <TopAppBarTitle>Miami, FL</TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection align='end' role='toolbar'>
            <TopAppBarIcon actionItem tabIndex={0}>
                <MaterialIcon
                    aria-label="close"
                    hasRipple
                    icon='search'
                    onClick={props.clickedSearch}
                />
            </TopAppBarIcon>
        </TopAppBarSection>
    </>
)
