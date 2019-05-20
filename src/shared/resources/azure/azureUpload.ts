import {
    AnonymousCredential,
    uploadBrowserDataToBlockBlob,
    Aborter,
    BlobURL,
    BlockBlobURL,
    ContainerURL,
    ServiceURL,
    StorageURL
} from '@azure/storage-blob';
import { TransferProgressEvent } from '@azure/ms-rest-js';

// Following https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/typescript/advanced.ts#L70
// TODO - lock out azure storage account cors https://dmrelease.blob.core.windows.net/azurestoragejssample/samples/sample-blob.html
export const uploadFile = async (
    file: File,
    uploadSas: string,
    containerName: string,
    blobName: string,
    progressCallback: (ev: TransferProgressEvent) => void,
) => {
    const pipeline = StorageURL.newPipeline(new AnonymousCredential(), {
        // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
        // logger: MyLogger, // A customized logger implementing IHttpPipelineLogger interface
        retryOptions: { maxTries: 4 }, // Retry options TODO - tweak this
        telemetry: { value: "HighLevelSample V1.0.0" } // Customized telemetry string
    });

    const serviceURL = new ServiceURL(
        `${process.env.REACT_APP_AZURE_BLOB_URL}?${uploadSas}`,
        pipeline
    );
    
    const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    const blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);

    return await uploadBrowserDataToBlockBlob(Aborter.none, file, blockBlobURL, {
        blockSize: 4 * 1024 * 1024, // 4MB block size
        parallelism: 20, // 20 concurrency
        progress: progressCallback,
    });
};
