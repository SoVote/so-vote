import * as aws from "@pulumi/aws";

export const buildCacheBucket = new aws.s3.Bucket("rainbow-husky-build-cache", {
    forceDestroy: true,
    serverSideEncryptionConfiguration: {
        rule: {
            bucketKeyEnabled: true,
            applyServerSideEncryptionByDefault: {
                sseAlgorithm: 'AES256',
            }
        }
    }
});
new aws.s3.BucketLifecycleConfigurationV2("rainbow-husky-build-cache-lifecycle", {
    bucket: buildCacheBucket.id,
    rules: [{
        id: "delete-old-files",
        status: "Enabled",
        expiration: {
            days: 365
        }
    }],
});
