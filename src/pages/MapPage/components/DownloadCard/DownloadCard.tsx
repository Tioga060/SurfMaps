import React from 'react';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';
import {
    Headline4,
    Body1
} from '@material/react-typography';
import Select from '@material/react-select';
import Button from '@material/react-button';

import { UserBadge } from 'shared/components/UserBadge'

import { IMapFile } from 'shared/types';
import '../../styles.scss';
import './styles.scss';

interface IProps {
    mapFiles: IMapFile[];
}

interface IState {
    currentTab: number;
    mapFiles: IMapFile[];
    activeMap: IMapFile;
}

export class DownloadCard extends React.Component<IProps, IState> {
    private gameModes: string[];

    public constructor(props: IProps) {
        super(props);
        this.gameModes = props.mapFiles.reduce((result: string[], mapfile) => {
            if (!(mapfile.game in result)) {
                result.push(mapfile.game);
            }
            return result;
        }, []);
        const mapFiles = this.props.mapFiles.filter((mapFile) =>
                (mapFile.game === this.gameModes[0]));
        const activeMap = mapFiles[0];
        this.state = {
            currentTab: 0,
            activeMap,
            mapFiles,
        };
    }

    public componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (prevState.currentTab !== this.state.currentTab) {
            const mapFiles = this.props.mapFiles.filter((mapFile) =>
                (mapFile.game === this.gameModes[this.state.currentTab]));
            const activeMap = mapFiles[0];
            this.setState({
                mapFiles,
                activeMap,
            });
        }
    }

    public setTab = (tab: number) => () => {
        this.setState({currentTab: tab});
    }

    public render() {
        return (
            <div className="map-card" >
                <Headline4>
                    Download
                </Headline4>
                <TabBar>
                    {this.gameModes.map((gameMode, index) => (
                        <Tab
                            key={gameMode}
                            onClick={this.setTab(index)}
                            active={this.state.currentTab === index}
                            className="download-tab"
                        >
                            {gameMode}
                        </Tab>
                    ))}
                </TabBar>
                <div className="download-body">
                    <Select
                        outlined
                        className="select-color vertical-center"
                    >
                        {this.state.mapFiles.map((mapFile, index) => (
                            <option key={index} value={mapFile.file.id}>{mapFile.label}</option>
                        ))}
                    </Select>
                    <div className="vertical-center">
                        <Body1>Uploader</Body1>
                        <UserBadge
                            steamUser={this.state.activeMap.file.uploader.userSteam!}
                            showName
                            onPressed={() => {}}
                        />
                    </div>
                    <div className="vertical-center pull-right">
                        <Body1>Link</Body1>
                        <Button raised>
                            Download
                        </Button>
                    </div>
                </div>
            </div> 
        );
    }
    
}
