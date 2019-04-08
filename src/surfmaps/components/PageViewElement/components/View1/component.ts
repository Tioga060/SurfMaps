/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, customElement } from 'lit-element';
import { PageViewElement } from '../../../PageViewElement';

// These are the shared styles needed by this element.
import { SharedStyles } from '../../../../shared/styles';

// Elements needed by this element
import '../../../../shared/components/MapCard'

@customElement('my-view1')
export class View1 extends PageViewElement {
  static get styles() {
    return [
      SharedStyles
    ];
  }

  protected render() {
    return html`
    <custom-style>
      <style is="custom-style">
        .map-results-list {
          @apply --layout-horizontal;
          @apply --layout-wrap;
        }

        .map-results-list > map-card {
          box-sizing: border-box;
          max-width: 256px;
          padding: 6px;
          flex: 0 0 auto;
        }
      </style>
    </custom-style>
      <section>
        <h2>Static page</h2>
        <p>This is a text-only page.</p>
        <p>It doesn't do anything other than display some static text.</p>
      </section>
      <section>
        <div class="map-results-list">
          <map-card active="${false}"></map-card>
          <map-card active="${false}"></map-card>
          <map-card active="${false}"></map-card>
        </div>
      </section>
    `;
  }
}
