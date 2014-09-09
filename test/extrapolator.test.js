var extrapolate = require('../')
  , sectionService = require('./mock-section-service')
  , assert = require('assert')

describe('Section Extrapolator', function () {

  it('should deal with an empty list of desired sections', function (done) {
    extrapolate(sectionService, '1', [], function (err) {
      if (err) return done(err)
      done()
    })
  })

  it('should extrapolate child section ids from a desired section when includeSubSections=true', function (done) {
    extrapolate(sectionService, '1', [ { id: '3', includeSubSections: true } ], function (err, ids) {
      if (err) return done(err)
      assert.deepEqual(ids, [ '3', '3a', '3ai', '3aii', '3aiii' ])
      done()
    })
  })

  it('should deal with non-existent (or non-public) sections', function (done) {
    extrapolate(sectionService, '1', [ { id: '10' } ], function (err, ids) {
      if (err) return done(err)
      assert.equal(ids.length, 0)
      done()
    })
  })

  it('should not extrapolate child section ids from a desired section when includeSubSections=false', function (done) {
    extrapolate(sectionService, '1', [ { id: '4b', includeSubSections: false } ], function (err, ids) {
      if (err) return done(err)
      assert.equal(ids.length, 1)
      done()
    })
  })

  it('should inject the current section id when the special value id="-1" is met', function (done) {
    extrapolate(sectionService, '1', [ { id: '-1' } ], function (err, ids) {
      if (err) return done(err)
      assert.deepEqual(ids, [ '1' ])
      done()
    })
  })

  it('should extrapolate sub sections of the current section when the special value id="-1" is met', function (done) {
    extrapolate(sectionService, '4', [ { id: '-1', includeSubSections: true } ], function (err, ids) {
      if (err) return done(err)
      assert.deepEqual(ids, [ '4', '4a', '4ai', '4b', '4bi', '4c', '4ci' ])
      done()
    })
  })

})
