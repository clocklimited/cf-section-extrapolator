# cf-section-extrapolator

**This module supercedes [cf-sectionizer](https://github.com/clocklimited/cf-sectionizer).**

Take a list describing a set of sections and callback with a list of actual section ids.

## Installation

    npm install --save cf-section-extrapolator

## API

### var extrapolate = require('cf-section-extrapolator')

### extrapolate(sectionService, currentSectionId, desiredSections, options={}, cb)

- `sectionService` is a service that has a `findPublic(query, cb)` method
- `currentSectionId` is the stringy id of the current section
- `desiredSections` is a list describing which sections are desired, in the format: `[ { id: 'section-id-123', includeSubSections: true|false } ]`. Using the
special case of `id='-1'` the `currentSectionId` will be used.

If this doesn't make sense, read the usage notes below. Hopefully all will become clear.

## Usage

```js
var desiredSections =
  [ { id: '123', includeSubSections: true }
  , { id: '456', includeSubSections: false }
  ]
```

Given the section hierarchy:

```
Sport(id:123)
- Football(id:123a)
-- Premier League(id:123ai)
-- World Cup(id:123aii)
- Tennis(id:123b)
-- Wimbledon(id:123bi)
-- French Open(id:123bii)
Entertainment(id:456)
- Theatre(id:456a)
- TV(id:456b)
- Film(id:456c)
```

Will callback with an array:

```js
sectionize(sectionService, currentSectionId, desiredSections, function (err, ids) {
  // ids == [ '123', '123a', '123ai', '123aii'
  //        , '123b' , '123bi', '123bii', '456' ]
})
```

### Special case

The section id of `-1` is treated as a `{CURRENT}` section mapping. Rather than knowing the section
id at the time of list creation, the 'current' section can be injected when the list is being aggregated
so that it can include contextual content based on where it is used.

```js
var currentSectionId = '789'
  , desiredSections = [ { id: '-1', includeSubSections: false } ]
sectionize(sectionService, currentSectionId, desiredSections, function (err, ids) {
  // ids == [ '789' ]
})
```

## Options

##### ensurePublic

Type: `boolean`
Default: `true`

Determines whether the section lookup is performed as a `findPublic` or a `find`.

## Credits
Built by developers at [Clock](http://clock.co.uk).

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
