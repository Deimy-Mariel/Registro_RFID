import {createPool} from 'mysql2/promise';

const pool = createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'mysql1234567890.com',
    database: 'registrouniversidad'
});

export default pool;