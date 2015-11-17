# datomic-schema
Get an object representation of a datomic schema.

## Installation
```
npm install --save datomic-schema
```

## Schema Representation Format
```javascript
const schema = {
  Type: {
    attribute: {
      type: 'value type name',
      description: 'attribute doc',
      cardinality: 'one || many',
      index: true,
    },
  },
};
```

## Example
```javascript
import getSchema from 'datomic-schema';

getSchema('http://localhost:8001', 'dev/mbrainz-1968-1973')
  .then(schema => console.log(schema);
  // > { AbstractRelease:
  //    { type:
  //       { type: 'ref',
  //         description: 'Enum, one\\n  of: :release.type/album, :release.type/single, :release.type/ep, :release.type/audiobook,\\n  or :release.type/other',
  //         cardinality: 'one',
  //         index: true },
  //      gid:
  //       { type: 'uuid',
  //         description: 'The globally unique MusicBrainz ID for the abstract release',
  //         cardinality: 'one',
  //         index: true },
  //      artists:
  //       { type: 'ref',
  //         description: 'The set of artists contributing to the abstract release',
  //         cardinality: 'many',
  //         index: true },
  //      artistCredit:
  //       { type: 'string',
  //         description: 'The string represenation of the artist(s) to be credited on the abstract release',
  //         cardinality: 'one',
  //         index: true },
  //      name:
  //       { type: 'string',
  //         description: 'The name of the abstract release',
  //         cardinality: 'one',
  //         index: true } },
  //   Medium:
  //    { tracks:
  //       { type: 'ref',
  //         description: 'The set of tracks found on this medium',
  //         cardinality: 'many',
  //         index: true },
  //      trackCount:
  //       { type: 'long',
  //         description: 'The total number of tracks on the medium',
  //         cardinality: 'one',
  //         index: true },
  //      position:
  //       { type: 'long',
  //         description: 'The position of this medium in the release relative to the other media, i.e. disc 1',
  //         cardinality: 'one',
  //         index: true },
  //      name:
  //       { type: 'string',
  //         description: 'The name of the medium itself, distinct from the name of the release',
  //         cardinality: 'one',
  //         index: true },
  //      format:
  //       { type: 'ref',
  //         description: 'The format of the medium. An enum with lots of possible values',
  //         cardinality: 'one',
  //         index: true } },
  //   Release:
  //    { artists:
  //       { type: 'ref',
  //         description: 'The set of artists contributing to the release',
  //         cardinality: 'many',
  //         index: true },
  //      abstractRelease:
  //       { type: 'ref',
  //         description: 'This release is the physical manifestation of the\\n  associated abstract release, e.g. the the 1984 US vinyl release of\\n  "The Wall" by Columbia, as opposed to the 2000 US CD release of\\n  "The Wall" by Capitol Records.',
  //         cardinality: 'one',
  //         index: true },
  //      name:
  //       { type: 'string',
  //         description: 'The name of the release',
  //         cardinality: 'one',
  //         index: true },
  //      day:
  //       { type: 'long',
  //         description: 'The day of the release',
  //         cardinality: 'one',
  //         index: true },
  //      packaging:
  //       { type: 'ref',
  //         description: 'The type of packaging used in the release, an enum, one\\n  of: :release.packaging/jewelCase, :release.packaging/slimJewelCase, :release.packaging/digipak, :release.packaging/other\\n  , :release.packaging/keepCase, :release.packaging/none,\\n  or :release.packaging/cardboardPaperSleeve',
  //         cardinality: 'one',
  //         index: true },
  //      status:
  //       { type: 'string',
  //         description: 'The status of the release',
  //         cardinality: 'one',
  //         index: true },
  //      gid:
  //       { type: 'uuid',
  //         description: 'The globally unique MusicBrainz ID for the release',
  //         cardinality: 'one',
  //         index: true },
  //      month:
  //       { type: 'long',
  //         description: 'The month of the release',
  //         cardinality: 'one',
  //         index: true },
  //      year:
  //       { type: 'long',
  //         description: 'The year of the release',
  //         cardinality: 'one',
  //         index: true },
  //      artistCredit:
  //       { type: 'string',
  //         description: 'The string represenation of the artist(s) to be credited on the release',
  //         cardinality: 'one',
  //         index: true },
  //      media:
  //       { type: 'ref',
  //         description: 'The various media (CDs, vinyl records, cassette tapes, etc.) included in the release.',
  //         cardinality: 'many',
  //         index: true },
  //      country:
  //       { type: 'ref',
  //         description: 'The country where the recording was released',
  //         cardinality: 'one',
  //         index: true },
  //      barcode:
  //       { type: 'string',
  //         description: 'The barcode on the release packaging',
  //         cardinality: 'one',
  //         index: true } },
  //   Country:
  //    { name:
  //       { type: 'string',
  //         description: 'The name of the country',
  //         cardinality: 'one',
  //         index: true } },
  //   Track:
  //    { position:
  //       { type: 'long',
  //         description: 'The position of the track relative to the other tracks on the medium',
  //         cardinality: 'one',
  //         index: true },
  //      duration:
  //       { type: 'long',
  //         description: 'The duration of the track in msecs',
  //         cardinality: 'one',
  //         index: true },
  //      artists:
  //       { type: 'ref',
  //         description: 'The artists who contributed to the track',
  //         cardinality: 'many',
  //         index: true },
  //      name:
  //       { type: 'string',
  //         description: 'The track name',
  //         cardinality: 'one',
  //         index: true } },
  //   Artist:
  //    { startDay:
  //       { type: 'long',
  //         description: 'The day the artist started actively recording',
  //         cardinality: 'one',
  //         index: true },
  //      gender:
  //       { type: 'ref',
  //         description: 'Enum, one of :artist.type/person, :artist.type/group, or :artist.type/other',
  //         cardinality: 'one',
  //         index: true },
  //      endDay:
  //       { type: 'long',
  //         description: 'The day the artist stopped actively recording',
  //         cardinality: 'one',
  //         index: true },
  //      endYear:
  //       { type: 'long',
  //         description: 'The year the artist stopped actively recording',
  //         cardinality: 'one',
  //         index: true },
  //      type:
  //       { type: 'ref',
  //         description: 'The artist\'s name for use in sorting, e.g. Beatles, The',
  //         cardinality: 'one',
  //         index: true },
  //      startYear:
  //       { type: 'long',
  //         description: 'The year the artist started actively recording',
  //         cardinality: 'one',
  //         index: true },
  //      name:
  //       { type: 'string',
  //         description: 'The artist\'s name',
  //         cardinality: 'one',
  //         index: true },
  //      sortName:
  //       { type: 'string',
  //         description: 'The artist\'s name for use in alphabetical sorting, e.g. Beatles, The',
  //         cardinality: 'one',
  //         index: true },
  //      startMonth:
  //       { type: 'long',
  //         description: 'The month the artist started actively recording',
  //         cardinality: 'one',
  //         index: true },
  //      gid:
  //       { type: 'uuid',
  //         description: 'The globally unique MusicBrainz ID for an artist',
  //         cardinality: 'one',
  //         index: true },
  //      endMonth:
  //       { type: 'long',
  //         description: 'The month the artist stopped actively recording',
  //         cardinality: 'one',
  //         index: true },
  //      country:
  //       { type: 'ref',
  //         description: 'The artist\'s country of origin',
  //         cardinality: 'one',
  //         index: true } } }
```
