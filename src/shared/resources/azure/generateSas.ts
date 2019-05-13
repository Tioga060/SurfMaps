export interface IResponse {
    token: string;
    uri: string;
}

export const generateSas = async (containerName: string): Promise<IResponse> => {
    const response = await fetch(`${process.env.REACT_APP_AZURE_FUNCTION_URL}/GenerateSas?container=${containerName}`);
    if (response.ok) {
        return await response.json();
    } else {
        return undefined!;
    }
};
