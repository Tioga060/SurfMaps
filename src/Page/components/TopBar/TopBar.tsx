import React from 'react';
import TopAppBar, {
    TopAppBarFixedAdjust,
    TopAppBarIcon,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
} from "@material/react-top-app-bar";
import MaterialIcon from '@material/react-material-icon';
import TextField, { Input } from '@material/react-text-field';
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
}

interface IBlankProps { }

export class TopBar extends React.Component<IBlankProps, IState> {
    public constructor(props: IBlankProps) {
        super(props);
        this.state = {
            searchText: '',
            searchIsOpen: false,
        };
    }

    public render() {
        return (
            <>
                <TopAppBar>
                    <TopAppBarRow>
                        {this.state.searchIsOpen
                            ? (
                                <>
                                    <TopAppBarSection align='end' role='toolbar'>
                                        <TextField
                                            label='Map name, Author ...'
                                            className='search-box mdc-text-field__input mdc-text-field--fullwidth'
                                            onTrailingIconSelect={() => this.setState({ searchText: '' })}
                                            trailingIcon={<MaterialIcon role="button" icon="search" />}
                                            fullWidth
                                        ><Input
                                                value={this.state.searchText}
                                                onChange={(e: any) => this.setState({ searchText: e.currentTarget.value })} />
                                        </TextField>
                                        <TopAppBarIcon actionItem tabIndex={0}>
                                            <MaterialIcon
                                                aria-label="close"
                                                hasRipple
                                                icon='close'
                                                onClick={() => this.setState({ searchIsOpen: false })}
                                            />
                                        </TopAppBarIcon>
                                    </TopAppBarSection>
                                </>
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
                                            aria-label="search"
                                            hasRipple
                                            icon='search'
                                            onClick={() => this.setState({ searchIsOpen: true })}
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
                            searchText={this.state.searchText}
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
