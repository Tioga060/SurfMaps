import React from 'react';
import get from 'lodash/get';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { UserBadge } from 'shared/components/UserBadge';
import { canEditMap } from '../../../../services/SearchMapGQL';
import { IDisplayMap } from '../../../../types';
import { classNames as cn } from '../../styles';

interface IProps {
    map: IDisplayMap;
}

interface IState {
    userCanEditMap: boolean;
    fetching: boolean;
}

const setUserCanEditMap = async (mapid: string, setState: (state: IState) => void) => {
    const result = await canEditMap({mapid});
    setState({
        userCanEditMap: get(result, 'canUpdateMap', false),
        fetching: false,
    });
}

export class MapBodyHeader extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            userCanEditMap: false,
            fetching: false,
        };
    }

    public componentDidMount() {
        if (this.props.map.mapId) {
            this.setState(() => ({fetching: true}));
            setUserCanEditMap(this.props.map.mapId, this.setState.bind(this));
        }
    }

    public componentDidUpdate(prevProps: IProps) {
        if (!this.state.fetching && this.props.map.mapId && prevProps.map.mapId !== this.props.map.mapId) {
            setUserCanEditMap(this.props.map.mapId, this.setState.bind(this));
        }
    }

    public render() {
        return (
            <div className={cn.mapCard}>
                <div className="d-flex">
                    <div>
                        <Typography variant="h2">
                            {this.props.map.mapName}
                        </Typography>
                    </div>
                    {this.state.userCanEditMap &&
                        <div className="ml-auto">
                            <Button
                                variant="contained"
                                color="secondary"
                                href={`/maps/edit/${this.props.map.mapName}`}
                            >
                                Edit Map
                            </Button>
                        </div>
                    }
                </div>
                <div className={`mt-2 ${cn.badgeContainer}`}>
                    {this.props.map.authors.map((author) => (
                        <UserBadge
                            key={author.userId}
                            steamUser={author}
                            showName
                        />
                    ))}
                </div>
            </div> 
        )
    }
    
}
