const bp = require('body-parser')
const cs = require('cors')

module.exports = app => {
    app.use(bp.json())
    app.use(cs())
}


 