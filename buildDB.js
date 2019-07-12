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
    DROP TABLE IF EXISTS locations;
    DROP TABLE IF EXISTS weathers;
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS yelps;
    
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
        created_time INTEGER,
        location_id INTEGER NOT NULL,
        FOREIGN KEY (location_id) REFERENCES locations (id)
      );

    CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        link TEXT,
        name VARCHAR(255),
        event_date VARCHAR(255),
        summary TEXT,
        created_time INTEGER,
        location_id INTEGER NOT NULL,
        FOREIGN KEY (location_id) REFERENCES locations (id)
      );
      CREATE TABLE movies (
        id SERIAL PRIMARY KEY,
        title TEXT,
        overview TEXT,
        average_votes TEXT,
        total_votes TEXT,
        image_url TEXT,
        popularity TEXT,
        released_on TEXT,
        created_time INTEGER,
        location_id INTEGER NOT NULL,
        FOREIGN KEY (location_id) REFERENCES locations (id)
      );
      CREATE TABLE yelps ( 
        id SERIAL PRIMARY KEY, 
        name VARCHAR(255), 
        image_url TEXT, 
        price VARCHAR(255),
        rating VARCHAR(255),
        url TEXT,
        created_time VARCHAR(255),
        location_id INTEGER NOT NULL,
        FOREIGN KEY (location_id) REFERENCES locations (id)
      );
    `)
    console.log('build complite')
}

buildDB();
