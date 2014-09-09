module.exports = extrapolate

var requiredFields = [ '_id', 'parent' ]

/*
 * Extrapolate some actual section ids from a description of desired sections,
 * given a section service and the current section id.
 */
function extrapolate(sectionService, currentSectionId, desiredSections, cb) {

  var sectionIds = []

  // Get all of the publicly available sections
  sectionService.findPublic({}, { fields: requiredFields }, function (err, sections) {

    if (err) return cb(err)

    desiredSections.forEach(function (desiredSection) {

      // Find the actual section from the desired section's id.
      // If the id is '-1' then it means the current section.
      var section = desiredSection.id === '-1'
        ? { _id: currentSectionId }
        : findSectionById(sections, desiredSection.id)

      // If the section doesn't exist, don't add its id
      if (!section) return

      sectionIds.push(section._id)

      // If the section's sub sections are not desired, stop
      if (!desiredSection.includeSubSections) return

      sectionIds = sectionIds.concat(getSubSectionIds([], section._id, sections))

    })

    cb(null, sectionIds)

  })

  /*
   * Add to an array of section ids the ids of sections that are
   * sub-sections of the given section id.
   */
  function getSubSectionIds(ids, id, sections) {
    var subSections = sectionService.getChildSections(id, sections)
    subSections.forEach(function (subSection) {
      ids.push(subSection._id)
      if (subSection.subItems.length) getSubSectionIds(ids, subSection._id, sections)
    })
    return ids
  }

  /*
   * Get the section with a given id from an array of sections
   */
  function findSectionById(sections, id) {
    return sections.filter(function (section) {
      return section._id === id
    })[0]
  }

}
