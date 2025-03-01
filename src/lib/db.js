import mysql from 'mysql2/promise';

// Create a connection pool
let connection;
export const createConnection = async () => {
    if(!connection){
        connection = await mysql.createConnection({
                            host: 'localhost', // Replace with your database host
                            user: 'root', // Replace with your database user
                            password: 'MySQL#Admin!2025', // Replace with your database password
                            database: 'property_booking', // Replace with your database name
                          });
    }
     return connection;
}



