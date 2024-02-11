import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import { resourcePrefix } from './variables';

const layerName = `${resourcePrefix}-dependencies-layer`
export const dependenciesLayer = new aws.lambda.LayerVersion(layerName, {
  layerName,
  description: 'A layer containing all package dependencies',
  compatibleRuntimes: ['nodejs18.x'],
  code: new pulumi.asset.AssetArchive({
    '.': new pulumi.asset.FileArchive('../../.yarn/cache'),
    '.pnp.cjs': new pulumi.asset.FileArchive('../../.pnp.cjs'),
    '.pnp.loader.mjs': new pulumi.asset.FileArchive('../../.pnp.cjs'),
  }),
});