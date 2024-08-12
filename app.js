const mysql = require('mysql2');
const fs = require('fs');
const readline = require('readline');
const cliProgress = require('cli-progress');

// Function to prompt user for input
function prompt(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => rl.question(question, (ans) => {
        rl.close();
        resolve(ans);
    }));
}

// Function to execute SQL file
async function executeSQLFile(connection, filePath) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath, 'utf8');
        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

        stream.on('error', (err) => reject(err));

        let query = '';
        let startTime = Date.now();

        const rl = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            // Ignore comments and empty lines
            if (line.startsWith('--') || line.startsWith('/*') || line.trim() === '') {
                return;
            }

            query += line;
            if (line.trim().endsWith(';')) {
                connection.query(query, (err) => {
                    if (err) reject(err);
                });
                query = '';
                bar.increment();
            }
        });

        rl.on('close', () => {
            const endTime = Date.now();
            const timeTaken = (endTime - startTime) / 1000;
            bar.stop();
            resolve(timeTaken);
        });

        // Counting total lines for progress bar
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            const totalLines = data.split('\n').filter(line => !line.startsWith('--') && !line.startsWith('/*') && line.trim() !== '').length;
            bar.start(totalLines, 0);
        });
    });
}


(async () => {
    try {
        const host = await prompt('Enter MySQL host: ');
        const user = await prompt('Enter MySQL user: ');
        const password = await prompt('Enter MySQL password: ');
        const database = await prompt('Enter database name: ');
        const filePath = await prompt('Enter path to .sql file: ');

        const connection = mysql.createConnection({
            host,
            user,
            password,
            database
        });

        connection.connect((err) => {
            if (err) throw err;
            console.log('Connected to MySQL server.');
        });

        console.log('Starting to import SQL file...');
        const timeTaken = await executeSQLFile(connection, filePath);
        console.log(`SQL file imported successfully in ${timeTaken} seconds.`);

        connection.end();
    } catch (err) {
        console.error('An error occurred:', err.message);
    }
})();
