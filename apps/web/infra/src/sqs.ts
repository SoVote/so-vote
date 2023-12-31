import * as aws from "@pulumi/aws";
import {resourcePrefix} from "./variables";

export const webCacheRevalidationQueue = new aws.sqs.Queue(`${resourcePrefix}-cache-revalidation-queue`, {
  fifoQueue: true,
  contentBasedDeduplication: true, // You can set this as needed
});
