import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pool } from 'pg';

@Injectable({
    providedIn: 'root',
})
export class DatabaseService {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            connectionString: process.env['POSTGRES_URL'], // Load from your environment
        });
        console.log('this.pool', this.pool);
    }

    async getAllFromTbl1() {
        const client = await this.pool.connect();
        try {
            const res = await client.query('SELECT * FROM public.tbl1 ORDER BY id ASC');
            return res.rows;
        } finally {
            client.release();
        }
    }



    async query(sql: string, params?: any[]): Promise<any[]> {
        const pool = new Pool({ connectionString: process.env['POSTGRES_URL'] });

        try {
            const client = await pool.connect();
            const result = await client.query(sql, params);
            client.release();
            return result.rows;
        } catch (err) {
            console.error('Error querying database:', err);
            throw err; // Re-throw for handling in your component
        } finally {
            await pool.end(); // Close the pool when finished
        }
    }
}
