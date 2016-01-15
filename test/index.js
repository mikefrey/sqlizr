var test = require('tape').test
var sqlizr = require('..')

test('sqlizr', function(t) {

  t.test('exists', function(t) {
    t.equal(typeof sqlizr, 'function', 'sqlizr should be a function.')
    t.end()
  })

  t.test('calls import on found files, relative paths', function(t) {
    var m = process.cwd() + '/test/models/model-a.js'
    var s = { import: function(path) {
      t.equal(path, m, 'Path should be ' + m)
      return { name: 'a' }
    }}
    sqlizr(s, 'test/models/**/*-a.js')
    t.end()
  })

  t.test('calls import on found files, absolute paths', function(t) {
    var m = process.cwd() + '/test/models/model-a.js'
    var s = { import: function(path) {
      t.equal(path, m, 'Path should be ' + m)
      return { name: 'a' }
    }}
    sqlizr(s, process.cwd() + '/test/models/**/*-a.js')
    t.end()
  })

  t.test('returned models should be added to result', function(t) {
    var i = 0
    var m = process.cwd() + '/test/models/model-a.js'
    var s = { import: function(path) {
      return { name: 'Model' + i++ }
    }}
    var db = sqlizr(s, 'test/models/**/*.js')

    t.equal(db.Model0.name, 'Model0', 'Model0 should be a member of db')
    t.equal(db.Model1.name, 'Model1', 'Model1 should be a member of db')
    t.end()
  })

  t.end()
})
