import * as aws from "@pulumi/aws";
import {resourcePrefix} from "./variables";

export const webCacheRevalidationTable = new aws.dynamodb.Table(`${resourcePrefix}-cache-revalidation-table`, {
  billingMode: 'PAY_PER_REQUEST',
  attributes: [
    { name: "tag", type: "S" },
    { name: "path", type: "S" },
    { name: "revalidatedAt", type: "N" },
  ],
  hashKey: "tag",
  rangeKey: "path",
  globalSecondaryIndexes: [
    {
      name: "revalidate",
      hashKey: "path",
      rangeKey: "revalidatedAt",
      projectionType: "ALL",
    },
  ]
});
