/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { LitElement, property, html, customElement } from 'lit-element';
//import {Card} from '@material/mwc-card';
import '@polymer/paper-styles/typography.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
// possible way to render elements imported as {Card} here https://github.com/material-components/material-components-web-components/blob/master/packages/card/mwc-card.js

export interface IMap {
  name: string;
  imagePath: string;
  description: string;
}

const defaultIMap = {
  name: 'surf_obliteration',
  imagePath: 'images/dev/surf_obliteration.jpg',
  description: 'Kingpin\'s favorite map ever',
}

@customElement('map-card')
export class MapCard extends LitElement {
  @property() map: IMap = defaultIMap;

  protected render() {
    return html`
      <custom-style>
        <style is="custom-style" include="paper-material-styles">
          .paper-font-headline {
            @apply --paper-font-headline;
          }
        </style>
      </custom-style>
      <!--mwc-card></mwc-card-->
      <paper-card image="${this.map.imagePath}" alt="Emmental">
        <div class="card-content">
          <div class="paper-font-headline">
            ${this.map.name}
          </div>
          ${this.map.description}
        </div>
        <div class="card-actions">
          <paper-button>Explore!</paper-button>
          <iron-icon icon="search"></iron-icon>
          <paper-icon-button icon="favorite"></paper-icon-button>
        </div>
      </paper-card>
    `
  }
}
