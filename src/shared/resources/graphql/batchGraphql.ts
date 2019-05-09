import 'regenerator-runtime/runtime';
import { Environment, RecordSource, Store } from 'relay-runtime';
import { RelayNetworkLayer, batchMiddleware, urlMiddleware, RelayRequestAny, MiddlewareNextFn } from 'react-relay-network-modern';
import Hash from 'object-hash';

const GRAPHQL_HOST = 'http://localhost:3040';

type IReqWithId = RelayRequestAny & {
    id?: string;
}

const network = new RelayNetworkLayer([
    urlMiddleware({
        url: GRAPHQL_HOST + '/graphql',
    }),
    (next: MiddlewareNextFn) => async (req: IReqWithId) => {
        req.fetchOpts.credentials = 'include'; // TODO - same origin instead
        req.id = Hash.MD5(req.fetchOpts.body);
        const res = await next(req);
        return res;
    },
    batchMiddleware({
        batchUrl: GRAPHQL_HOST + '/graphql',
        batchTimeout: 30,
        allowMutations: true,
    }),
    
]);

export const batchEnvironment = new Environment({
    network,
    store: new Store(new RecordSource()),
});
