import pg from 'pg';
const { Pool } = pg;
export const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
console.log("POSTGRES_URL FROM NODE:", process.env.POSTGRES_URL);
