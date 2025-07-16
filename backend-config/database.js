// Database Configuration for SQL Server
const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT) || 1433,
  database: process.env.DB_NAME || 'BloodSupportDb',
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: false, // Set to true if using Azure SQL
    trustServerCertificate: true, // Set to true for local dev
    enableArithAbort: true,
    connectionTimeout: 60000,
    requestTimeout: 60000
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

class Database {
  constructor() {
    this.pool = null;
  }

  async connect() {
    try {
      if (this.pool) {
        return this.pool;
      }

      console.log('Connecting to SQL Server...');
      this.pool = await sql.connect(dbConfig);
      
      console.log('✅ Connected to SQL Server successfully');
      return this.pool;
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.pool) {
        await this.pool.close();
        this.pool = null;
        console.log('📴 Disconnected from SQL Server');
      }
    } catch (error) {
      console.error('❌ Error disconnecting from database:', error.message);
    }
  }

  async query(queryString, params = {}) {
    try {
      const pool = await this.connect();
      const request = pool.request();

      // Add parameters to request
      Object.keys(params).forEach(key => {
        request.input(key, params[key]);
      });

      const result = await request.query(queryString);
      return result;
    } catch (error) {
      console.error('❌ Database query failed:', error.message);
      throw error;
    }
  }

  async execute(procedureName, params = {}) {
    try {
      const pool = await this.connect();
      const request = pool.request();

      // Add parameters to request
      Object.keys(params).forEach(key => {
        request.input(key, params[key]);
      });

      const result = await request.execute(procedureName);
      return result;
    } catch (error) {
      console.error('❌ Stored procedure execution failed:', error.message);
      throw error;
    }
  }

  // Helper method for transactions
  async executeTransaction(operations) {
    const pool = await this.connect();
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();

      const results = [];
      for (const operation of operations) {
        const request = new sql.Request(transaction);
        
        // Add parameters if provided
        if (operation.params) {
          Object.keys(operation.params).forEach(key => {
            request.input(key, operation.params[key]);
          });
        }

        const result = await request.query(operation.query);
        results.push(result);
      }

      await transaction.commit();
      return results;
    } catch (error) {
      await transaction.rollback();
      console.error('❌ Transaction failed:', error.message);
      throw error;
    }
  }

  // Health check method
  async healthCheck() {
    try {
      const result = await this.query('SELECT 1 as health');
      return result.recordset.length > 0;
    } catch (error) {
      return false;
    }
  }

  // Get database info
  async getDatabaseInfo() {
    try {
      const result = await this.query(`
        SELECT 
          DB_NAME() as DatabaseName,
          @@VERSION as ServerVersion,
          GETDATE() as CurrentTime
      `);
      return result.recordset[0];
    } catch (error) {
      console.error('❌ Failed to get database info:', error.message);
      throw error;
    }
  }
}

// Export singleton instance
const database = new Database();
module.exports = database;
