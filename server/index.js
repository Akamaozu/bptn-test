const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join( __dirname, '../.env' ) });

const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const popular_movies = require('./controllers/popular-movies.js');
let app_html;

app.use( express.static( path.join( __dirname, '../client/build' ) ) );

app.get( '/api/popular-movies', async function( req, res ){
  const page_to_get = ( req.query && req.query.page ) ? parseInt( req.query.page ) : 1;
  if( isNaN( page_to_get ) || page_to_get < 1 ) return res.status(400).json({ error: 'page must be a number greater than zero' });

  try {
    const { total_pages, total_results, signature } = await popular_movies.get_stats();
    if( page_to_get > total_pages ) return res.status(422).json({ error: 'page '+ page_to_get +' does not exist' });

    const result = await popular_movies.get_by_page( page_to_get );
    res.status(200).json( result );
  }

  catch( error ){
    res.sendStatus(500);
    console.log( 'action=log-route-error route='+ req.originalUrl + ' error='+ error.stack );
  }
});

app.get( '*', (req, res)=> {
  if( app_html ) res.send( app_html );
  else {
    const path_to_markup = path.join( __dirname, '../client/build/index.html' );
    fs.readFile( path_to_markup, 'utf8', ( error, html )=> {
      app_html = html;
      res.send( app_html );
    });
  }
});

app.listen( port, function(){
  console.log( 'action=listen-for-requests port='+ port );
});