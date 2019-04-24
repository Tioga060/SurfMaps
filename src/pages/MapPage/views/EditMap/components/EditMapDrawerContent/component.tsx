import React from 'react';
import { MapTitle } from '../MapTitle';
import './styles.scss';

interface IProps {
}

interface IState {
    mapName: string;
}

export class EditMapDrawerContent extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            mapName: '',
        }
    }

    public updateMapName = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            mapName: e.currentTarget.value,
        })
    }

    public render() {
        return (
            <>
                <div className="drawer-card">
                    <MapTitle value={this.state.mapName} updateMapName={this.updateMapName}/>
                </div>
            </>
        )
    }
}
