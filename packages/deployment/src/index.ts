#!/usr/bin/env node

import { Command } from 'commander'
import { defineDeployScript } from "./deploy";

const program = new Command()

program
  .name('deployment')
  .description('Provides deployment facilities')

defineDeployScript(program)
defineDeployScript(program)

program.parse()