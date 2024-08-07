# Desafio #3 - Projeto Semana 12 Node & AWS 🎥

Resolução do desafio proposto para a trilha de aprendizado Back-end Journey (Node.js) da Compass UOL

## Ir para

-   [Descrição do desafio](#descrição-do-desafio)
    -   [Funcionalidades](#funcionalidades)
    -   [Regras de negócio](#regras-de-negócio)
-   [Nosso projeto](#nosso-projeto)
    -   [Stack de desenvolvimento utilizada](#stack-de-desenvolvimento-utilizada)
    -   [Rotas](#rotas)
    -   [Payloads](#payloads)
-   [Como executar o projeto](#como-executar-o-projeto)

## Descrição do desafio

O projeto consiste no desenvolvimento de uma API REST com funcionalidades de CRUD para Usuários e Eventos, utilizando as tecnologias e conhecimentos aprendidos no curso.

### Funcionalidades

-   Sign-up usuário, com firstName, lastName, birthDate, city, country, email, password e confirmPassword.
-   Sign-in usuário, com email e password.
-   Cadastrar/listar/deletar evento, com description e dayOfWeek.
-   Armazenar foto de perfil do usuário em um bucket S3 da AWS, através de uma URL pré-assinada
-   Cada usuário poderá ter um ou mais eventos.
-   Cada evento terá um dia da semana e uma descrição.
-   Todos os campos são required/obrigatórios.

### Regras de negócio

-   Recurso: Usuário
    -   Não pode cadastrar mais de um usuário com o mesmo email.
    -   A senha deve conter no minimo 5 caracteres.
-   Recurso: Evento
    -   Não pode cadastrar outra informação no campo dayOfWeek a não ser um dia da semana em inglês.
-   Respostas de exceção
    -   A resposta de exceção deve conter as seguintes informações:
        -   statusCode : Código de status HTTP
        -   message : Mensagem de erro
        -   erro : Tipo do erro

## Nosso projeto

### Stack de desenvolvimento utilizada

-   Node.js com Typescript
-   Banco de dados: MongoDB
-   Eslint e Prettier para formatação do código
-   Versionamento: GitHub
-   Joi para validação de payload
-   Testes unitários com Jest

### Rotas

<aside>
> base_url → localhost:3000/

</aside>

<aside>
> users/sign-in → criar usuário

</aside>

<aside>
> /users/sign-up → login

</aside>

<aside>
> /events → criar evento

</aside>

<aside>
> /events?dayOfWeek=sunday&description=descrição → listar eventos com a mesma descrição e dia da semana

</aside>

<aside>
> /events?dayOfWeek=sunday → deletar todos os eventos com o mesmo dia da semana

</aside>

<aside>
> /events/{event_id} → deletar ou listar um único evento

</aside>

-   Users (usuários)

    | ROTA                   | MÉTODO |
    | ---------------------- | ------ |
    | base_url/users/sign-up | POST   |
    | base_url/users/sign-in | POST   |

-   Event (eventos)

    | ROTA                 | MÉTODO |
    | -------------------- | ------ |
    | base_url/events/     | POST   |
    | base_url/events?     | GET    |
    | base_url/events?     | DELETE |
    | base_url/events/{id} | GET    |
    | base_url/events/{id} | DELETE |

### Payloads

-   Users (usuário)

    -   request POST:

    ```json
    {
        "firstName": "string",
        "lastName": "string",
        "birthDate": "2024-08-07",
        "city": "string",
        "country": "string",
        "email": "string",
        "password": "string",
        "confirmPassword": "string"
    }
    ```

    -   response POST:

    `201 Created`

    -   request POST:

    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```

    -   response POST:

    ```json
    {
        "firstName": "string",
        "lastName": "string",
        "email": "string"
    }
    ```

-   Event (eventos)

    -   request POST:

    ```json
    {
        "description": "string",
        "dayOfWeek": "sunday"
    }
    ```

    -   response POST:

    ```json
    {
        "_id": "string",
        "description": "string",
        "dayOfWeek": "sunday",
        "userId": "string"
    }
    ```

    -   request GET:

    `base_url/events?dayOfWeek=sunday&description=descrição`

    -   response GET:

    ```json
    [
        {
            "_id": "string",
            "description": "string",
            "dayOfWeek": "sunday",
            "userId": "string"
        }
    ]
    ```

### Como executar o projeto

-   Fazer `git clone` do repositório
-   Abrir a pasta com VS Code
-   .env:

```json
APP_SECRET=APP_SECRET=
PORT="3000"
APP_API_URL="http://localhost:3000"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_SESSION_TOKEN=
S3_BUCKET_NAME=
```

-   Abrir novo terminal e executar o comando `npm install` para instalar as dependências do projeto
-   Executar o comando `npm run dev` para inicializar a aplicação
-   Utilizando o Insomnia, criar as HTTP requests com as rotas especificadas no tópico Rotas e preencher o body (JSON) de acordo com os campos solicitados no tópico Payloads
-   Os testes são executados pelo comando `npm run test`
