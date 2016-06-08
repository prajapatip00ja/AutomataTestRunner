var chai = require("chai");
var should = chai.should();
var assert = chai.assert;
var nfaGenerator = require("../../nfaGenerator.js").nfaGenerator;
var _ = require("lodash")

var tuple2 = {
  states : ["q1","q2","q3"],
  alphabets : ["0","1"],
  initialState : "q1",
  finalStates : ["q3"],
  transtion : {
    "q1" : {"0":"q1","1":["q1","q2"]},
    "q2" : {"0":"q3","1":"q3"},
    "q3" : {"0":"","1":""},
  }
}

describe("NfaGenerator accepts languages whose next-to-last symbol is 1",function(){

  it("should accept 110",function(){
    var input = "110"
    var nfa = nfaGenerator(tuple2)
    nfa(input).should.equal(true)
  })

  it("should not accept 10001",function(){
    var input = "10001"
    var nfa = nfaGenerator(tuple2)
    nfa(input).should.not.equal(true)
  })

})
