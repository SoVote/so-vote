#!/usr/bin/env node

import { Command } from 'commander'
import { defineDeployScript } from "./deploy";
import { defineDestroyScript } from "./destroy";
import { defineGlobalDeployScript } from "./deployGlobal";
import { defineSharedDeployScript } from "./deployShared";
import { defineDeployWebScript } from "./deployWeb";
import { defineDeployEnvScript } from "./deployEnv";

const program = new Command()

program
  .name('deployment')
  .description('Provides deployment facilities')


defineDeployScript(program)
defineDeployEnvScript(program)
defineDeployWebScript(program)
defineSharedDeployScript(program)
defineGlobalDeployScript(program)
defineDestroyScript(program)

program.parse()