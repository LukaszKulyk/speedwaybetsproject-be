// index.js
const userHelper = require('../../helpers/user');
let expect = require('chai').expect;

// This is just for organisation and reporting
describe('Users Helpers - setCurrentRank function', function() {

    // This is the name of the test
    it('Verify if function works fine for new user in current rank.', function(done) {

        currentRank = [
          { pos: 1, username: "aaa", points: 92, "+/-": "0"},
          { pos: 2, username: "bbb", points: 84, "+/-": "0"},
          { pos: 3, username: "ccc", points: 76, "+/-": "0"},
          { pos: 4, username: "fff", points: 74, "+/-": "0"},
          { pos: 5, username: "eee", points: 50, "+/-": "0"},
          { pos: 6, username: "ddd", points: 33, "+/-": "0"}
      ];

        lastRank = [
            { pos: 1, username: "aaa", points: 92, "+/-": "0"},
            { pos: 2, username: "bbb", points: 84, "+/-": "0"},
            { pos: 3, username: "ccc", points: 76, "+/-": "0"},
            { pos: 4, username: "eee", points: 50, "+/-": "+1"},
            { pos: 5, username: "ddd", points: 33, "+/-": "0"}
        ];

        expectedRank = [
            { pos: 1, username: "aaa", points: 92, "+/-": "0"},
            { pos: 2, username: "bbb", points: 84, "+/-": "0"},
            { pos: 3, username: "ccc", points: 76, "+/-": "0"},
            { pos: 4, username: "fff", points: 74, "+/-": "0"},
            { pos: 5, username: "eee", points: 50, "+/-": "-1"},
            { pos: 6, username: "ddd", points: 33, "+/-": "-1"}
        ];

        let test = userHelper.setCurrentRankArrows(currentRank, lastRank);

        expect(test).to.eql(expectedRank)
        done();
  
    });

    it('Verify if function works fine for one user missing in current rank.', function(done) {

      currentRank = [
        { pos: 1, username: "aaa", points: 92, "+/-": "0"},
        { pos: 2, username: "bbb", points: 84, "+/-": "0"},
        { pos: 3, username: "ccc", points: 76, "+/-": "0"},
        { pos: 4, username: "ddd", points: 33, "+/-": "0"}
      ];

      lastRank = [
          { pos: 1, username: "aaa", points: 92, "+/-": "0"},
          { pos: 2, username: "bbb", points: 84, "+/-": "0"},
          { pos: 3, username: "ccc", points: 76, "+/-": "0"},
          { pos: 4, username: "eee", points: 50, "+/-": "+1"},
          { pos: 5, username: "ddd", points: 33, "+/-": "0"}
      ];

      expectedRank = [
          { pos: 1, username: "aaa", points: 92, "+/-": "0"},
          { pos: 2, username: "bbb", points: 84, "+/-": "0"},
          { pos: 3, username: "ccc", points: 76, "+/-": "0"},
          { pos: 4, username: "ddd", points: 33, "+/-": "+1"}
      ];

      let test = userHelper.setCurrentRankArrows(currentRank, lastRank);

      expect(test).to.eql(expectedRank)
      done();

    });

    it('Verify if function works fine for empty last rank.', function(done) {

      currentRank = [
        { pos: 1, username: "aaa", points: 92, "+/-": "0"},
        { pos: 2, username: "bbb", points: 84, "+/-": "0"},
        { pos: 3, username: "ccc", points: 76, "+/-": "0"},
        { pos: 4, username: "fff", points: 74, "+/-": "0"},
        { pos: 5, username: "eee", points: 50, "+/-": "0"},
        { pos: 6, username: "ddd", points: 33, "+/-": "0"}
    ];

      lastRank = [];

      expectedRank = [
          { pos: 1, username: "aaa", points: 92, "+/-": "0"},
          { pos: 2, username: "bbb", points: 84, "+/-": "0"},
          { pos: 3, username: "ccc", points: 76, "+/-": "0"},
          { pos: 4, username: "fff", points: 74, "+/-": "0"},
          { pos: 5, username: "eee", points: 50, "+/-": "0"},
          { pos: 6, username: "ddd", points: 33, "+/-": "0"}
      ];

      let test = userHelper.setCurrentRankArrows(currentRank, lastRank);

      expect(test).to.eql(expectedRank)
      done();

    });
  
  });

  describe('Users Helpers - calculatePositionDifference function', function() {
    it('Verify if function works fine for different numeral values.', function(done) {
      expect(userHelper.calculatePositionDifference(1,1)).to.eql(0);
      expect(userHelper.calculatePositionDifference(3,4)).to.eql(1);
      expect(userHelper.calculatePositionDifference(9,3)).to.eql(-6);
      expect(userHelper.calculatePositionDifference(20.3,1)).to.eql(-19.3);
      done();
    });

    it('Verify if function works fine for string values.', function(done) {
      expect(userHelper.calculatePositionDifference('1',1)).to.eql(0);
      expect(userHelper.calculatePositionDifference(3,'4')).to.eql(1);
      expect(userHelper.calculatePositionDifference('9','3')).to.eql(-6);
      done();
    });

    it('Verify if function works fine for wrong data types values.', function(done) {
      expect(userHelper.calculatePositionDifference([1,2,3],1)).to.eql(NaN);
      expect(userHelper.calculatePositionDifference(3,'volvo')).to.eql(NaN);
      expect(userHelper.calculatePositionDifference({data:3},'3')).to.eql(NaN);
      done();
    });

  });