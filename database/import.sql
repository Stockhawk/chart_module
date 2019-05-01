\connect charts;

DROP TABLE IF EXISTS day2;

CREATE TABLE day2 (
  dayid SERIAL,
  id INT NOT NULL,
  priceid VARCHAR(30) NOT NULL,
  day DECIMAL NOT NULL,
  PRIMARY KEY (dayid)
);

-- psql -U postgres -d charts -a -f pg.sql