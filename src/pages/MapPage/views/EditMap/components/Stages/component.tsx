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
import { getStageTypeAndNumber } from '../../helpers';
import { AddUser } from 'shared/components/AddUser';
import { IUserSteamInfo, IMapType } from 'shared/types';
import { IState as IRootState } from '../EditMapDrawerContent/component';
import { IEditStage } from '../EditMapDrawerContent/component';
import { IEditMapContext } from '../EditMapDrawerContent/container';
import { classNames as cn } from '../../styles';
import { MAP_TYPES, STAGE_TYPES, alreadyHasLinearSection } from '../../helpers';

interface IProps {
    updateRootState: (partialState: Partial<IRootState>) => void;
    stages: IEditStage[];
    context: IEditMapContext;
    mapType: IMapType;
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

const createBlankStage = (props: IProps): IEditStage => ({
    name: '',
    authors: [],
    stageType: getDefaultStageType(props) || {name: 'Select'},
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
        this.props.updateRootState({
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
        this.props.updateRootState({
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
            this.props.updateRootState({
                stages: [
                    ...this.props.stages.slice(0, index),
                    {
                        ...this.props.stages[index],
                        stageType
                    },
                    ...this.props.stages.slice(index +1),
                ]
            });
        }
    }

    public addStage = () => {
        this.props.updateRootState({
            stages: [
                ...this.props.stages,
                createBlankStage(this.props),
            ]
        })
    }

    public deleteStage = (index: number) => () => {
        this.props.updateRootState({
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
                    const {stageTypeName, stageNumber} = getStageTypeAndNumber(this.props.stages, stage, index);
                    return (
                    <div key={index} className="mt-3">
                        <Divider/>
                        <div>
                            <div className="d-flex">
                                <Typography variant="subheading" align="center" className={cn.stageNameWidth}>
                                    {`${stageTypeName} ${stageNumber > 0 ? stageNumber : ''}`}
                                </Typography>
                                {stageTypeName !== STAGE_TYPES.LINEAR && (
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
                            {stageTypeName !== STAGE_TYPES.LINEAR && (
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
