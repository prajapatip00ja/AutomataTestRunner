var chai = require("chai");
var should = chai.should();
var genrator = require("../dfaGenerator.js");
var _ = require("lodash")


var state = ["q1","q2"];
var alphabets = ["0","1"];
var initialState = "q1";
var finalState = ["q1"]
var transtion = {"q1": {"0": "q2","1": "q1"}, "q2":{"1":"q2","0":"q1"} }


describe("DfaGenerator accepts languages that have even number of zeros",function(){
  it("should accept valid languages",function(){
    var input = "100001"
    var dfa = genrator.dfaGenerator(state,alphabets,initialState,finalState,transtion)
    dfa(input).should.equal(true)
  })

  it("should not accept invalid languages",function(){
    var input = "10001"
    var dfa = genrator.dfaGenerator(state,alphabets,initialState,finalState,transtion)
    dfa(input).should.not.equal(true)
  })
})

// describe("DfaGenerator accepts languages that have even number of zeros",function(){
//
// })
