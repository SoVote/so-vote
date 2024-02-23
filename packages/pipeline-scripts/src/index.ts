#!/usr/bin/env node

import { Command } from 'commander'
import { defineDeployScript } from "./deploy";
import { defineDestroyScript } from "./destroy";
import { defineGlobalDeployScript } from "./deployGlobal";
import { defineSharedDeployScript } from "./deployShared";
import { defineDeployWebScript } from "./deployWeb";
import { defineDeployEnvScript } from "./deployEnv";
import { defineGenerateWebEnvVarsScript } from "./generateWebEnvVars";
import { definePreviewScript } from "./preview";

const program = new Command()

program
  .name('pipeline scripts')
  .description('Provides infrastructure, build and deployment facilities')


defineDeployScript(program)
defineDeployEnvScript(program)
defineDeployWebScript(program)
defineSharedDeployScript(program)
defineGlobalDeployScript(program)
defineDestroyScript(program)
defineGenerateWebEnvVarsScript(program)
definePreviewScript(program)

program.parse()