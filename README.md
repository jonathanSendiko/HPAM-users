# HPAM Users

This repository contains a backend service with authentication features and user management endpoints built using Node.JS, Express and Sequelize ORM.

## Installation and Setup

To set up the backend service locally, follow these steps:

1. Clone the repository using SSH:

```
git clone git@github.com:jonathanSendiko/HPAM-users.git
```

or using HTTPS

```
git clone https://github.com/jonathanSendiko/HPAM-users.git
```

2. Navigate to the project directory:

```
cd hpam-users
```

3. Install the dependencies using npm:

```
npm Install
```

or using yarn

```
yarn install
```

4. Configure the environment variables:

- Create a `.env` file in the root directory of the project.
- Add the following variables to the `.env` file and provide appropriate values:
  ```
  PORT=8008
  DB_HOST=your_db_host
  DB_USERNAME=your_db_username
  DB_PASSWORD=your_db_password
  DB_NAME=db_name
  SECRET_KEY=your_secret_access_key
  SECRET_REFRESH_KEY=your_secret_refresh_key
  ORIGIN_URL=your_cors_origin_url
  ```
- Replace `your_secret_access_key` and `your_secret_refresh_key` with a secure secret key for JSON Web Token (JWT) generation.
- Modify the `DB_xxx` with your PostgreSQL database connection string.
- Replace `your_cors_origin_url` with the url where the service will be fired from if necessary.

5. Start the server:

```
npm start
```

or

```
yarn start
```

The server should now be running on `http://localhost:${PORT}` depending on what you define on the `.env` file

## API Reference

### Authentication Endpoints

#### Register User

- Endpoint: `POST /auth/register`
- Description: Registers a new user with the provided name, email, and password. Returns the user_id along with access and refresh tokens.
- Request Body Example:

```json
{
  "name": "User's Name",
  "email": "user@example.com",
  "password": "user_password"
}
```

- Successful Response Body Example:

```json
{
  "success": true,
  "data": {
    "user_id": "unique_user_id",
    "token": {
      "access_token": "valid_access_token",
      "refresh_token": "valid_refresh_token"
    }
  },
  "error": null
}
```

- Error Response Body Example:

```json
{
  "success": false,
  "data": null,
  "error": "Error Message"
}
```

#### Login User

- Endpoint: `POST /auth/login`
- Description: Logs in an existing user using their email and password. Returns access and refresh tokens. User will not be able to login if the user's status is set to `false`
- Request Body Example:

```json
{
  "email": "user@example.com",
  "password": "user_password"
}
```

- Successful Response Body Example:

```json
{
  "success": true,
  "data": {
    "token": {
      "access_token": "valid_access_token",
      "refresh_token": "valid_refresh_token"
    }
  },
  "error": null
}
```

- Error Response Body Example:

```json
{
  "success": false,
  "data": null,
  "error": "Error Message"
}
```

#### Refresh User's Access

- Endpoint: `POST /auth/refresh`
- Description: Refreshes the access token using a valid refresh token.
- Request Body Example:

```json
{
  "refresh_token": "valid_refresh_token"
}
```

- Successful Response Body Example:

```json
{
  "success": true,
  "data": {
    "token": {
      "access_token": "valid_access_token"
    }
  },
  "error": null
}
```

- Error Response Body Example:

```json
{
  "success": false,
  "data": null,
  "error": "Error Message"
}
```

### User Management Endpoints

#### Get All Users

- Endpoint: `GET /users`
- Description: Retrieves information about all users while omitting the password field.
- Successful Response Body Example:

```json
{
  "success": true,
  "data": [
      {
          "id": 1
          "name":"user's name",
          "email":"user@example.com",
          "status": true,
          "role": "user"
      },
      {...}
  ]
  "error": null
}
```

- Error Response Body Example:

```json
{
  "success": false,
  "data": null,
  "error": "Error Message"
}
```

#### Get User by User ID

- Endpoint: `GET /users/:userId`
- Description: Retrieves information the user by their user ID
- Successful Response Body Example:

```json
{
  "success": true,
  "data": {
    "id": 1
    "name":"user's name",
    "email":"user@example.com",
    "status": true,
    "role": "user"
  },
  "error": null
}
```

- Error Response Body Example:

```json
{
  "success": false,
  "data": null,
  "error": "Error Message"
}
```

#### Update User by User ID

- Endpoint: `PATCH /users/:userId`
- Description: Update User's name, email and status
- Request Body Example:

```json
{
  "name": "User's Name",
  "email": "user@example.com",
  "status": true
}
```

- Successful Response will return:

```
204 No Content
```

- Error Response Body Example:

```json
{
  "success": false,
  "data": null,
  "error": "Error Message"
}
```

#### Delete User by User ID

- Endpoint: `DELETE /users/:userId`
- Description: Hard delete a user's record of data in DB
- Successful Response will return:

```
204 No Content
```

- Error Response Body Example:

```json
{
  "success": false,
  "data": null,
  "error": "Error Message"
}
```
