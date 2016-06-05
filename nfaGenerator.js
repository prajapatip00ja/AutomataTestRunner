var _ = require("lodash")
var state = ["q1","q2"];
var alphabets = ["0","1"];
var initialState = "q1";
var finalState = ["q2"];

//var transtion = {"q1" : {"0" : "q1","1": ["q1","q2"]},"q2":{"0":"","1":""}}
var transtion = {
  "q1":{"0":["q1","q3"],"1":["q1","q2"]},"q2":{"0":"","1":"q4"},"q3":{"0":"q4","1":""},"q4":{"0":"q4","1":"q4"}
}

var input = "1010101"

var nfaGenerator = function(state,alphabets,initialState,finalState,transtion){

  var nfa =  function(val) {
    var fs = val.reduce(function(pre,curr){
      if(Array.isArray(pre))
        return _.flattenDeep(states(pre,curr));
      return getState(pre,curr)
    },initialState)
    return fs;
  }

  var getState = function(pre,curr){
    return transtion[pre] ? transtion[pre][curr] : "";
  }

  var states = function(pre,curr){
    return pre.map(function(ele){
      return getState(ele,curr)
    })
  }

  return nfa;
}




console.log("----------",nfaGenerator(state,alphabets,initialState,finalState,transtion)(input.split("")))
