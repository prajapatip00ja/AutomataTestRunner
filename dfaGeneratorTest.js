var chai = require("chai");
var genrator = require("./dfaGenerator.js");
var _ = require("lodash")
var test = {};
exports.test = test;


var state = ["q1","q2"];
var alphabets = ["0","1"];
var initialState = "q1";
var finalState = ["q1"]
var transtion = {"q1": {"0": "q2","1": "q1"}, "q2":{"1":"q2","0":"q1"} }

var input = "100001"
// console.log(chai.should().equal(res,true))

test.first_test = function(){
  var res = genrator.dfaGenerator(state,alphabets,initialState,finalState,transtion)(input)
  chai.assert.equal(res,false)
}

var executeTest = function(){
  try{
    test.first_test();
  }
  catch(error){
    console.log(error)
  }
  console.log("-----test pass-----")
}
executeTest();



// describe("",function(){
//   it("",function(){
//     chai.assert.equal(1,1)
//   })
// })
