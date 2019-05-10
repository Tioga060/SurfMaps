import React, {useEffect} from 'react';
import { IEditImage } from 'shared/components/ImageDropzone';
import { classNames as cn } from '../../styles';

interface IProps {
    image: IEditImage;
}

export const HeaderImage: React.StatelessComponent<IProps> = ({image}) => {
    if (!image || !image.storeLocation) {
        return null;
    } // TODO - fix image destruction
    let url: string = '';
    if (image && !!image.storeLocation) {
        url = image.storeLocation;
    } else if (image && !!image.file) {
        url = URL.createObjectURL(image.file);
    }

    let imageTag: JSX.Element = undefined!;
    if (url.length) {
        imageTag = <img className= "mw-100 mh-100" src={url} />
    }

    /*useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        if (image && !!image.file) {
            URL.revokeObjectURL(url);
        }
    });*/

    return (
        <div className={cn.mapCard}>
            {imageTag}
        </div> 
    );
}
