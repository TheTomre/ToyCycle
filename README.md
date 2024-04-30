# ToyCycle
Toy exchange web app

## Project Description
This project creates a dynamic full-stack web application, ToyCycle, aimed at fostering a community-based toy exchange platform. The system is structured around a non-relational database and utilizes a server delivering RESTful APIs for interaction with client-side applications. ToyCycle is designed to enable families to exchange toys or use tokens as a flexible, gamified currency within the platform.

## Key Features

### User Management:

Supports full CRUD operations for user accounts, including registration, profile updates, and soft deletion (archiving inactive accounts).
Each user can manage their toy listings and token balance, with each account having a unique username and password stored securely.

### Toy Management:

Users can post toys for exchange, update listings, or remove them when necessary. Each toy listing includes detailed descriptions, images, and category tags.
Toys can be converted into tokens if a direct exchange is not immediately available, with the platform tracking these transactions.

### Token System:

Enables users to earn tokens by listing toys and spend tokens to claim toys from others.
Tokens maintain a record of accumulation and expenditure, providing a transparent history of transactions for users.
Architecture

### Database Schema:

Utilizes MongoDB for storing data with schemas for users, toys, transactions, and tokens. MongoDB's flexibility with schema design allows for easy adjustments and scaling.
Relations are managed through references in documents, ensuring data integrity and efficient retrievals.

### API Endpoints:

Provides comprehensive endpoints for user interactions with toys and tokens, including APIs for creating, retrieving, updating, and deleting toy listings, as well as managing token transactions.
Each main entity (user, toy, token) has endpoints dedicated to typical CRUD operations, supplemented with search and filter capabilities to enhance user experience.
Security and Data Integrity:

Implements security best practices, including password hashing with bcrypt and JWT for user authentication.
Uses database indexing to enhance the performance and integrity of queries, especially for user and toy lookups.
