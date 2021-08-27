
const api = require('./src/router')


api.listen(process.env.PORT || 8000, () =>
    console.log('server listening on port 8000')
)