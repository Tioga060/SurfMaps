import React from 'react';
import get from 'lodash/get';
import classnames from 'classnames';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { MapTitle } from '../MapTitle';
import { TierPicker } from '../TierPicker';
import { AddUser } from 'shared/components/AddUser';
import { IEditImage } from 'shared/components/ImageDropzone';
import * as T from 'shared/types';
import { IEditMapContext } from './container';
import { MapInfoSelections } from '../MapInfoSelections';
import { MapDescription } from '../MapDescription';
import { Contributors } from '../Contributors';
import { ImageUpload } from '../ImageUpload';
import { ReleaseDate } from '../ReleaseDate';
import { FileUpload } from '../FileUpload';
import { Stages } from '../Stages';
import { classNames as cn } from '../../styles';
import { IProps as IContainerProps } from './container';
import { convertEditStateToIMap, submitMap, modifyMap, convertIMapToEditState } from '../../helpers';
import { validateMapInfo, FORM_ERRORS } from '../../validators/validators';
import { MODES } from '../../component';

type IProps = IContainerProps & {
    context: IEditMapContext;
}

export const createContextPlaceholder = () => ({
    name: '',
    rowId: '',
})

export interface IEditContribution {
    user: T.IUserSteamInfo;
    rowId?: string;
}

export interface IContributor {
    contribution: string;
    contributionList: IEditContribution[];
}

export interface IEditStage {
    rowId?: string;
    name: string;
    number: number;
    authors: T.IUserSteamInfo[];
    stageType: T.IStageType;
    images: IEditImage[];
}

export interface IEditMapFile {
    files: File[];
    game: T.IGame;
    description: string;
}

export interface IState {
    submitter: T.IUserSteamInfo;
    mapName: string;
    authors: T.IUserSteamInfo[];
    tier: number;
    gameMode: T.IGameMode;
    game: T.IGame;
    mapType: T.IMapType;
    description: string;
    descriptionId: string;
    contributors: IContributor[];
    stages: IEditStage[];
    mainImage: IEditImage[];
    mapImages: IEditImage[];
    releaseDate: string;
    mapFiles: IEditMapFile[];
    mapId: string;

    canPressAdd: boolean;
    currentTab: number;
    validationErrors: string[];
}

const getDefaultAddState = (props: IProps): IState => ({
    submitter: props.context.currentUserSteamInfo,
    currentTab: 0,
    mapName: '',
    authors: [],
    tier: 3,
    gameMode: createContextPlaceholder(),
    game: createContextPlaceholder(),
    mapType: createContextPlaceholder(),
    description: '',
    descriptionId: '',
    contributors: [],
    stages: [],
    mainImage: [],
    mapImages: [],
    releaseDate: '',
    mapFiles: [],
    mapId: '',
    validationErrors: [],
    canPressAdd: props.mode === MODES.ADD,
})

export class EditMapDrawerContent extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            ...getDefaultAddState(props),
            ...props.mapState,
        }
        this.updateSteamUserList = this.updateSteamUserList.bind(this);
        this.updateRootState = this.updateRootState.bind(this);
    }

    public setCurrentMap (map: IState) {
        this.props.setCurrentMap(convertEditStateToIMap(map, this.props.context.currentUserSteamInfo));
    }

    public componentDidUpdate (prevProps: IProps, prevState: IState) {
        if (prevState !== this.state) {
            this.setCurrentMap(this.state)
        }
        if (JSON.stringify(prevProps.mapState) !== JSON.stringify(this.props.mapState)) { // TODO - better solution for equality checking
            this.setState(() => ({
                ...this.props.mapState,
            }));
            console.log(this.props.mapState)
        }
    }

    public updateRootState = (partialState: Partial<IState>) => {
        this.setState(() => ({
            ...this.state,
            ...partialState
        }));
    }

    public updateSteamUserList (authors: T.IUserSteamInfo[]) {
        this.setState(() => ({
            authors
        }))
    }

    public setTab = (event: any, currentTab: number) => {
        this.setState(() => ({
            currentTab,
        }));
    }

    public submitMapInfo = async () => {
        const validationErrors = await validateMapInfo(this.state, this.props.mode);
        this.setState(() => ({
            validationErrors,
        }));
        if (!validationErrors.length && this.state.canPressAdd) {
            this.setState(() => ({
                canPressAdd: false,
            }));
            if (this.props.mode === MODES.ADD) {
                submitMap(this.state, this.props.refreshMap);
            } else if (this.props.mode === MODES.EDIT) {
                modifyMap(convertIMapToEditState(this.props.originalMap!) as IState, this.state, this.props.refreshMap);
            }
        }
    }

    public render() {
        return (
            <>
                {this.props.mode === MODES.EDIT && 
                    <Tabs
                        value={this.state.currentTab}
                        onChange={this.setTab}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab value={0} label="Info" classes={{labelContainer: 'px-0', root: cn.tabWidth}}/>
                        <Tab value={1} label="Images" classes={{labelContainer: 'px-0', root: cn.tabWidth}}/>
                        <Tab value={2} label="Files" classes={{labelContainer: 'px-0', root: cn.tabWidth}}/>
                    </Tabs>
                }
                {this.state.currentTab === 0 && (
                    <>
                    <div className={classnames({
                        [cn.drawerCard]: true,
                        [cn.drawerCardError]: this.state.validationErrors.includes(FORM_ERRORS.MAP_NAME)
                            || this.state.validationErrors.includes(FORM_ERRORS.AUTHORS)
                            || this.state.validationErrors.includes(FORM_ERRORS.MAP_NAME_EXISTS),
                    })}>
                        <MapTitle value={this.state.mapName} updateRootState={this.updateRootState}/>
                        <AddUser
                            steamUserList={this.state.authors}
                            updateSteamUserList={this.updateSteamUserList}
                            descriptor="Authors"
                        />
                    </div>
                    <div className={classnames({
                        [cn.drawerCard]: true,
                        [cn.drawerCardError]: this.state.validationErrors.includes(FORM_ERRORS.TIER)
                            || this.state.validationErrors.includes(FORM_ERRORS.GAME_MODE)
                            || this.state.validationErrors.includes(FORM_ERRORS.MAP_TYPE)
                            || this.state.validationErrors.includes(FORM_ERRORS.GAME)
                    })}>
                        <TierPicker tier={this.state.tier} updateRootState={this.updateRootState} />
                        <MapInfoSelections
                            context={this.props.context}
                            state={this.state}
                            updateRootState={this.updateRootState}
                            stages={this.state.stages}
                            primaryAuthor={get(this.state.authors, '[0]', this.props.context.currentUserSteamInfo)}
                        />
                        <ReleaseDate releaseDate={this.state.releaseDate} updateRootState={this.updateRootState}/>
                    </div>
                    <div className={classnames({
                        [cn.drawerCard]: true,
                        [cn.drawerCardError]: this.state.validationErrors.includes(FORM_ERRORS.STAGE_LINEAR_COUNT)
                            || this.state.validationErrors.includes(FORM_ERRORS.STAGE_AUTHORS)
                            || this.state.validationErrors.includes(FORM_ERRORS.STAGE_CONTINUITY)
                            || this.state.validationErrors.includes(FORM_ERRORS.STAGE_COUNT),
                    })}>
                        <Stages
                            context={this.props.context}
                            updateRootState={this.updateRootState}
                            stages={this.state.stages}
                            mapType={this.state.mapType}
                            primaryAuthor={get(this.state.authors, '[0]', this.props.context.currentUserSteamInfo)}
                        />
                    </div>
                    <div className={classnames({
                        [cn.drawerCard]: true,
                        [cn.drawerCardError]: this.state.validationErrors.includes(FORM_ERRORS.DESCRIPTION),
                    })}>
                        <MapDescription value={this.state.description} updateRootState={this.updateRootState} />
                    </div>
                    <div className={classnames({
                        [cn.drawerCard]: true,
                        [cn.drawerCardError]: this.state.validationErrors.includes(FORM_ERRORS.CONTRIBUTORS),
                    })}>
                        <Contributors updateRootState={this.updateRootState} contributors={this.state.contributors}/>
                    </div>
                    <Button color="secondary" variant="contained" fullWidth onClick={this.submitMapInfo} disabled={!this.state.canPressAdd}>
                        Next: Images
                    </Button>
                    </>
                )}
                {this.state.currentTab === 1 && (
                    <ImageUpload
                        mapImages={this.state.mapImages}
                        stages={this.state.stages}
                        updateRootState={this.updateRootState}
                        mainImage={this.state.mainImage}
                    />
                )}
                {this.state.currentTab === 2 && (
                    <FileUpload
                        updateRootState={this.updateRootState}
                        context={this.props.context}
                        mapFiles={this.state.mapFiles}
                    />
                )}
            </>
        )
    }
}
