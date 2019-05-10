import React from 'react';
import get from 'lodash/get';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { classNames as cn } from '../../styles'
import { UserBadge } from 'shared/components/UserBadge'
import { IDisplayMapFile } from '../../types';

interface IProps {
    mapFiles: IDisplayMapFile[];
}

interface IState {
    currentTab: number;
    mapFiles: IDisplayMapFile[];
    activeMap: IDisplayMapFile;
    selectedMapIndex: number;
}

export class DownloadCard extends React.Component<IProps, IState> {
    private gameModes: string[];

    public constructor(props: IProps) {
        super(props);
        this.gameModes = props.mapFiles.reduce((result: string[], mapfile) => {
            if (!(mapfile.game.name in result)) {
                result.push(mapfile.game.name);
            }
            return result;
        }, []);
        const mapFiles = this.props.mapFiles.filter((mapFile) =>
                (mapFile.game.name === this.gameModes[0]));
        const activeMap = mapFiles[0];
        this.state = {
            currentTab: 0,
            activeMap,
            mapFiles,
            selectedMapIndex: 0,
        };
    }

    public componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (prevState.currentTab !== this.state.currentTab) {
            const mapFiles = this.props.mapFiles.filter((mapFile) =>
                (mapFile.game.name === this.gameModes[this.state.currentTab]));
            const activeMap = mapFiles[0];
            this.setState({
                mapFiles,
                activeMap,
                selectedMapIndex: 0,
            });
        }
    }

    public setTab = (event: any, currentTab: number) => {
        this.setState({currentTab});
    }

    public setFile = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index = parseInt(e.target.value);
        const nextMap = get(this.state.mapFiles, index, null);
        if (nextMap) {
            this.setState(() => ({
                activeMap: nextMap,
                selectedMapIndex: index,
            }));
        }
    }

    public render() {
        return (
            <div className={cn.mapCard} >
                <Typography variant="h4">
                    Download
                </Typography>
                <Tabs
                    variant="fullWidth"
                    value={this.state.currentTab}
                    onChange={this.setTab}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {this.gameModes.map((gameMode, index) => (
                        <Tab
                            key={gameMode}
                            value={index}
                            label={gameMode}
                        />
                    ))}
                </Tabs>
                <div className="d-flex mt-3">
                    <div className='d-flex flex-column'>
                        <InputLabel htmlFor="map-version-input">Map Version</InputLabel>
                        <Select
                            value={this.state.selectedMapIndex}
                            onChange={this.setFile}
                            inputProps={{
                                id: 'map-version-input',
                                className: 'text-left',
                            }}
                        >
                            {this.state.mapFiles.map((mapFile, index) => (
                                <MenuItem key={index} value={index}>{mapFile.description}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="d-flex flex-column">
                        <Typography variant="body1">Uploader</Typography>
                        <UserBadge
                            steamUser={this.state.activeMap.uploader}
                            showName
                        />
                    </div>
                    <div className="d-flex flex-column ml-auto">
                        <Typography variant="body1">Link</Typography>
                        <Button variant="contained" color="primary">
                            Download
                        </Button>
                    </div>
                </div>
            </div> 
        );
    }
    
}
