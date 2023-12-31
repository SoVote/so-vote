import * as pulumi from "@pulumi/pulumi";
import {isMain, prNumber} from "./variables";

export const bootStack = new pulumi.StackReference("boot");
