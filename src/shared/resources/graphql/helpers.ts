import { commitMutation, fetchQuery } from 'react-relay';
import { Environment, GraphQLTaggedNode } from 'relay-runtime';

export const mutationCreator = <IData, IResponseData=any> (environment: Environment, query: GraphQLTaggedNode) =>
    async (data: IData): Promise<IResponseData> => (
        new Promise((resolve, reject) => {
            commitMutation(
                environment,
                {
                    mutation: query,
                    variables: data,
                    onCompleted: (response: IResponseData) => {
                        resolve(response);
                    },
                    onError: (error) => {
                        console.log(error) // TODO
                        reject(false);
                    },
                } 
            )
        })
    );

export const queryCreator = <IData, IResponseData=any> (environment: Environment, query: GraphQLTaggedNode) =>
    async (data: IData): Promise<IResponseData> => (fetchQuery(environment, query, data));

