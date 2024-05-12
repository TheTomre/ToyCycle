# ToyCycle
## Toy exchange web app

## Project Description
This project creates a dynamic full-stack web application, ToyCycle, aimed at fostering a community-based toy exchange platform. The system is structured around a non-relational database and utilizes a server delivering RESTful APIs for interaction with client-side applications. ToyCycle is designed to enable families to exchange toys or use tokens as a flexible, gamified currency within the platform.

## Key Features

### User Management:
- Supports full CRUD operations for user accounts, including registration, profile updates, and soft deletion (archiving inactive accounts).
- Each user can manage their toy listings and token balance, with each account having a unique username and password stored securely.

### Toy Management:
- Users can post toys for exchange, update listings, or remove them when necessary. Each toy listing includes detailed descriptions, images, and category tags.
- Toys can be converted into tokens if a direct exchange is not immediately available, with the platform tracking these transactions.

### Token System:
- Enables users to earn tokens by listing toys and spend tokens to claim toys from others.
- Tokens maintain a record of accumulation and expenditure, providing a transparent history of transactions for users.

### Database Schema:
- Utilizes MongoDB for storing data with schemas for users, toys, transactions, and tokens. MongoDB's flexibility with schema design allows for easy adjustments and scaling.
- Relations are managed through references in documents, ensuring data integrity and efficient retrievals.

### API Endpoints:
- Provides comprehensive endpoints for user interactions with toys and tokens, including APIs for creating, retrieving, updating, and deleting toy listings, as well as managing token transactions.
- Each main entity (user, toy, token) has endpoints dedicated to typical CRUD operations, supplemented with search and filter capabilities to enhance user experience.

### Security and Data Integrity:
- Implements security best practices, including password hashing with bcrypt and JWT for user authentication.
- Uses database indexing to enhance the performance and integrity of queries, especially for user and toy lookups.


## Tech Stack
Our project, ToyCycle, leverages a robust and modern tech stack designed to ensure a scalable, maintainable, and user-friendly application. Here's a breakdown of the technologies we use:

- **TypeScript**: Provides static typing to JavaScript, enhancing code quality and maintainability by catching errors early in the development process.
- **Next.js**: A React framework that enables server-side rendering and static site generation, optimizing performance and improving SEO.
- **Express.js**: A back-end web application framework for Node.js, used to build our RESTful APIs. It simplifies routing and middleware integration, making the server more modular and easier to maintain.
- **Zod**: A TypeScript-first schema validation library that allows for safe parsing and validation of data at runtime, ensuring robust type safety across the application.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces. It allows for styling directly in markup, reducing CSS maintenance issues and speeding up development.
- **Jira**: Used for project management. It helps us keep track of all tasks, sprints, and issues, facilitating better communication and organization within the team.


## Resources


### Users

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td>/me</td>
      <td>Retrieve the current user's profile and account details</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td>/me</td>
      <td>Update the current user's profile information</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/me</td>
      <td>Soft delete the current user's account (archive)</td>
    </tr>
  </tbody>
</table>

### Token Management

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td>/me/tokens</td>
      <td>Retrieve the current user's token balance</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/me/tokens/spend</td>
      <td>Deduct tokens from the current user's balance (specify amount in body)</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/me/tokens/earn</td>
      <td>Add tokens to the current user's balance (specify amount in body)</td>
    </tr>
  </tbody>
</table>

### Toys

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td>/toys</td>
      <td>Retrieve a list of all toys</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/toys/:tid</td>
      <td>Retrieve a specific toy by ID</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/toys</td>
      <td>Create a new toy listing</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td>/toys/:tid</td>
      <td>Update a specific toy by ID</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/toys/:tid</td>
      <td>Remove a toy listing by ID</td>
    </tr>
  </tbody>
</table>

## Structure

### Typescript Interfaces
```typescript
enum UserRole {
    ADMIN = 1,
    USER = 2
}

interface User {
    id: string;
    username: string; // Unique username
    name: string;
    lastActive: Date;
    password: string; // Stores hashed password
    toyListings: Toy[];
    tokenBalance: number;
}

interface Toy {
    id: string;
    name: string;
    description: string;
    category: string[];
    status: 'available' | 'exchanged';
    images: string[];
    tokenValue: number;
}

interface Transaction {
    id: string;
    userId: string;
    toyId: string;
    type: 'earn' | 'spend';
    amount: number;
    date: Date;
}
