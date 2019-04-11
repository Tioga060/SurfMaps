/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
type mapcardlist_maps$ref = any;
export type mapcardlistGetMapsByTextQueryVariables = {
    readonly searchText?: string | null;
};
export type mapcardlistGetMapsByTextQueryResponse = {
    readonly searchMaps: {
        readonly " $fragmentRefs": mapcardlist_maps$ref;
    };
};
export type mapcardlistGetMapsByTextQuery = {
    readonly response: mapcardlistGetMapsByTextQueryResponse;
    readonly variables: mapcardlistGetMapsByTextQueryVariables;
};



/*
query mapcardlistGetMapsByTextQuery(
  $searchText: String
) {
  searchMaps(search: $searchText) {
    ...mapcardlist_maps
  }
}

fragment mapcardlist_maps on SurfMapsConnection {
  maps: nodes {
    mapname
    author
    tier
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "searchText",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "search",
    "variableName": "searchText",
    "type": "String"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "mapcardlistGetMapsByTextQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "searchMaps",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "SurfMapsConnection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "mapcardlist_maps",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "mapcardlistGetMapsByTextQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "searchMaps",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "SurfMapsConnection",
        "plural": false,
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
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "mapcardlistGetMapsByTextQuery",
    "id": null,
    "text": "query mapcardlistGetMapsByTextQuery(\n  $searchText: String\n) {\n  searchMaps(search: $searchText) {\n    ...mapcardlist_maps\n  }\n}\n\nfragment mapcardlist_maps on SurfMapsConnection {\n  maps: nodes {\n    mapname\n    author\n    tier\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '4b3c8ca294a528fda0b77ab2504464ca';
export default node;
