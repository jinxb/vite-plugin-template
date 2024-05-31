import { execSync } from 'node:child_process'
import { TSBuild } from './utils'

const commands = [TSBuild('./src/plugin/index.ts', 'plugin'), TSBuild('./src/runtime/index.ts', 'runtime')]

for (const command of commands) {
  execSync(command, { stdio: 'inherit' })
}
