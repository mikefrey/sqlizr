var test = require('tape').test
var sqlizr = require('..')

test('sqlizr', function(t) {

  t.test('exists', function(t) {
    t.equal(typeof sqlizr, 'function', 'sqlizr should be a function.')
    t.end()
  })

  t.test('calls import on found files', function(t) {
    var m = process.cwd() + '/test/models/model-a.js'
    var s = { import: function(path) {
      t.equal(path, m, 'Path should be ' + m)
      return { name: 'a' }
    }}
    sqlizr(s, 'test/models/**/*-a.js')
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

// test("make sure the thingie is a thing", function (t) {
//   t.equal(thingie, "thing", "thingie should be thing")
//   t.deepEqual(array, ["foo", "bar"], "array has foo and bar elements")
//   t.strictDeepEqual(object, {foo: 42, bar: "thingie"}, "object has foo (Number) and bar (String) property")
//   t.type(thingie, "string", "type of thingie is string")
//   t.ok(true, "this is always true")
//   t.notOk(false, "this is never true")
//   t.test("a child test", function (t) {
//     t.equal(this, superEasy, "right!?")
//     t.similar(7, 2, "ever notice 7 is kinda like 2?", {todo: true})
//     t.test("so skippable", {skip: true}, function (t) {
//       t.plan(1) // only one test in this block
//       t.ok(true, "but when the flag changes, it'll pass")
//       // no need to end, since we had a plan.
//     })
//     t.end()
//   })
//   t.ok(99, "can also skip individual assertions", {skip: true})
//   // end lets it know it's over.
//   t.end()
// })
// test("another one", function (t) {
//   t.plan(1)
//   t.ok(true, "It's ok to plan, and also end.  Watch.")
//   t.end() // but it must match the plan!
// })