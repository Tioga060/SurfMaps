import {
    Environment,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';
import * as Cookie from 'es-cookie';

const GRAPHQL_HOST = 'http://localhost:5000';

function fetchQuery(
    operation: any,
    variables: any,
) {
    const token = Cookie.get('token');
    return fetch(GRAPHQL_HOST + '/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: token ? `Bearer ${token}` : "", // TODO: better authentication for default user
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then(response => {
        return response.json();
    });
}

const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

export default environment;
