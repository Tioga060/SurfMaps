import React from 'react';
import { MapTitle } from '../MapTitle';
import { TierPicker } from '../TierPicker';
import { AddUser } from 'shared/components/AddUser';
import * as T from 'shared/types';
import { IEditMapContext } from './container';
import { MapInfoSelections } from '../MapInfoSelections';
import { classNames as cn } from '../../styles';

interface IProps {
    context: IEditMapContext;
}

const createContextPlaceholder = () => ({
    name: '',
    rowId: '',
})

export interface IState {
    mapName: string;
    steamUserList: T.IUserSteamInfo[];
    tier: number;
    gameMode: T.IGameMode;
    game: T.IGame;
    mapType: T.IMapType;
}

export class EditMapDrawerContent extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            mapName: '',
            steamUserList: [],
            tier: 3,
            gameMode: createContextPlaceholder(),
            game: createContextPlaceholder(),
            mapType: createContextPlaceholder(),
        }
        this.updateSteamUserList = this.updateSteamUserList.bind(this);
        this.updateTier = this.updateTier.bind(this);
        this.updateRootState = this.updateRootState.bind(this);
    }

    public updateRootState = (partialState: Partial<IState>) => {
        this.setState(() => ({
            ...this.state,
            ...partialState
        }));
    }

    public updateMapName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            mapName: e.currentTarget.value,
        })
    }

    public updateSteamUserList (userList: T.IUserSteamInfo[]) {
        this.setState(() => ({
            steamUserList: userList
        }))
    }

    public updateTier (e: any, tier: number) {
        this.setState(() => ({
            tier,
        }));
    }

    public render() {
        return (
            <>
                <div className={cn.drawerCard}>
                    <MapTitle value={this.state.mapName} updateMapName={this.updateMapName}/>
                    <AddUser
                        steamUserList={this.state.steamUserList}
                        updateSteamUserList={this.updateSteamUserList}
                        descriptor="Authors"
                    />
                </div>
                <div className={cn.drawerCard}>
                    <TierPicker
                        tier={this.state.tier}
                        updateTier={this.updateTier}
                    />
                    <MapInfoSelections context={this.props.context} state={this.state} updateRootState={this.updateRootState} />
                </div>
            </>
        )
    }
}
