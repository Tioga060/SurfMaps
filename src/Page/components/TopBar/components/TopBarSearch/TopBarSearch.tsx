import React from 'react';
import TextField, { Input } from '@material/react-text-field';
import { TopAppBarSection } from "@material/react-top-app-bar";
import MaterialIcon from '@material/react-material-icon';
import './styles.scss';

export interface IProps {
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    closeSearch: () => void;
    searchText: string;
}

export const TopBarSearch: React.StatelessComponent<IProps> = (props) => (
    <TopAppBarSection align='end' role='toolbar'>
        <TextField
            label='Map name, Author ...'
            className='search-box mdc-text-field__input mdc-text-field--fullwidth'
            onTrailingIconSelect={props.closeSearch}
            trailingIcon={
                <MaterialIcon role="button" icon="close" className="search-box-icon" />
            }
            fullWidth
        >
            <Input
                autoFocus
                value={props.searchText}
                onChange={props.onChange}
            />
        </TextField>

    </TopAppBarSection>
)
