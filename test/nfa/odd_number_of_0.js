var chai = require("chai");
var should = chai.should();
var assert = chai.assert;
var nfaGenerator = require("../../nfaGenerator.js").nfaGenerator;
var _ = require("lodash")

var tuple3 = {
  states : ["q1","q2","q3","q4","q5"],
  alphabets : ["0","1"],
  initialState : "q1",
  finalStates : ["q4","q5"],
  transtion : {
    "q1" : {"0":[],"1":[],"E":["q2","q3"]},
    "q2" : {"1":["q4"],"0":[]},
    "q3" : {"0":["q5"],"1":[]},
    "q4" : {"0":[],"1":["q2"]},
    "q5" : {"0":["q3"],"1":[]}
  }
}

describe("NfaGenerator accepts languages whose had odd number of 0",function(){

  it("should accept 000",function(){
    var input = "000"
    var nfa = nfaGenerator(tuple3)
    nfa(input).should.equal(true)
  })

  it("should not accept 0000",function(){
    var input = "0000"
    var nfa = nfaGenerator(tuple3)
    nfa(input).should.not.equal(true)
  })

  it("should accept 111",function(){
    var input = "111"
    var nfa = nfaGenerator(tuple3)
    nfa(input).should.equal(true)
  })

  it("should not accept 1111",function(){
    var input = "1111"
    var nfa = nfaGenerator(tuple3)
    nfa(input).should.not.equal(true)
  })

})
