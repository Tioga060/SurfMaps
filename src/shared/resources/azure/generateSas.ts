export interface IResponse {
    token: string;
    uri: string;
}

export const generateSas = async (containerName: string, createContainer: boolean = false): Promise<IResponse> => {
    const response = await fetch(`${
        process.env.REACT_APP_AZURE_FUNCTION_DEV_URL
    }/GenerateSas?container=${
        containerName
    }${createContainer ? '&create=true' : ''}`, {
        credentials: 'include', // TODO - same origin
    });
    if (response.ok) {
        return await response.json();
    } else {
        return undefined!;
    }
};
