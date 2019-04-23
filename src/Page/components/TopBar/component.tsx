import React from 'react';
import TopAppBar, {
    TopAppBarFixedAdjust,
    TopAppBarRow,
} from "@material/react-top-app-bar";
import debounce from 'lodash/debounce';
import { MapList } from 'pages/MapSearchPage/components/MapCardList';
import { MapPage } from 'pages/MapPage';
import { MapPageContainer } from 'pages/MapPage';
import { mockMap } from 'pages/MapPage/_mocks/_data';
import { TopBarSearch } from './components/TopBarSearch';
import { TopBarLayout } from './components/TopBarLayout';
import './styles.scss';

interface IState {
    searchText: string;
    searchIsOpen: boolean;
    queryText: string;
}

interface IBlankProps { }

export class TopBar extends React.Component<IBlankProps, IState> {
    public constructor(props: IBlankProps) {
        super(props);
        this.state = {
            searchText: '',
            searchIsOpen: false,
            queryText: '',
        };
        this.updateQuery = debounce(this.updateQuery, 250);
        this.keyEvent = this.keyEvent.bind(this);
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
                            ?   <TopBarSearch 
                                    onChange={this.setSearchText}
                                    closeSearch={this.closedSearch}
                                    searchText={this.state.searchText}
                                />
                            : <TopBarLayout clickedSearch={this.clickedSearch} />
                        }

                    </TopAppBarRow>
                </TopAppBar>
                <TopAppBarFixedAdjust>
                    <div className="App-body">
                        <MapPageContainer
                            //map={mockMap}
                        />
                    </div>
                </TopAppBarFixedAdjust>
            </>
        )
    }
}

/*
<MapList
    searchText={this.state.queryText}
/>
*/

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
