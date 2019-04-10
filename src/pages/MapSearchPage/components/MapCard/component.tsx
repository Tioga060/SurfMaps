import React from 'react';
import Card, {
  CardPrimaryContent,
  CardMedia,
} from "@material/react-card";
import {
    Headline6,
    Subtitle2,
  } from '@material/react-typography';

import './styles.scss';

export const MapCard: React.StatelessComponent = () => (
    <Card className='map-card'>
      <CardPrimaryContent>
        <CardMedia wide imageUrl='http://puu.sh/DcrAi/6e3c7b259a.jpg' />
        <div  className="map-primary">
            <Headline6 className='map-title'>
                surf_obliteration
            </Headline6>
            <Subtitle2 className='map-subtitle'>
                Tioga060 | Tier 6
            </Subtitle2>
        </div>
      </CardPrimaryContent>
      
    </Card>
)