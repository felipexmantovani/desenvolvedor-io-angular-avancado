# desenvolvedor-io-angular-avancado
Projeto desenvolvido baseando-se no projeto final do curso "Desenvolvimento Avançado em Angular" da plataforma @desenvolvedor.io.
No backend foi utilizada a API disponibilizada no curso, no frontend optei em utilizar o framework https://po-ui.io/.

---

#### Preparando o ambiente

# backend
### Docker
- Instalar (https://www.docker.com/products/docker-desktop)
- Instalar extensão no vsCode (https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- Arquivos disponibilizados pela plataforma do curso (não é necessário baixar):
  - https://github.com/desenvolvedor-io/curso-angular-avancado
- Siga os passos abaixo:

`
cd backend
`

`
docker-compose -f docker-compose.backend.yml up
`
- Após o processo finalizar, os containers irão aparecer na sua extensão do vsCode.

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
