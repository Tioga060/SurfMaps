import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Dropzone } from 'shared/components/ImageDropzone';

interface IProps {
}

export const ImageUpload: React.StatelessComponent<IProps> = (props) => (
    <div>
        <Typography variant="h6" align="center">
            Map Images
        </Typography>
        <Dropzone/>
    </div>
);
