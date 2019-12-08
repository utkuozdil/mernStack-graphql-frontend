# mernStack-graphql-frontend

The frontend project of Mern Stack - GraphQL API example.

### Getting Started

It's a React project with Redux, Saga and Hooks.

There is no class component in this project. All components are functional and all lifecycles and states are managed with React Hooks(useState and useEffect)

Containers(Pages) manages components and containers connects to Redux structure with actions. If it's an asysnc operation, action goes to saga, then goes to reducer and goes back to containers. If it's not async; route is action-reducer-container.

This project uses GraphQL API, so there is only axios Post HTTP method in Saga files. But there are several GraphQL queries for every db operation.

### Possible Improvements

It lacks error handling, testing and deployment setup.

### Environment Variables

It uses url and port information in .env-cmdrc environment file in root folder.

### Installing

npm install

### How To Run

With "npm run start:dev" command, it uses information inside .env-cmdrc environment file

### Authors

* **Utku Ozdil**
