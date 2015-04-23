'use strict'

var glob = require('glob')
var Path = require('path')
var cwd = process.cwd()

module.exports = function(sequelize, patterns) {

  if (!Array.isArray(patterns)) {
    patterns = [patterns]
  }

  // find files using glob
  var files = patterns.reduce(function(arr, pattern) {
    return arr.concat(glob.sync(pattern, {nodir:true}))
  }, [])

  // import models found by glob
  var db = files.reduce(function(db, file) {
    var filepath = Path.join(cwd, file)
    var model = sequelize.import(filepath)
    db[model.name] = model
    return db
  }, {})

  // create associations
  Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db)
    }
  })

  return db
}
