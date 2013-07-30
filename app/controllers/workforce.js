
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , async = require('async')
  , Workforce = mongoose.model('Workforce')
  , _ = require('underscore')

/**
 * Find workforce by id
 */

exports.workforce = function(req, res, next, id){

  Workforce.load(id, function (err, workforce) {
    if (err) return next(err)
    if (!workforce) return next(new Error('Failed to load workforce ' + id))
    req.workforce = workforce
    next()
  })
}

/**
 * New workforce
 */

exports.new = function(req, res){
  res.render('workforce/new', {
    title: 'New workforce',
    workforce: new Workforce({})
  })
}

/**
 * Create an workforce
 */

exports.create = function (req, res) {
  var workforce = new Workforce(req.body)

  workforce.save( function (err) {
    if (err) {
      res.render('workforce/new', {
        title: 'New Workforce',
        workforce: workforce,
        errors: err.errors
      })
    }
    else {
      res.redirect('/workforce')
    }
  })
}

/**
 * Edit an workforce
 */

exports.edit = function (req, res) {
  res.render('workforce/edit', {
    title: 'Edit '+req.workforce.title,
    workforce: req.workforce
  })
}

/**
 * Update workforce
 */

exports.update = function(req, res){
  var workforce = req.workforce
  workforce = _.extend(workforce, req.body)

  workforce.save( function(err) {
    if (err) {
      res.render('workforce/edit', {
        title: 'Edit Workforce',
        workforce: workforce,
        errors: err.errors
      })
    }
    else {
      res.redirect('/workforce')
    }
  })
}

/**
 * View an workforce
 */

exports.show = function(req, res){
  res.render('workforce/show', {
    title: req.workforce.title,
    workforce: req.workforce
  })
}

/**
 * Delete an workforce
 */

exports.destroy = function(req, res){
  var workforce = req.workforce
  workforce.remove(function(err){
    // req.flash('notice', 'Deleted successfully')
    res.redirect('/workforce')
  })
}

/**
 * List of workforce
 */

exports.index = function(req, res){
  var page = req.param('page') > 0 ? req.param('page') : 0
  var perPage = 5
  var options = {
    perPage: perPage,
    page: page
  }

  Workforce.list(options, function(err, workforces) {
    if (err) return res.render('500')
    Workforce.count().exec(function (err, count) {
      res.render('workforce/index', {
        title: 'List of Workforce',
        workforces: workforces,
        page: page,
        pages: count / perPage
      })
    })
  })
}
