/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type mapcard_map$ref = any;
export type mapcard_map = {
    readonly mapname: string;
    readonly author: string;
    readonly tier: number;
    readonly " $refType": mapcard_map$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "mapcard_map",
  "type": "SurfMap",
  "metadata": null,
  "argumentDefinitions": [],
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
};
(node as any).hash = 'bded966ccdcb265d1b8119d4d9da1075';
export default node;
