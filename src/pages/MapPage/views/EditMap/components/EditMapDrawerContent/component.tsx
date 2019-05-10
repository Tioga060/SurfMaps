import React from 'react';
import get from 'lodash/get';
import classnames from 'classnames';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { MapTitle } from '../MapTitle';
import { TierPicker } from '../TierPicker';
import { AddUser } from 'shared/components/AddUser';
import { IDisplayMap } from '../../../../types';
import { getDefaultDisplayMap } from '../../../../helpers';
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

export interface IState {
    map: IDisplayMap;

    canPressAdd: boolean;
    currentTab: number;
    validationErrors: string[];
}

export class EditMapDrawerContent extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            map: {
                ...getDefaultDisplayMap(props.context.currentUserSteamInfo),
                ...props.mapState,
            },
            currentTab: 0,
            validationErrors: [],
            canPressAdd: props.mode === MODES.ADD,
        }
        this.updateAuthors = this.updateAuthors.bind(this);
        this.updateMap = this.updateMap.bind(this);
    }

    public setCurrentMap (map: IDisplayMap) {
        this.props.setCurrentMap(map);
    }

    public componentDidUpdate (prevProps: IProps, prevState: IState) {
        if (prevState !== this.state) {
            this.setCurrentMap(this.state.map)
        }
        if (JSON.stringify(prevProps.mapState) !== JSON.stringify(this.props.mapState)) { // TODO - better solution for equality checking
            this.setState(() => ({
                map: {
                    ...this.state.map,
                    ...this.props.mapState,
                },
            }));
        }
    }

    public updateMap = (partialMap: Partial<IDisplayMap>) => {
        this.setState(() => ({
            map: {
                ...this.state.map,
                ...partialMap,
            }
        }));
    }

    public updateAuthors (authors: T.IUserSteamInfo[]) {
        this.setState(() => ({
            map: {
                ...this.state.map,
                authors,
            }
        }))
    }

    public setTab = (event: any, currentTab: number) => {
        this.setState(() => ({
            currentTab,
        }));
    }

    public submitMapInfo = async () => {
        const validationErrors = await validateMapInfo(this.state.map, this.props.mode);
        this.setState(() => ({
            validationErrors,
        }));
        if (!validationErrors.length && this.state.canPressAdd) {
            this.setState(() => ({
                canPressAdd: false,
            }));
            if (this.props.mode === MODES.ADD) {
                submitMap(this.state.map, this.props.refreshMap);
            } else if (this.props.mode === MODES.EDIT) {
                modifyMap(convertIMapToEditState(this.props.originalMap!) as IDisplayMap, this.state.map, this.props.refreshMap);
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
                        <MapTitle value={this.state.map.mapName} updateMap={this.updateMap}/>
                        <AddUser
                            steamUserList={this.state.map.authors}
                            updateSteamUserList={this.updateAuthors}
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
                        <TierPicker tier={this.state.map.tier} updateMap={this.updateMap} />
                        <MapInfoSelections
                            context={this.props.context}
                            updateMap={this.updateMap}
                            map={this.state.map}
                            primaryAuthor={get(this.state.map.authors, '[0]', this.props.context.currentUserSteamInfo)}
                        />
                        <ReleaseDate releaseDate={this.state.map.releaseDate} updateMap={this.updateMap}/>
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
                            updateMap={this.updateMap}
                            stages={this.state.map.stages}
                            mapType={this.state.map.mapType}
                            primaryAuthor={get(this.state.map.authors, '[0]', this.props.context.currentUserSteamInfo)}
                        />
                    </div>
                    <div className={classnames({
                        [cn.drawerCard]: true,
                        [cn.drawerCardError]: this.state.validationErrors.includes(FORM_ERRORS.DESCRIPTION),
                    })}>
                        <MapDescription description={this.state.map.description} updateMap={this.updateMap} />
                    </div>
                    <div className={classnames({
                        [cn.drawerCard]: true,
                        [cn.drawerCardError]: this.state.validationErrors.includes(FORM_ERRORS.CONTRIBUTORS),
                    })}>
                        <Contributors updateMap={this.updateMap} contributors={this.state.map.contributors}/>
                    </div>
                    <Button color="secondary" variant="contained" fullWidth onClick={this.submitMapInfo} disabled={!this.state.canPressAdd}>
                        Next: Images
                    </Button>
                    </>
                )}
                {this.state.currentTab === 1 && (
                    <ImageUpload
                        mapImages={this.state.map.mapImages}
                        stages={this.state.map.stages}
                        updateMap={this.updateMap}
                        mainImage={this.state.map.mainImage}
                    />
                )}
                {this.state.currentTab === 2 && (
                    <FileUpload
                        updateMap={this.updateMap}
                        context={this.props.context}
                        mapFiles={this.state.map.mapFiles}
                    />
                )}
            </>
        )
    }
}
