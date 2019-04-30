DROP DATABASE if EXISTS charts;

CREATE DATABASE charts;

\connect charts;

CREATE TABLE stocks (
  id INT NOT NULL,
  stockid VARCHAR(30) NOT NULL,
  stockcompany VARCHAR(255) NOT NULL,
  averagestock DECIMAL NOT NULL,
  changepercent DECIMAL NOT NULL,
  noofowners INT NOT NULL,
  recommendationpercent DECIMAL NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE tags (
  tagid SERIAL,
  id INT NOT NULL,
  relatedtags VARCHAR(30) NOT NULL,
  PRIMARY KEY (tagid)
);

CREATE TABLE day (
  dayid SERIAL,
  id INT NOT NULL,
  priceid VARCHAR(30) NOT NULL,
  day DECIMAL NOT NULL,
  PRIMARY KEY (dayid)
);

CREATE TABLE weeks (
  weekid SERIAL,
  id INT NOT NULL,
  priceid VARCHAR(30) NOT NULL,
  week DECIMAL NOT NULL,
  PRIMARY KEY (weekid)
);

CREATE TABLE months (
  monthid SERIAL,
  id INT NOT NULL,
  priceid VARCHAR(30) NOT NULL,
  month DECIMAL NOT NULL,
  PRIMARY KEY (monthid)
);

CREATE TABLE threemonths (
  threemonthid SERIAL,
  id INT NOT NULL,
  priceid VARCHAR(30) NOT NULL,
  threemonth DECIMAL NOT NULL,
  PRIMARY KEY (threemonthid)
);

CREATE TABLE years (
  yearid SERIAL,
  id INT NOT NULL,
  priceid VARCHAR(30) NOT NULL,
  year DECIMAL NOT NULL,
  PRIMARY KEY (yearid)
);

CREATE TABLE fiveyear (
  fiveyearid SERIAL,
  id INT NOT NULL,
  priceid VARCHAR(30) NOT NULL,
  fiveyear DECIMAL NOT NULL,
  PRIMARY KEY (fiveyearid)
);

\copy stocks ("id","stockid","stockcompany","averagestock","changepercent","noofowners","recommendationpercent") from '/Users/macbookpro/documents/hr/sdc/chart_module/database/stocksticker.csv' DELIMITER ',' CSV HEADER
\copy tags ("id","relatedtags") from '/Users/macbookpro/documents/hr/sdc/chart_module/database/stockstags.csv' DELIMITER ',' CSV HEADER
\copy day ("id","priceid","day") from '/Users/macbookpro/documents/hr/sdc/chart_module/database/stocksday.csv' DELIMITER ',' CSV HEADER
\copy weeks ("id","priceid","week") from '/Users/macbookpro/documents/hr/sdc/chart_module/database/stocksweek.csv' DELIMITER ',' CSV HEADER
\copy months ("id","priceid","month") from '/Users/macbookpro/documents/hr/sdc/chart_module/database/stocksmonth.csv' DELIMITER ',' CSV HEADER
\copy threemonths ("id","priceid","threemonth") from '/Users/macbookpro/documents/hr/sdc/chart_module/database/stocksthreemonth.csv' DELIMITER ',' CSV HEADER
\copy years ("id","priceid","year") from '/Users/macbookpro/documents/hr/sdc/chart_module/database/stocksyear.csv' DELIMITER ',' CSV HEADER
\copy fiveyear ("id","priceid","fiveyear") from '/Users/macbookpro/documents/hr/sdc/chart_module/database/stocksfiveyear.csv' DELIMITER ',' CSV HEADER

-- psql -U macbookpro -d charts -a -f pg.sql


SELECT *
FROM stocks
INNER JOIN day
ON stocks.id = day.id
INNER JOIN weeks
ON stocks.id = weeks.id
INNER JOIN months
ON stocks.id = months.id
INNER JOIN threemonths
ON stocks.id = threemonths.id
INNER JOIN years
ON stocks.id = years.id
INNER JOIN fiveyear
ON stocks.id = fiveyear.id
WHERE stocks.id = 100;


SELECT *
FROM stocks
INNER JOIN day
ON stocks.id = day.id
INNER JOIN fiveyear
ON stocks.id = fiveyear.id
WHERE stocks.id = 100;
