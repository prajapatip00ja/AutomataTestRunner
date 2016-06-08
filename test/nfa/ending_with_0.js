var chai = require("chai");
var should = chai.should();
var assert = chai.assert;
var nfaGenerator = require("../../nfaGenerator.js").nfaGenerator;
var _ = require("lodash")

var tuple1 = {
  states : ["q1","q2","q3","q4"],
  alphabets : ["0","1"],
  initialState : "q1",
  finalStates : ["q4"],
  transtion : {
    "q1" : {"E":"q2","0":"","1":""},
    "q2" : {"E":"q3","0":"","1":""},
    "q3" : {"0":["q3","q4"],"1":"q3"},
    "q4" : {"0":"","1":""}
  }
}

describe("NfaGenerator accepts languages that is ending with 0",function(){

  it("should accept 110",function(){
    var input = "110"
    var nfa = nfaGenerator(tuple1)
    nfa(input).should.equal(true)
  })

  it("should accept 0",function(){
    var input = "0"
    var nfa = nfaGenerator(tuple1)
    nfa(input).should.equal(true)
  })

  it("should not 11",function(){
    var input = "11"
    var nfa = nfaGenerator(tuple1)
    nfa(input).should.not.equal(true)
  })

})
