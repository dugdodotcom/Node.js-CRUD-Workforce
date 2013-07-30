
var mongoose = require('mongoose')
  , Workforce = mongoose.model('Workforce')
  , async = require('async')

module.exports = function (app, passport, auth) {

  // article routes
  var workforce = require('../app/controllers/workforce')
  app.get('/workforce', workforce.index)
  app.get('/workforce/new',  workforce.new)
  app.post('/workforce',  workforce.create)
  app.get('/workforce/:id', workforce.show)
  app.get('/workforce/:id/edit',  workforce.edit)
  app.put('/workforce/:id',  workforce.update)
  app.del('/workforce/:id',  workforce.destroy)

  app.param('id', workforce.workforce)

  // home route
  app.get('/', workforce.index)


}
