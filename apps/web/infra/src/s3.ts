import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import {resourcePrefix} from "./variables";
import { getAllFiles } from "./utils/getAllFiles";
import * as pathUtils from "path";
import { Output } from "@pulumi/pulumi";

export const webAssetsBucket = new aws.s3.Bucket(`${resourcePrefix}-app-assets`, {
  forceDestroy: true
});
createS3Objects(getAllFiles('../code/.open-next/assets'), webAssetsBucket.bucket)

export const webCacheBucket = new aws.s3.Bucket(`${resourcePrefix}-app-cache`, {
  forceDestroy: true
});
createS3Objects(getAllFiles('../code/.open-next/cache'), webCacheBucket.bucket)

export const webImageBucket = new aws.s3.Bucket(`${resourcePrefix}-app-images`, {
  forceDestroy: true
});
createS3Objects(getAllFiles('../code/.open-next/images'), webImageBucket.bucket)

function createS3Objects(files: string[], bucket: Output<string>){
  for(const file of files){
    const objectKey = pathUtils.relative(__dirname, file);
    new aws.s3.BucketObject(objectKey, {
      bucket: bucket,
      source: new pulumi.asset.FileAsset(file),
      contentType: "application/octet-stream", // Set appropriate content type if needed
    });
  }
}