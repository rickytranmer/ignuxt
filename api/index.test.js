process.env.NODE_ENV = 'test'

const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')
// const config = require('../nuxt.config')
const port = process.env.PORT || 3000
let server

require('dotenv').config()
chai.use(chaiHttp)


testFile('index')
testFile('index.min')


function testFile(fileName) {
  const api = require(`./${fileName}`)

  describe(`${api.path.toUpperCase()}\t*${fileName}.js*`, function() {
    const listenClose = ()=> {
      before(()=> server = api.handler.listen(port))
      after(()=> server.close())
    }
    // const blank = ()=> after(()=> console.log())

    describe('Description:', function(params) {
      listenClose()

      before(async function() {
        res = await chai.request(api.handler)
          .get('/test')
      });

      it('test 1', function(done) {
        assert.equal(res.status, 200)
        done()
      })
    })
  })
}
