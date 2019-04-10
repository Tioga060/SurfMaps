/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type component_map$ref = any;
export type component_map = {
    readonly mapname: string;
    readonly author: string;
    readonly tier: number;
    readonly " $refType": component_map$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "component_map",
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
(node as any).hash = 'ebda975d4d32fe98f22c481b4ea29cf0';
export default node;
