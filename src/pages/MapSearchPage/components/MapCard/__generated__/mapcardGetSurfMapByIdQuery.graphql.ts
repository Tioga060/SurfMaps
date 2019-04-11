/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
type mapcard_map$ref = any;
export type mapcardGetSurfMapByIdQueryVariables = {
    readonly mapId: string;
};
export type mapcardGetSurfMapByIdQueryResponse = {
    readonly surfMap: ({
        readonly " $fragmentRefs": mapcard_map$ref;
    }) | null;
};
export type mapcardGetSurfMapByIdQuery = {
    readonly response: mapcardGetSurfMapByIdQueryResponse;
    readonly variables: mapcardGetSurfMapByIdQueryVariables;
};



/*
query mapcardGetSurfMapByIdQuery(
  $mapId: ID!
) {
  surfMap(id: $mapId) {
    ...mapcard_map
    id
  }
}

fragment mapcard_map on SurfMap {
  mapname
  author
  tier
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "mapId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "mapId",
    "type": "ID!"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "mapcardGetSurfMapByIdQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "surfMap",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "SurfMap",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "mapcard_map",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "mapcardGetSurfMapByIdQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "surfMap",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "SurfMap",
        "plural": false,
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
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "mapcardGetSurfMapByIdQuery",
    "id": null,
    "text": "query mapcardGetSurfMapByIdQuery(\n  $mapId: ID!\n) {\n  surfMap(id: $mapId) {\n    ...mapcard_map\n    id\n  }\n}\n\nfragment mapcard_map on SurfMap {\n  mapname\n  author\n  tier\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'bea711f8d1d82232c8f53b78afa02119';
export default node;
