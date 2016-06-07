var chai = require("chai");
var should = chai.should();
var assert = chai.assert;
var dfaGenerator = require("../dfaGenerator.js").dfaGenerator;
var _ = require("lodash")

var tuple = {
  states : ["q1","q2"],
  alphabets : ["0","1"],
  initialState : "q1",
  finalStates : ["q1"],
  transtion : {"q1": {"0": "q2","1": "q1"}, "q2":{"1":"q2","0":"q1"} }
}

describe("DfaGenerator accepts languages that have even number of zeros",function(){
  it("should accept valid languages",function(){
    var input = "100001"
    var dfa = dfaGenerator(tuple)
    dfa(input).should.equal(true)
  })

  it("should not accept invalid languages",function(){
    var input = "10001"
    var dfa = dfaGenerator(tuple)
    dfa(input).should.not.equal(true)
  })
})

describe('Language w | w is string with length divisible by 2', function () {
        var lang = {
        states: ["q1","q2","q3"],
        alphabets : ['0','1'],
        transtion:{
          'q1': {0:'q2', 1:'q2'},
          'q2': {0:'q3', 1:'q3'},
          'q3': {0:'q2', 1:'q2'}
        },
        initialState:"q1" ,
        finalStates:['q1','q3']
      };
      var dfa_for_even_string_length = dfaGenerator(lang);

      it('should accept string 00', function () {
          assert.ok(dfa_for_even_string_length('00'));
      });
      it('should accept empty string', function () {
          assert.ok(dfa_for_even_string_length(''));
      });
      it('should accept even length of string', function () {
          assert.ok(dfa_for_even_string_length('010110'));
      });
      it('should not accept single character', function () {
          assert.notOk(dfa_for_even_string_length('0'));
      });
      it('should not accept odd length of character', function () {
          assert.notOk(dfa_for_even_string_length('10101'));
      });
    });

// describe("DfaGenerator accepts languages that have even number of zeros",function(){
//
// })
