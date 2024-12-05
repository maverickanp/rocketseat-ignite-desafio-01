# Task CRUD API

Este projeto é uma API RESTful para gerenciar tarefas (CRUD) com Node.js, Express, MongoDB e TypeScript. Ele permite criar, listar, atualizar, deletar, e marcar tarefas como concluídas. Além disso, também permite importar tarefas em massa a partir de um arquivo CSV.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express**: Framework web para criar a API REST.
- **MongoDB**: Banco de dados NoSQL para armazenar as tarefas.
- **Mongoose**: Biblioteca de modelagem de dados para conectar ao MongoDB.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática.
- **Docker**: Utilizado para criar contêineres para o aplicativo e o banco de dados.

## Pré-requisitos

- **Docker** e **Docker Compose** instalados na máquina.
- **Node.js** e **npm** (ou **yarn**) para desenvolvimento local.

## Configuração do Ambiente

1. Clone o repositório:

   ```sh
   git clone https://github.com/maverickanp/rocketseat-ignite-desafio-01.git
   cd rocketseat-ignite-desafio-01
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

   ou

   ```sh
   yarn install
   ```

3. Crie um arquivo `.env` (opcional) para configurar variáveis de ambiente, como a URI do MongoDB.

## Utilizando o Docker

Este projeto está configurado para ser executado via Docker Compose, o que facilita a inicialização de todos os serviços necessários.

1. **Construir e iniciar os contêineres**:

   ```sh
   docker compose up --build
   ```

2. A aplicação estará disponível em `http://localhost:3000`.

## Rotas da API

### Criar uma Tarefa

- **Método**: `POST`
- **URL**: `/tasks`
- **Body**:
  
  ```json
  {
    "title": "Nome da tarefa",
    "description": "Descrição detalhada da tarefa"
  }
  ```

### Listar Todas as Tarefas

- **Método**: `GET`
- **URL**: `/tasks`
- **Query Params (opcional)**: `title`, `description`

### Atualizar uma Tarefa

- **Método**: `PUT`
- **URL**: `/tasks/:id`
- **Body**:
  
  ```json
  {
    "title": "Título atualizado",
    "description": "Descrição atualizada"
  }
  ```

### Deletar uma Tarefa

- **Método**: `DELETE`
- **URL**: `/tasks/:id`

### Marcar/Desmarcar uma Tarefa como Completa

- **Método**: `PATCH`
- **URL**: `/tasks/:id/complete`

### Importar Tarefas a Partir de um CSV

- **Método**: `POST`
- **URL**: `/tasks/import`
- **Descrição**: O arquivo `tasks.csv` deve estar localizado no diretório `data/` e seguir o formato:
  
  ```csv
  title,description
  Task 01,Descrição da Task 01
  Task 02,Descrição da Task 02
  ```

## Estrutura de Pastas

- **src/**: Código-fonte principal.
  - **controllers/**: Contém o `TaskController` que lida com a lógica das requisições.
  - **models/**: Contém o modelo de dados `Task` usado pelo Mongoose.
  - **routes/**: Define as rotas da API (`taskRoutes.ts`).
  - **config/**: Arquivo de configuração (`dbConfig.ts`) para conectar ao MongoDB.
- **Dockerfile**: Arquivo para criar a imagem Docker da aplicação.
- **docker-compose.yml**: Configuração para inicializar a aplicação e o MongoDB usando Docker.

## Comandos Úteis

- **Subir os contêineres com Docker Compose**:
  
  ```sh
  docker compose up
  ```

- **Parar os contêineres**:
  
  ```sh
  docker compose down
  ```

- **Recompilar os contêineres**:
  
  ```sh
  docker compose up --build
  ```

## Problemas Comuns

- **Erro de Conexão ao MongoDB**: Certifique-se de que o serviço do MongoDB (`db`) está funcionando corretamente e que a aplicação está conectada ao host correto (`db`).
- **Tempo Limite de Conexão**: Verifique se o MongoDB está pronto antes da aplicação tentar se conectar. Use `docker compose logs db` para monitorar.

## Melhorias Futuras

- **Autenticação**: Adicionar autenticação de usuário para proteger as rotas.
- **Validação**: Melhorar a validação dos campos usando bibliotecas como `Joi`.
- **Testes Unitários**: Adicionar testes para garantir a integridade das funcionalidades da API.

## Contribuição

Sinta-se à vontade para contribuir com o projeto enviando um pull request. Toda contribuição é bem-vinda!

## Licença

Este projeto está sob a licença MIT.
