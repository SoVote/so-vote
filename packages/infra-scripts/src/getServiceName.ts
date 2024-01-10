import fs from "fs/promises";
import { PackageJson } from "./PackageJson";

export const getServiceName = async () => {
  const configString = await fs.readFile(`./package.json`, 'utf-8')
  const config = JSON.parse(configString) as PackageJson;
  let name = config.name.replace('@rainbow-husky/', '')
  if(name.endsWith('-infra')) name = name.slice(0, -6)
  return name.toLowerCase()
}