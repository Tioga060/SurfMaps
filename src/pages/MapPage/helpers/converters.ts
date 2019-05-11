import * as T from 'shared/types';
import get from 'lodash/get';
import * as MapTypes from '../types';
import { IEditImage } from 'shared/components/ImageDropzone';
import { sortStages } from './display';

// IMap => editMap
interface IContributorMap {
    [id: string]: T.IMapContributor[];
}

const groupContributors = (contributors: T.IMapContributor[]): IContributorMap => {
    return contributors.reduce((result: IContributorMap, contributor) => {
        (result[contributor.contribution] = result[contributor.contribution] || []).push(contributor);
        return result;
    }, {})
}

const convertIMapContributorsToEditMap = (contributors: T.IMapContributor[]): MapTypes.IDisplayContributionGroup[] => {
    const groups = groupContributors(contributors);
    const contributions: MapTypes.IDisplayContributionGroup[] = [];
    for (const contribution of Object.keys(groups)) {
        contributions.push({
            contribution,
            contributionList: groups[contribution].map((cont) => ({
                user: cont.userByUserId.userSteamInfoByUserId,
                rowId: cont.rowId,
            })),
        });
    }
    return contributions;
}

interface IGenericImage {
    imageByImageId: {
        storeLocation: string;
        rowId?: string;
    }
    primaryImage?: boolean;
}

const convertIMapImagesToEditImage = (images: IGenericImage[], headerOnly: boolean = false): IEditImage[] => {
    return images.filter(image => image.primaryImage === undefined || image.primaryImage === headerOnly).map((image) => ({
        storeLocation: image.imageByImageId.storeLocation,
        rowId: image.imageByImageId.rowId,
    }));
};

const convertIMapStagesToEditMap = (stages: T.IStage[]): MapTypes.IDisplayStage[] => {
    const displayStages = stages.map((stage): MapTypes.IDisplayStage => ({
        rowId: stage.rowId,
        name: stage.name!,
        number: stage.number,
        authors: [stage.userByAuthorId.userSteamInfoByUserId],
        stageType: stage.stageTypeByStageTypeId,
        images: convertIMapImagesToEditImage(stage.stageImagesByStageId.nodes),
    }));
    return sortStages(displayStages);
}

export const convertIMapToEditState = (map: T.IMap): MapTypes.IDisplayMap => ({
    mapId: map.rowId,
    mapName: map.name,
    authors: map.mapAuthorsByMapId.nodes.map((author) => author.userByAuthorId.userSteamInfoByUserId),
    tier: map.tier,
    gameMode: map.gameModeByGameModeId,
    game: map.gameByGameId,
    mapType: map.mapTypeByMapTypeId,
    description: {...get(map.mapDescriptionsByMapId.nodes, '[0].textMarkdownByTextMarkdownId', {text: ''})},
    contributors: convertIMapContributorsToEditMap(map.mapContributorsByMapId.nodes),
    stages: convertIMapStagesToEditMap(map.stagesByMapId.nodes),
    mainImage: convertIMapImagesToEditImage(map.mapImagesByMapId.nodes, true),
    mapImages: convertIMapImagesToEditImage(map.mapImagesByMapId.nodes),
    releaseDate: map.releasedAt || map.createdAt,
    mapFiles: [], // TODO
    submitter: get(map, 'userByUploaderId.userSteamInfoByUserId'),
});
