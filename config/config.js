module.exports = {
    development: {
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: 'Nodejs CRUD'
      },
      db: 'mongodb://localhost/work'
    }
  , test: {

    }
  , production: {

    }
}
