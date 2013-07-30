
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema
  , crypto = require('crypto')

/**
 * Getters
 */

var getTags = function (tags) {
  return tags.join(',')
}

/**
 * Setters
 */

var setTags = function (tags) {
  return tags.split(',')
}

/**
 * Workforce Schema
 */

var WorkforceSchema = new Schema({
  name: {type : String, default : '', trim : true},
  handle: {type : String, default : '', trim : true},
  status: {type : String, default : '', trim : true},
  date  : {type : Date, default : Date.now},
  password: {type : String, default : '', trim : true}
})



WorkforceSchema
  .virtual('inpassword')
  .set(function(inpassword) {
    this._inpassword = inpassword
    this.password = this.encryptPassword(inpassword)
  })
  .get(function() { return this._inpassword })
  
/**
 * Validations
 */

WorkforceSchema.path('name').validate(function (name) {
  return name.length > 0
}, 'Workforce name cannot be blank')

WorkforceSchema.path('handle').validate(function (handle) {
  return handle.length > 0
}, 'Workforce handle cannot be blank')

WorkforceSchema.path('status').validate(function (status) {
  return status.length > 0
}, 'Workforce status cannot be blank')

WorkforceSchema.path('password').validate(function (password) {
  // if you are authenticating by any of the oauth strategies, don't validate
	return password.length > 0
}, 'Password cannot be blank')


/**
 * Methods
 */

WorkforceSchema.methods = {

  /**
   * Save article and upload image
   *
   * @param {Object} images
   * @param {Function} cb
   * @api public
   */

  uploadAndSave: function (images, cb) {
    
    var self = this

    
  },
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

 

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function(password) {
    if (!password) return ''
    return crypto.createHmac('sha1', "password").update(password).digest('hex')
  }

}

/**
 * Statics
 */

WorkforceSchema.statics = {

  /**
   * Find Workforce by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api public
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .exec(cb)
  },

  /**
   * List Workforce
   *
   * @param {Object} options
   * @param {Function} cb
   * @api public
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .sort({'date': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }

}

mongoose.model('Workforce', WorkforceSchema)
