## Coffee Share

<p align="center">
  <img src="https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300" width="320" alt="Coffee Share" />
</p>

## Description

The whole purpose of this project is, as a new developper, to expand my knowledge and skills on development, front and back.

Use of [Nest](https://github.com/nestjs/nest) framework.

Front-end will be done with Angular for a Typescript full-stack.

Features already implemented:

- Full CRUD of users with TypeORM
- NestJs Interceptor using class-transformer transforming a UserEntity (DB) to a UserDto (at this time only password is removed)
- Use of Swagger for the API
- Already builted requests example via the postman collection shared on this repo

Features previsions:

- Security with JWT
- Unit test with Jest
- Good code practices, commented code,...
- Use of environment variables and a dedicated service
- Using the full possibilities that are implemented in NestJS : custom decorators, pipes (for DTO to Entities for example), interceptors, guards(for security and administration),...

Long term features:

- Possibility for users to add other users to their "friend list", they will have the possibility to share an expense balance page shared to track who must paid the coffee to whom next time. (Yes this is a tricount)
- Map, geolocation and it's share
- Sending notifications to other users ("I'm at Giluna's do you whant a babycinno?")
- Save of your custom items for faster price adding to the balance
- ...

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# access to the Swagger Doc
After starting the application, go to {URLApplication}/api
Example on development : http://localhost:3000/api/
```

## Stay in touch

- Author's linkedin [Alexandre Guérin](https://www.linkedin.com/in/alexandre-guerin/)
