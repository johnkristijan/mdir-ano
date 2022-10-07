# mdir-ano
Henter data fra Miljødirektoratet:ANO databasen i bolker og transformerer til egnet format for PowerBI rapport

## requirements
node 16+

## setup
open console and navigate to this folder
and do a `npm install`

## start script
start server: `npm run start`

now it is serving locally on port 1337,
open PowerBI and connect to this url:
`http://localhost:1337/v1/ano` <-- without fylke
`http://localhost:1337/v2/ano` <-- with fylke

## credits
thanks to Erik Smistad for providing this:
https://www.eriksmistad.no/norges-fylker-og-kommuner-i-geojson-format/

