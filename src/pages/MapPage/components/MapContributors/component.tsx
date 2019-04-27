import React from 'react';
import Typography from '@material-ui/core/Typography';
import { IMapContributor } from 'shared/types';
import { UserBadge } from 'shared/components/UserBadge';
import { classNames as cn } from '../../styles';

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
            <div className={cn.mapCard}>
                <Typography variant="h4">Contributors</Typography>
                {Object.keys(contributorMap).map((contributorType) => (
                    <div className={cn.contributorBadgeContainer} key={contributorType}>
                        <Typography variant="h6">{contributorType}</Typography>
                        {contributorMap[contributorType].map((contributor, index) => (
                            <UserBadge key={index} showName steamUser={contributor.userByUserId.userSteamInfosByUserId.nodes[0]} />
                        ))}
                    </div>
                ))}
            </div> 
        );
    }
    
}
