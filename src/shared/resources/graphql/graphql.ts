import {
    Environment,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';

function fetchQuery(
    operation: any,
    variables: any,
) {
    return fetch(process.env.REACT_APP_TEMP_GRAPHQL_URL + '/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
        credentials: 'include', // TODO - same origin
        //mode: 'no-cors', // TODO - remove me
    }).then(response => {
        console.log(response);
        return response.json();
    });
}

export const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});
