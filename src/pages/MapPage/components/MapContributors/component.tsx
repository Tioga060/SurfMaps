import React from 'react';
import Typography from '@material-ui/core/Typography';
import { IDisplayContributionGroup } from '../../types';
import { UserBadge } from 'shared/components/UserBadge';
import { classNames as cn } from '../../styles';

interface IProps {
    contributors: IDisplayContributionGroup[];
}

export const MapContributors: React.StatelessComponent<IProps> = ({contributors}) => (
    <div className={cn.mapCard}>
        <Typography variant="h4">Contributors</Typography>
        {contributors.map((group, index) => (
            <div className={cn.contributorBadgeContainer} key={index}>
                <Typography variant="h6">{group.contribution}</Typography>
                {group.contributionList.map((contributor, index) => (
                    <UserBadge key={index} showName steamUser={contributor.user} />
                ))}
            </div>
        ))}
    </div> 
);

