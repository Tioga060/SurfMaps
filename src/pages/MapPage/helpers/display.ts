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

export const alreadyHasLinearSection = (stages: MapTypes.IDisplayStage[]): boolean => (
    stages.some((stage) => stage.stageType.name === STAGE_TYPES.LINEAR)
);

export const removeAllStages = (stages: MapTypes.IDisplayStage[], type: string = STAGE_TYPES.STAGE): MapTypes.IDisplayStage[] => (
    stages.filter((stage) => stage.stageType.name !== type)
);

export const getNextStageNumber = (stages: MapTypes.IDisplayStage[], stageTypeName: string) => {
    const stageNumbers = stages.filter((stage) => (
        stage.stageType.name === stageTypeName
    )).map((stage) => (
        stage.number
    ));
    for (let i = 1; i < stageNumbers.length + 1; i += 1) {
        if (!stageNumbers.includes(i)) {
            return i;
        }
    }
    return stageNumbers.length + 1;
};
