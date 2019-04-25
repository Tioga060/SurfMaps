import React from 'react';
import {
    Headline4,
    Headline6,
} from '@material/react-typography';
import { IMapContributor } from 'shared/types';
import { UserBadge } from 'shared/components/UserBadge';
import '../../styles.scss';
import './styles.scss';

interface IProps {
    contributors: IMapContributor[];
}

interface IContributorMap {
    [id: string]: IMapContributor[];
}

const groupContributors = (contributors: IMapContributor[]): IContributorMap => {
    return contributors.reduce((result: IContributorMap, contributor) => {
        (result[contributor.contribution] = result[contributor.contribution] || []).push(contributor);
        return result;
    }, {})
}

export class MapContributors extends React.Component<IProps> {
    public render() {
        const contributorMap = groupContributors(this.props.contributors);
        return (
            <div className="map-card">
                <Headline4>Contributors</Headline4>
                {Object.keys(contributorMap).map((contributorType) => (
                    <div className='pad-badges' key={contributorType}>
                        <Headline6>{contributorType}</Headline6>
                        {contributorMap[contributorType].map((contributor, index) => (
                            <UserBadge key={index} showName steamUser={contributor.userByUserId.userSteamInfosByUserId.nodes[0]} />
                        ))}
                    </div>
                ))}
            </div> 
        );
    }
    
}
