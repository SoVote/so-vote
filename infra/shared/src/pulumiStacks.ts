import * as pulumi from '@pulumi/pulumi';

export const globalStack = new pulumi.StackReference('global');
