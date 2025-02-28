### How to setup and connect to the database:

1. Install and download PostgreSQL and pgAdmin 4 to manage the database.
2. Integrate a database with node.js
3. Generate `.env` folder at the root of the project to add all required configrations for connecting to the database
4. Test the connection to ensure it’s working

### what ports the backend and database are running on

- The **backend** port running on poer `3000`
- The **database** running on port `5432`

### package installation instructions

###### packages with brief description for each

- express: **A web framework for node.js**
- typescript: **TypeScript language support**
- pg: **Interact with a PostgreSQL database**
- jasmine: **For testing endpoints and database**
- jsonwebtoken: **For authentication**
- dcrypt: **To hash and compare passwords securely**
- db-migrate: **To manage database schema changes**
- dotenv: **Loads environment variables**

### Environment variables

- POSTGRES_HOST = 127.0.0.1
- POSTGRES_DB = store
- POSTGRES_TEST_DB = store_test
- POSTGRES_USER = postgres
- POSTGRES_PASSWORD = S@zeer123
- ENV=dev
- BCRYPT_PASSWORD=speak-firend-and-enter
- SALT_ROUNDS=10
- TOKEN_SECRET=tokenSecret!
