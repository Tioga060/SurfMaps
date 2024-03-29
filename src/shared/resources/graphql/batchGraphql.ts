import 'regenerator-runtime/runtime';
import { Environment, RecordSource, Store } from 'relay-runtime';
import { RelayNetworkLayer, batchMiddleware, urlMiddleware, RelayRequestAny, MiddlewareNextFn } from 'react-relay-network-modern';
import Hash from 'object-hash';

type IReqWithId = RelayRequestAny & {
    id?: string;
    body?: string;
}

const network = new RelayNetworkLayer([
    urlMiddleware({
        url: process.env.REACT_APP_AZURE_FUNCTION_DEV_URL + '/graphql',
    }),
    (next: MiddlewareNextFn) => async (req: IReqWithId) => {
        req.fetchOpts.credentials = 'include'; // TODO - same origin instead
        req.id = Hash.MD5(req.fetchOpts.body);
        const body = JSON.parse(req.fetchOpts.body as string);
        body['id'] = req.id;
        req.fetchOpts.body = JSON.stringify(body);
        const res = await next(req);
        return res;
    },
    batchMiddleware({
        batchUrl: process.env.REACT_APP_AZURE_FUNCTION_DEV_URL + '/graphql',
        batchTimeout: 30,
        allowMutations: true,
        credentials: 'include', // TODO - same origin instead
    }),
]);

export const batchEnvironment = new Environment({
    network,
    store: new Store(new RecordSource()),
});
