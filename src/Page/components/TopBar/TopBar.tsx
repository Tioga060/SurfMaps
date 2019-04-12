import React, { createRef } from 'react';
import TopAppBar, {
    TopAppBarFixedAdjust,
    TopAppBarIcon,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
} from "@material/react-top-app-bar";
import MaterialIcon from '@material/react-material-icon';
import TextField, { Input } from '@material/react-text-field';
import debounce from 'lodash/debounce';
import {
    Headline6,
    Subtitle2,
} from '@material/react-typography';
import { createFragmentContainer, QueryRenderer, graphql } from 'react-relay';
//const { createFragmentContainer, QueryRenderer, graphql } = require('babel-plugin-relay/macro');
import environment from '../../../environment';
import { MapList } from '../../../pages/MapSearchPage/components/MapCardList/mapcardlist';
import './styles.scss';

interface IState {
    searchText: string;
    searchIsOpen: boolean;
    queryText: string;
}

interface IBlankProps { }

export class TopBar extends React.Component<IBlankProps, IState> {
    public searchInputRef: React.RefObject<Input>;

    public constructor(props: IBlankProps) {
        super(props);
        this.state = {
            searchText: '',
            searchIsOpen: false,
            queryText: '',
        };
        this.updateQuery = debounce(this.updateQuery, 250);
        this.keyEvent = this.keyEvent.bind(this);
        this.searchInputRef = createRef();
    }

    public keyEvent(event: any) {
        if (event.keyCode === 27) { // Escape
            this.closedSearch();
        }
    }

    public componentDidMount() {
        document.addEventListener("keydown", this.keyEvent, false);
    }

    public componentWillUnmount() {
        document.removeEventListener("keydown", this.keyEvent, false);
    }

    public setSearchText = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ searchText: e.currentTarget.value })
        this.updateQuery(e.currentTarget.value);
    }

    public updateQuery = (query: string) => {
        this.setState({ queryText: query });
    }

    public clickedSearch = () => {
        this.setState(
            () => ({ searchIsOpen: true })
        )
    }

    public closedSearch = () => {
        this.setState(() => ({
            searchIsOpen: false,
            searchText: '',
        }))
        this.updateQuery('');
    }

    public render() {
        return (
            <>
                <TopAppBar className="top-app-bar">
                    <TopAppBarRow>
                        {this.state.searchIsOpen
                            ? (
                                <TopAppBarSection align='end' role='toolbar'>
                                    <TextField
                                        label='Map name, Author ...'
                                        className='search-box mdc-text-field__input mdc-text-field--fullwidth'
                                        onTrailingIconSelect={this.closedSearch}
                                        trailingIcon={<MaterialIcon role="button" icon="close" className="search-box-icon" />}
                                        fullWidth
                                    >
                                        <Input
                                            autoFocus
                                            value={this.state.searchText}
                                            onChange={this.setSearchText}
                                        />
                                    </TextField>

                                </TopAppBarSection>
                            )
                            : (<>
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
                                            onClick={this.clickedSearch}
                                        />
                                    </TopAppBarIcon>
                                </TopAppBarSection>
                            </>)

                        }

                    </TopAppBarRow>
                </TopAppBar>
                <TopAppBarFixedAdjust>
                    <div className="App-body">
                        <MapList
                            searchText={this.state.queryText}
                        />
                    </div>
                </TopAppBarFixedAdjust>
            </>
        )
    }
}

/*
const MapCardContainer = createFragmentContainer(MapCardComponent, {
    map: graphql`
        fragment mapcard_map on SurfMap {
            mapname
            author
            tier
        }
    `
})

const defaultMap: IMap = {
    mapname: "Loading...",
    author: "Loading...",
    tier: 0,
}

export const MapCard: React.StatelessComponent = () => (
    <QueryRenderer
        environment={environment}
        query={
            graphql`
                query mapcardGetSurfMapByIdQuery($mapId: ID!) {
                    surfMap(id: $mapId) {
                        ...mapcard_map
                    }
                }
            `
        }
        variables={{mapId: "WyJTdXJmTWFwcyIsMl0="}}
        render={({ error, props }) => {
            if (error) {
                return <div>{error.message}</div>;
            }
            const map: IMap = props
                ? props.surfMap
                : defaultMap
            return <MapCardContainer map={map}/>;
        }}
    />
)
*/
