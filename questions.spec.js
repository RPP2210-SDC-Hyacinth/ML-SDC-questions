const request = require('supertest');
const app = require('./server/index.js')


describe('initializes test suite', function() {
  test('1 + 1', function() {
    expect(1 + 1).toEqual(2)
  })
})

describe('GET /qa/questions', () => {
  test('should respond with a 200 status code', () => {
    const response =  request(app).get('/qa/questions')
    .end((err, res) => {
      expect(response.statusCode).toBe(200)
      })
  })
  test('should retrieve first 5 questions per product id', () => {
    const response =  request(app).get('/qa/questions')
    .end((err, res) => {
      expect(res.body.length).to.equal(5);
    })
  })
  test('should return results as an object', () => {
    const response =  request(app).get('/qa/questions')
    .end((err, res) => {
      expect(typeof res.body).toBe('object');
    })
  })
})