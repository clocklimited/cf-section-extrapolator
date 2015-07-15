var sectionFixtures = require('./section-fixtures')

module.exports =
{ findPublic: function (a, b, cb) {
    return cb(null, sectionFixtures.filter(function (fixture) {
      return fixture.visible
    }))
  }
, find: function (a, b, cb) {
    return cb(null, sectionFixtures)
  }
, getChildSections: function getChildSections(parent, sections, maxDepth, depth) {
    var items = []
    maxDepth = maxDepth ? maxDepth : 0

    sections.forEach(function (section) {
      var currentDepth = depth ? depth : 1
      if (section.parent === parent) {

        var item = section

        item.subItems = []

        if (maxDepth !== currentDepth) {
          item.subItems = getChildSections(section._id, sections, maxDepth, currentDepth + 1)
        }

        items.push(item)
      }
    })

    return items
  }
}
