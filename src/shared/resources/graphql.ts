import {
    Environment,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';

const GRAPHQL_HOST = 'http://localhost:3040';

function fetchQuery(
    operation: any,
    variables: any,
) {
    return fetch(GRAPHQL_HOST + '/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
        credentials: 'include',
        //mode: 'no-cors', // TODO - remove me
    }).then(response => {
        return response.json();
    });
}

const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

export default environment;
