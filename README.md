# desenvolvedor-io-angular-avancado
Projeto desenvolvido baseando-se no projeto final do curso "Desenvolvimento Avançado em Angular" da plataforma @desenvolvedor.io.
No backend foi utilizada a API disponibilizada no curso, no frontend optei em utilizar o framework https://po-ui.io/.

<div align="center">
<img src='https://github.com/felipexmantovani/desenvolvedor-io-angular-avancado/blob/main/screen.gif' style="min-width: 100%" />
</div>

---

#### Preparando o ambiente

# backend
### Docker
- Instalar (https://www.docker.com/products/docker-desktop)
- Instalar extensão no vsCode (https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- Arquivos disponibilizados pela plataforma do curso (não é necessário baixar):
  - https://github.com/desenvolvedor-io/curso-angular-avancado
- Execute os comandos abaixo no seu terminal:

`
cd backend
`

`
docker-compose -f docker-compose.backend.yml up
`
- Após o processo finalizar, os containers irão aparecer na sua extensão do vsCode.
- Documentação da API, com os containers rodando acesse: http://localhost:5001/swagger/index.html

# frontend
`
cd frontend
`

`
npm install
`

#### Server
`
npm start
`

#### Testes unitários
`
npm run test:coverage
`
