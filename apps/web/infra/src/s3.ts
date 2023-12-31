import * as aws from "@pulumi/aws";
import {resourcePrefix} from "./variables";

export const webAssetsBucket = new aws.s3.Bucket(`${resourcePrefix}-app-assets`, {
  forceDestroy: true
});

export const webCacheBucket = new aws.s3.Bucket(`${resourcePrefix}-app-cache`, {
  forceDestroy: true
});

export const webImageBucket = new aws.s3.Bucket(`${resourcePrefix}-app-images`, {
  forceDestroy: true
});
