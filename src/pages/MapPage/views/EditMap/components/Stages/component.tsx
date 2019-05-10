import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import { AddUser } from 'shared/components/AddUser';
import { IUserSteamInfo, IMapType, IStageType } from 'shared/types';
import { IDisplayMap, IDisplayStage } from '../../../../types';
import { IEditMapContext } from '../EditMapDrawerContent/container';
import { classNames as cn } from '../../styles';
import { MAP_TYPES, STAGE_TYPES, alreadyHasLinearSection } from '../../helpers';

interface IProps {
    updateMap: (partialState: Partial<IDisplayMap>) => void;
    stages: IDisplayStage[];
    context: IEditMapContext;
    mapType: IMapType;
    primaryAuthor: IUserSteamInfo;
}

const getDefaultStageType = (props: IProps) => {
    let defaultName: string = STAGE_TYPES.BONUS;
    if (props.mapType.name === MAP_TYPES.STAGED) {
        defaultName = STAGE_TYPES.STAGE;
    } else if (props.mapType.name === MAP_TYPES.LINEAR) {
        if (alreadyHasLinearSection(props.stages)) {
            defaultName = STAGE_TYPES.BONUS;
        } else {
            defaultName = STAGE_TYPES.LINEAR
        }
    }
    return props.context.allStageTypes.nodes.find((stageType) => stageType.name === defaultName);
};

export const getNextStageNumber = (stages: IDisplayStage[], stageTypeName: string) => {
    const stageNumbers = stages.filter((stage) => (
        stage.stageType.name === stageTypeName
    )).map((stage) => (
        stage.number
    ));
    for (let i = 1; i < stageNumbers.length + 1; i += 1) {
        if (!stageNumbers.includes(i)) {
            return i;
        }
    }
    return stageNumbers.length + 1;
}

const createBlankStage = (props: IProps): IDisplayStage => {
    const stageType = getDefaultStageType(props) || {name: 'Select'};
    return {
        name: '',
        number: getNextStageNumber(props.stages, stageType.name),
        authors: [props.primaryAuthor],
        stageType,
        images: [],
    }
};

const sortStages = (stageList: IDisplayStage[]): IDisplayStage[] => {
    const [stages, bonuses] = stageList.reduce((result: IDisplayStage[][], stage) => {
        result[stage.stageType.name === STAGE_TYPES.BONUS ? 1 : 0].push(stage);
        return result;
    }, [[], []]);

    return [
        ...stages.sort((a: IDisplayStage, b: IDisplayStage) => a.number - b.number),
        ...bonuses.sort((a: IDisplayStage, b: IDisplayStage) => a.number - b.number)
    ] as IDisplayStage[];
};

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

    public addStage = () => {
        this.props.updateMap({
            stages: sortStages([
                ...this.props.stages,
                createBlankStage(this.props),
            ])
        })
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
                <Typography variant="h6" align="center">
                    Stages
                </Typography>
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
                                    value={stage.name}
                                    onChange={this.updateStageName(index)}
                                />
                            </div>
                            {stage.stageType.name !== STAGE_TYPES.LINEAR && (
                                <FormControl fullWidth className="mb-1">
                                    <InputLabel htmlFor="stage-input">
                                        Stage Type
                                    </InputLabel>
                                    <Select
                                        value={stage.stageType.name}
                                        onChange={this.updateStageType(index)}
                                        inputProps={{
                                            id: 'stage-input',
                                            className: 'text-left',
                                        }}
                                        fullWidth
                                    >
                                        {getAllowedStageTypes(this.props).map((item) => (
                                            <MenuItem key={item.rowId} value={item.name}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        </div>
                        <AddUser
                            steamUserList={stage.authors}
                            updateSteamUserList={this.updateAuthors(index)}
                            descriptor="Author"
                            singleUser
                        />
                    </div>)
                })}
                <Button variant="outlined" color="primary" onClick={this.addStage} className="my-2">
                    Add Stage
                </Button>
            </div>
        )
    }
    
}
