## EMPLOYEE REGISTRY APP

### Requirements

- Programming languages: [TypeScript](https://www.typescriptlang.org/)
- Database: [MongoDB](https://www.mongodb.com/)
- Frameworks: [React](https://reactjs.org/), [Mongoose](https://mongoosejs.com/), [react-query](https://tanstack.com/query/v4), [Redux](https://redux.js.org/), [Ant Design](https://ant.design/), [Express.js](https://expressjs.com/)

### Get started

1. #### to build image for frontend :
   `docker build --file=frontend/frontend.dockerfile -t amz-frontend .`
2. #### to build image for backend :
   `docker build --file=backend/backend.dockerfile -t amz-backend .`
3. #### to run whole app
   `docker compose -f docker-compose.yml up`

### Features

1.  Without `CHEF` access:

    - Employee must create an account and login to app
    - Employee can view another employee pages and leave comment

2.  With `CHEF` access:

- **With Docker:** Using MongoDB admin interface

      - open http://localhost:8081/
      - username: chef
      - password: 123456
      - edit the ROLE of the user to `CHEF`<br>

- **With MongoDB Compass:** Using MongoDB Compass edit the ROLE of the user to `CHEF`

  - All features above
  - Edit and Delete employee account
  - Create an account for another employee
  - Import employees over a CSV file<br>

### Testing (TODO: bump test coverage)

1. #### Backend

   - Pending...

2. #### Frontend
   - `yarn test`
