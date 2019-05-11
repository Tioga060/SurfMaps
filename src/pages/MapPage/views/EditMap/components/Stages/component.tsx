import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { AddUser } from 'shared/components/AddUser';
import { IUserSteamInfo, IMapType, IStageType } from 'shared/types';
import { IDisplayMap, IDisplayStage } from '../../../../types';
import { IEditMapContext } from '../EditMapDrawerContent/container';
import { classNames as cn } from '../../styles';
import { sortStages, MAP_TYPES, STAGE_TYPES, alreadyHasLinearSection, getNextStageNumber } from '../../../../helpers';

interface IProps {
    updateMap: (partialState: Partial<IDisplayMap>) => void;
    stages: IDisplayStage[];
    context: IEditMapContext;
    mapType: IMapType;
    primaryAuthor: IUserSteamInfo;
}

const createBlankStage = (props: IProps, stageType: IStageType): IDisplayStage => ({
    name: '',
    number: getNextStageNumber(props.stages, stageType.name),
    authors: [props.primaryAuthor],
    stageType,
    images: [],
});

const getAllowedStageTypes = (props: IProps) => {
    const disallowedTypes = props.mapType.name === MAP_TYPES.STAGED
        ? [STAGE_TYPES.LINEAR] : props.mapType.name === MAP_TYPES.LINEAR
        ? [STAGE_TYPES.STAGE] : [''];
    if (alreadyHasLinearSection(props.stages)) {
        disallowedTypes.push(STAGE_TYPES.LINEAR);
    }
    return props.context.allStageTypes.nodes.filter((stageType) => !disallowedTypes.includes(stageType.name));
}

export class Stages extends React.Component<IProps> {
    public updateStageName = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.updateMap({
            stages: [
                ...this.props.stages.slice(0, index),
                {
                    ...this.props.stages[index],
                    name: e.target.value,
                },
                ...this.props.stages.slice(index +1),
            ]
        });
    }

    public updateAuthors = (index: number) => (authors: IUserSteamInfo[]) => {
        this.props.updateMap({
            stages: [
                ...this.props.stages.slice(0, index),
                {
                    ...this.props.stages[index],
                    authors,
                },
                ...this.props.stages.slice(index +1),
            ]
        });
    }

    public updateStageType = (index: number) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        const stageType = this.props.context.allStageTypes.nodes.find((type) => (
            type.name === e.target.value
        ));
        if (stageType) {
            this.props.updateMap({
                stages: sortStages([
                    ...this.props.stages.slice(0, index),
                    {
                        ...this.props.stages[index],
                        stageType,
                        number: getNextStageNumber(this.props.stages, stageType.name),
                    },
                    ...this.props.stages.slice(index +1),
                ])
            });
        }
    }

    public addStage = (name: string) => () => {
        const stageType = this.props.context.allStageTypes.nodes.find((type) => (
            type.name === name
        ));
        if (stageType) {
            this.props.updateMap({
                stages: sortStages([
                    ...this.props.stages,
                    createBlankStage(this.props, stageType),
                ])
            });
        }
    }

    public deleteStage = (index: number) => () => {
        this.props.updateMap({
            stages: [
                ...this.props.stages.slice(0, index),
                ...this.props.stages.slice(index +1),
            ]
        })
    }

    public render() {
        return (
            <div>
                <div className={cn.drawerCardHeader}>
                    <Typography variant="h6" align="center">
                        Stages
                    </Typography>
                </div>
                <div className={cn.drawerCardContent}>
                {this.props.stages.map((stage, index) => {
                    return (
                    <div key={`${stage.stageType.name}${stage.number}`} className="mt-3">
                        <Divider/>
                        <div>
                            <div className="d-flex">
                                <Typography variant="subtitle1" align="center" className={cn.stageNameWidth}>
                                    {`${stage.stageType.name} ${stage.number > 0 ? stage.number : ''}`}
                                </Typography>
                                {stage.stageType.name !== STAGE_TYPES.LINEAR && (
                                    <div className="pt-2">
                                        <IconButton
                                            onClick={this.deleteStage(index)}
                                            aria-label="Remove Stage"
                                        >
                                            <Delete/>
                                        </IconButton>
                                    </div>
                                )}
                                <TextField
                                    label="Stage Name"
                                    margin="dense"
                                    variant="outlined"
                                    value={stage.name || ''}
                                    onChange={this.updateStageName(index)}
                                />
                            </div>
                        </div>
                        <AddUser
                            steamUserList={stage.authors}
                            updateSteamUserList={this.updateAuthors(index)}
                            descriptor="Author"
                            singleUser
                        />
                    </div>)
                })}
                {getAllowedStageTypes(this.props).map((item) => (
                    <Button key={item.name} variant="outlined" color="primary" onClick={this.addStage(item.name)} className="my-2">
                        {`Add ${item.name}`}
                    </Button>
                ))}
                </div>
            </div>
        )
    }
    
}
