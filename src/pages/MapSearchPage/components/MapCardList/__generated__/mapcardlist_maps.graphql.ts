/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type mapcardlist_maps$ref = any;
export type mapcardlist_maps = {
    readonly maps: ReadonlyArray<({
        readonly mapname: string;
        readonly author: string;
        readonly tier: number;
    }) | null>;
    readonly " $refType": mapcardlist_maps$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "mapcardlist_maps",
  "type": "SurfMapsConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "maps",
      "name": "nodes",
      "storageKey": null,
      "args": null,
      "concreteType": "SurfMap",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "mapname",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "author",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "tier",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = 'cde8abe34988c45b6b6e44af894acc7d';
export default node;
