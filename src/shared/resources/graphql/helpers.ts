import { commitMutation } from 'react-relay';
import { Environment, GraphQLTaggedNode } from 'relay-runtime';

export const simpleMutationCreator = <IData> (environment: Environment, query: GraphQLTaggedNode) =>
    (data: IData, callBack: () => void) => {
    commitMutation(
        environment,
        {
            mutation: query,
            variables: data,
            onCompleted: (response: any, errors) => {
                callBack();
            },
            onError: (error) => {
                console.log(error) // TODO
            },
        } 
    );
};

export const callbackMutationCreator = <IData, IResponseData> (environment: Environment, query: GraphQLTaggedNode) =>
    (data: IData, callBack: (data: IResponseData) => void) => {
    commitMutation(
        environment,
        {
            mutation: query,
            variables: data,
            onCompleted: (response: IResponseData, errors) => {
                callBack(response);
            },
            onError: (error) => {
                console.log(error) // TODO
            },
        } 
    );
};
