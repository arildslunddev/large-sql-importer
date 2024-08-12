
# Large SQL Importer

A Node.js application for importing large `.sql` files into a remote MySQL database. This script reads and executes SQL commands from a file, showing progress and the time taken to complete the import.

## Features

- Connects to a remote MySQL database using user-provided credentials.
- Streams a large `.sql` file line by line to prevent memory overflow.
- Ignores comments and empty lines in the SQL file.
- Displays a progress bar during the import process.
- Shows the time taken to complete the import or any errors that occur.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/large-sql-importer.git
   cd large-sql-importer
   ```

2. Install the required npm packages:

   ```bash
   npm install
   ```

## Usage

1. Run the application:

   ```bash
   node app.js
   ```

2. Follow the prompts to enter your MySQL credentials, database name, and the path to your `.sql` file.

3. The application will display the progress of the import and notify you once it's completed.

## Example

```bash
Enter MySQL host: example.com
Enter MySQL user: myuser
Enter MySQL password: ********
Enter database name: mydatabase
Enter path to .sql file: /path/to/your/file.sql
Starting to import SQL file...
Connected to MySQL server.
SQL file imported successfully in 42.37 seconds.
```

## Error Handling

If there is an error in the SQL file (e.g., syntax error), the application will display the error message and stop the import process. Please ensure that your `.sql` file is correctly formatted.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## Acknowledgments

- [mysql2](https://www.npmjs.com/package/mysql2)
- [readline](https://nodejs.org/api/readline.html)
- [cli-progress](https://www.npmjs.com/package/cli-progress)

## Contact

For any questions or suggestions, feel free to open an issue or contact me at tommy@arildslund.dev.
