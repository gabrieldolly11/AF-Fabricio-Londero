# Gestor Financeiro Pessoal

Aplicação acadêmica para cadastrar receitas e despesas, acompanhar saldo, filtrar movimentações e visualizar despesas por categoria.

## Tecnologias
Angular 20, Node.js, Express, Mongoose e MongoDB.

## Execução
Utilize Node.js 22.12 ou superior da linha 22 e MongoDB local ou Atlas.

Na raiz do projeto, antes da instalação inicial do frontend, execute `node preparar-angular.mjs` para criar o workspace com Angular CLI.

No terminal PowerShell:
```powershell
cd backend
Copy-Item .env.example .env
npm install
npm start
```
O exemplo usa MongoDB local na porta 27017. Para Atlas, configure a URI de conexão no arquivo .env, sem publicá-la.

Em outro terminal, a partir da raiz:
```powershell
cd frontend
npm install
npm start
```
Acesse http://localhost:4200. A API usa http://localhost:3000/api/movimentacoes. O proxy do Angular encaminha as requisições.

## API
GET para consultar, POST para cadastrar, PUT para editar e DELETE para excluir. As respostas são JSON. O saldo corresponde às receitas menos as despesas; o gráfico agrupa as despesas pelo valor de cada categoria.

## Testes
Na pasta backend, execute `npm test` e, com a API e o MongoDB rodando, `npm run test:api`. Na pasta frontend, execute `npm run build`. A compilação e a integração com MongoDB ainda precisam ser verificadas antes da entrega.
