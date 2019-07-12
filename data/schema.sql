DROP TABLE IF EXISTS weathers;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS yelps;

-- this.search_query = locationName;
-- this.formatted_query = result.body.results[0].formatted_address;
-- this.latitude = result.body.results[0].geometry.location.lat;
-- this.longitude = result.body.results[0].geometry.location.lng;

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
    created_time VARCHAR(255), 
    location_id INTEGER NOT NULL,
    FOREIGN KEY (location_id) REFERENCES locations (id)
  );
  
  CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  link TEXT,
  name VARCHAR(255),
  event_date VARCHAR(255),
  summary TEXT,
  created_time VARCHAR(255), 
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
  created_time VARCHAR(255), 
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
