const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

function buildDB(){
    client.query(`
    DROP TABLE IF EXISTS weathers;
    DROP TABLE IF EXISTS locations;
    
    CREATE TABLE locations (
      id SERIAL PRIMARY KEY,
      search_query VARCHAR(255),
      formatted_query VARCHAR(255),
      latitude NUMERIC(10, 7),
      longitude NUMERIC(10,7)
    );
    
    CREATE TABLE weathers ( 
        id SERIAL PRIMARY KEY, 
        forecast VARCHAR(255), 
        time VARCHAR(255), 
        location_id INTEGER NOT NULL,
        FOREIGN KEY (location_id) REFERENCES locations (id)
      );
    `)
}

buildDB();