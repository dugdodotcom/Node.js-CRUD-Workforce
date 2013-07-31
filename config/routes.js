
var mongoose = require('mongoose')
  , Workforce = mongoose.model('Workforce')
  , User = mongoose.model('User')
  , async = require('async')

module.exports = function (app, passport, auth) {

	// user routes
  var users = require('../app/controllers/users')
  app.get('/login', users.login)
  // delete or comment this after signup the admin
  app.get('/signup', users.signup)
  // end delete
  app.get('/logout', users.logout)
  app.post('/users', users.create)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid email or password.'}), users.session)
  

  app.param('userId', users.user)

  // article routes
  var workforce = require('../app/controllers/workforce')
  app.get('/workforce',auth.requiresLogin, workforce.index)
  app.get('/workforce/new',auth.requiresLogin,  workforce.new)
  app.post('/workforce',auth.requiresLogin,  workforce.create)
  app.get('/workforce/:id',auth.requiresLogin, workforce.show)
  app.get('/workforce/:id/edit',auth.requiresLogin,  workforce.edit)
  app.put('/workforce/:id',auth.requiresLogin,  workforce.update)
  app.del('/workforce/:id',auth.requiresLogin,  workforce.destroy)

  app.param('id', workforce.workforce)



  // home route
  app.get('/',auth.requiresLogin, workforce.index)


}
