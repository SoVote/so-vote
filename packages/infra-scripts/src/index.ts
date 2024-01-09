#!/usr/bin/env node

import { Command } from 'commander'
import { defineDeployScript } from "./deploy";
import { defineDestroyScript } from "./destroy";

const program = new Command()

program
  .name('deployment')
  .description('Provides deployment facilities')


defineDeployScript(program)
defineDestroyScript(program)

program.parse()