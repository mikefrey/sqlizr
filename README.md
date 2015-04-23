# sqlizr
Automatically load Sequelize models via glob pattern.

## Installation

```
npm i --save sqlizr
```

## Usage

Define a model somewhere that is ready for Sequelize#import.

```js
module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User', {
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
  })

  User.associate = function(db) {
    User.hasMany(db.Posts)
  }

  return User
}
```

```js
var sqlizr = require('sqlizr')

var sequelize = new Sequelize(...)

var db = sqlizr(sequelize, 'app/models/**/*.js')

db.User.find('mikefrey')
```

### Associations

If you define an `associate` function on your model definition, sqlizr will run that function
after all models have been loaded, passing in a hash of all loaded models for easy reference.

Setup any needed associations in the `associate` function, like shown in the example above.
