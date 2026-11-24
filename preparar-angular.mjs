// Cria o workspace por meio do Angular CLI antes da instalação inicial.
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, renameSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const raiz = fileURLToPath(new URL('.', import.meta.url));
const original = resolve(raiz, 'frontend');
if (existsSync(join(original, 'node_modules')) || existsSync(join(original, 'package-lock.json'))) {
  console.error('Execute apenas antes da instalação inicial do frontend.'); process.exit(1);
}
const temp = mkdtempSync(join(raiz, '.angular-preparo-'));
const destino = join(temp, 'workspace');
const backup = join(temp, 'backup');
try {
  const args = ['exec','--yes','--package=@angular/cli@20.3.0','--','ng','new','gestor-financeiro','--directory=workspace','--skip-install','--skip-git','--skip-tests','--routing=false','--style=css','--standalone','--defaults','--package-manager=npm'];
  const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, { cwd:temp, stdio:'inherit', shell:process.platform === 'win32' });
  if (result.status !== 0 || !existsSync(join(destino,'angular.json'))) throw new Error('O Angular CLI não conseguiu criar o workspace.');
  rmSync(join(destino,'src'), {recursive:true,force:true});
  // Mantém o código e as opções do projeto, em cima do workspace criado pelo CLI.
  cpSync(original, destino, {recursive:true,force:true});
  renameSync(original,backup);
  try { renameSync(destino,original); } catch (erro) { renameSync(backup,original); throw erro; }
  console.log('Workspace criado pelo Angular CLI. Agora execute npm install na pasta frontend.');
} catch (erro) { console.error(erro.message); process.exitCode=1; }
finally { if (existsSync(original)) rmSync(temp,{recursive:true,force:true}); }
