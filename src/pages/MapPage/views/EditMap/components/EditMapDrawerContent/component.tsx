import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MapTitle } from '../MapTitle';
import { TierPicker } from '../TierPicker';
import { AddUser } from 'shared/components/AddUser';
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

interface IProps {
    context: IEditMapContext;
}

export const createContextPlaceholder = () => ({
    name: '',
    rowId: '',
})

export interface IContributor {
    contribution: string;
    userList: T.IUserSteamInfo[];
}

export interface IEditStage {
    name: string;
    authors: T.IUserSteamInfo[];
    stageType: T.IStageType;
    images: File[];
}

export interface IEditMapFile {
    files: File[];
    game: T.IGame;
    description: string;
}

export interface IState {
    currentTab: number;
    mapName: string;
    authors: T.IUserSteamInfo[];
    tier: number;
    gameMode: T.IGameMode;
    game: T.IGame;
    mapType: T.IMapType;
    description: string;
    contributors: IContributor[];
    stages: IEditStage[];
    mainImage: File[];
    mapImages: File[];
    releaseDate: string;
    mapFiles: IEditMapFile[];
}

export class EditMapDrawerContent extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            currentTab: 0,
            mapName: '',
            authors: [],
            tier: 3,
            gameMode: createContextPlaceholder(),
            game: createContextPlaceholder(),
            mapType: createContextPlaceholder(),
            description: '',
            contributors: [],
            stages: [],
            mainImage: [],
            mapImages: [],
            releaseDate: '',
            mapFiles: [],
        }
        this.updateSteamUserList = this.updateSteamUserList.bind(this);
        this.updateRootState = this.updateRootState.bind(this);
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

    public render() {
        return (
            <>
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
                {this.state.currentTab === 0 && (
                    <>
                    <div className={cn.drawerCard}>
                        <MapTitle value={this.state.mapName} updateRootState={this.updateRootState}/>
                        <AddUser
                            steamUserList={this.state.authors}
                            updateSteamUserList={this.updateSteamUserList}
                            descriptor="Authors"
                        />
                    </div>
                    <div className={cn.drawerCard}>
                        <TierPicker tier={this.state.tier} updateRootState={this.updateRootState} />
                        <MapInfoSelections context={this.props.context} state={this.state} updateRootState={this.updateRootState} />
                        <ReleaseDate releaseDate={this.state.releaseDate} updateRootState={this.updateRootState}/>
                    </div>
                    <div className={cn.drawerCard}>
                        <Stages context={this.props.context} updateRootState={this.updateRootState} stages={this.state.stages}/>
                    </div>
                    <div className={cn.drawerCard}>
                        <MapDescription value={this.state.description} updateRootState={this.updateRootState} />
                    </div>
                    <div className={cn.drawerCard}>
                        <Contributors updateRootState={this.updateRootState} contributors={this.state.contributors}/>
                    </div>
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
