## EMPLOYEE REGISTRY APP

### Requirements

- Programming languages: [TypeScript](https://www.typescriptlang.org/)
- Database: [MongoDB](https://www.mongodb.com/)
- Frameworks: [React](https://reactjs.org/), [Mongoose](https://mongoosejs.com/), [react-query](https://tanstack.com/query/v4), [Redux](https://redux.js.org/), [Ant Design](https://ant.design/), [Express.js](https://expressjs.com/)

### Get started (Open 2 terminals)

1. #### Database

   - create `.env` file in the root of `backend` folder
   - Variable: `PORT=2022`
   - Variable: `MONGO_URI=mongodb://localhost:27017/amazing-app`
   - Run [MongoDB Compass](https://www.mongodb.com/products/compass) in localhost

2. #### Backend
   - `cd backend` change directory to backend folder
   - `yarn` to install dependencies
   - `yarn start` to serve backend
3. #### Frontend
   - `cd frontend` change directory to frontend folder
   - `yarn` to install dependencies
   - `yarn start` to serve frontend

### Features

1.  Without `CHEF` access:

    - Employee must create an account and login to app
    - Employee can view another employee pages and leave comment

2.  With `CHEF` access: (_add `CHEF` role of employee in `MongoDB` to acctive `CHEF` access_ )

    - All features above
    - Edit and Delete employee account
    - Create an account for another employee
    - Import employees over a CSV file

### Testing (TODO: bump test coverage)

1. #### Backend

   - Pending...

2. #### Frontend
   - `yarn test`
