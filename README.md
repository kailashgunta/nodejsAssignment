# Personal Expense Tracker

## Setup and Run Instructions

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Start the server using `npm start`.
4. The API will be running at `http://localhost:3000/api`.

### API Endpoints

- **POST /api/transactions**: Add a new transaction.
- **GET /api/transactions**: Retrieve all transactions.
- **GET /api/transactions/:id**: Retrieve a specific transaction by ID.
- **PUT /api/transactions/:id**: Update a transaction by ID.
- **DELETE /api/transactions/:id**: Delete a transaction by ID.
- **GET /api/summary**: Retrieve a summary of all transactions (total income, expenses, and balance).
