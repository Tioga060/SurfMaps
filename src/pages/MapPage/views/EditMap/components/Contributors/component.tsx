import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { AddUser } from 'shared/components/AddUser';
import { IUserSteamInfo } from 'shared/types';
import { IDisplayContributionGroup, IDisplayMap } from '../../../../types';
import { classNames as cn } from '../../styles';

interface IProps {
    updateMap: (partialState: Partial<IDisplayMap>) => void;
    contributors: IDisplayContributionGroup[];
}

const createBlankContributor = (): IDisplayContributionGroup => ({
    contribution: '',
    contributionList: [],
});

export class Contributors extends React.Component<IProps> {
    public updateContribution = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.updateMap({
            contributors: [
                ...this.props.contributors.slice(0, index),
                {
                    contribution: e.target.value,
                    contributionList: this.props.contributors[index].contributionList,
                },
                ...this.props.contributors.slice(index +1),
            ]
        });
    }

    public updateContributionList = (index: number) => (userList: IUserSteamInfo[]) => {
        this.props.updateMap({
            contributors: [
                ...this.props.contributors.slice(0, index),
                {
                    contribution: this.props.contributors[index].contribution,
                    contributionList: userList.map((user) => ({user})),
                },
                ...this.props.contributors.slice(index +1),
            ]
        });
    }

    public addContributor = () => {
        this.props.updateMap({
            contributors: [
                ...this.props.contributors,
                createBlankContributor(),
            ]
        })
    }

    public deleteContribution = (index: number) => () => {
        this.props.updateMap({
            contributors: [
                ...this.props.contributors.slice(0, index),
                ...this.props.contributors.slice(index +1),
            ]
        })
    }

    public render() {
        return (
            <div>
                <div className={cn.drawerCardHeader}>
                    <Typography variant="h6" align="center">
                        Contributors
                    </Typography>
                </div>
                <div className={cn.drawerCardContent}>
                {this.props.contributors.map((contributor, index) => (
                    <div key={index}>
                    <div className="d-flex">
                        <div className="pt-2">
                            <IconButton
                                onClick={this.deleteContribution(index)}
                                aria-label="Remove Contribution"
                            >
                                <Delete/>
                            </IconButton>
                        </div>
                        <TextField
                            label="Contribution"
                            margin="dense"
                            variant="outlined"
                            value={contributor.contribution}
                            onChange={this.updateContribution(index)}
                        />
                    </div>
                    <AddUser
                        steamUserList={contributor.contributionList.map((cont) => cont.user)}
                        updateSteamUserList={this.updateContributionList(index)}
                        descriptor={contributor.contribution}
                    />
                    </div>
                ))}
                <Button variant="outlined" color="primary" onClick={this.addContributor} className="my-2">
                    Add Contribution
                </Button>
                </div>
            </div>
        )
    }
    
}
