import * as MapTypes from '../types';
import { STAGE_TYPES } from './constants';

export const sortStages = (stageList: MapTypes.IDisplayStage[]): MapTypes.IDisplayStage[] => {
    const [stages, bonuses] = stageList.reduce((result: MapTypes.IDisplayStage[][], stage) => {
        result[stage.stageType.name === STAGE_TYPES.BONUS ? 1 : 0].push(stage);
        return result;
    }, [[], []]);

    return [
        ...stages.sort((a: MapTypes.IDisplayStage, b: MapTypes.IDisplayStage) => a.number - b.number),
        ...bonuses.sort((a: MapTypes.IDisplayStage, b: MapTypes.IDisplayStage) => a.number - b.number)
    ] as MapTypes.IDisplayStage[];
};