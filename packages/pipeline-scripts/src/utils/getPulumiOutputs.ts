import { exec } from "shelljs";

export const getPulumiOutputs = (): { [key: string]: any} => JSON.parse(exec('pulumi stack output --json'))