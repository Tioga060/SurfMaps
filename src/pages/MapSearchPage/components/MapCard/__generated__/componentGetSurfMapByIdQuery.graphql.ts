/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
type component_map$ref = any;
export type componentGetSurfMapByIdQueryVariables = {
    readonly mapId: string;
};
export type componentGetSurfMapByIdQueryResponse = {
    readonly surfMap: ({
        readonly " $fragmentRefs": component_map$ref;
    }) | null;
};
export type componentGetSurfMapByIdQuery = {
    readonly response: componentGetSurfMapByIdQueryResponse;
    readonly variables: componentGetSurfMapByIdQueryVariables;
};



/*
query componentGetSurfMapByIdQuery(
  $mapId: ID!
) {
  surfMap(id: $mapId) {
    ...component_map
    id
  }
}

fragment component_map on SurfMap {
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
    "name": "componentGetSurfMapByIdQuery",
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
            "name": "component_map",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "componentGetSurfMapByIdQuery",
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
    "name": "componentGetSurfMapByIdQuery",
    "id": null,
    "text": "query componentGetSurfMapByIdQuery(\n  $mapId: ID!\n) {\n  surfMap(id: $mapId) {\n    ...component_map\n    id\n  }\n}\n\nfragment component_map on SurfMap {\n  mapname\n  author\n  tier\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'd646c9e23f26705d7befd86fc41464fc';
export default node;
