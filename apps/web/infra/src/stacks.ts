import * as pulumi from "@pulumi/pulumi";
import {isMain, prNumber} from "./variables";

export const bootStack = new pulumi.StackReference("boot");

export const globalStack = new pulumi.StackReference(`${isMain ? 'main' : 'dev'}-global`);

export const envStack = new pulumi.StackReference( `${isMain ? 'main' : `pr-${prNumber}`}-environment`)
