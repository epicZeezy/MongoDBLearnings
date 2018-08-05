const assert = require("assert")
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe'})

    joe.save()
      .then(() => {
        //Has joe been saved successfully?
        //isNew is executed on model to see if it's already been saved
        assert(!joe.isNew);
        done();
      });
  });
});
