#!/usr/bin/env node

import { Command } from 'commander'
import { defineDeployScript } from "./deploy";

const program = new Command()

program
  .name('service-deployment')
  .description('Provides environment deployment facilities')

defineDeployScript(program)
defineDeployScript(program)

program.parse()