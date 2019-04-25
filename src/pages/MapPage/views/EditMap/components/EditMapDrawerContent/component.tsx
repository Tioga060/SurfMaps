import React from 'react';
import { MapTitle } from '../MapTitle';
import { AddUser } from 'shared/components/AddUser';
import { IUserSteamInfo } from 'shared/types';
import './styles.scss';

interface IProps {
}

interface IState {
    mapName: string;
    steamUserList: IUserSteamInfo[];
}

export class EditMapDrawerContent extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            mapName: '',
            steamUserList: [],
        }
        this.updateSteamUserList = this.updateSteamUserList.bind(this);
    }

    public updateMapName = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            mapName: e.currentTarget.value,
        })
    }

    public updateSteamUserList (userList: IUserSteamInfo[]) {
        this.setState(() => ({
            steamUserList: userList
        }))
    }

    public render() {
        return (
            <>
                <div className="drawer-card">
                    <MapTitle value={this.state.mapName} updateMapName={this.updateMapName}/>
                    <AddUser
                        steamUserList={this.state.steamUserList}
                        updateSteamUserList={this.updateSteamUserList}
                        descriptor="Authors"
                    />
                </div>
            </>
        )
    }
}
