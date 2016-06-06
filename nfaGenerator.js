var _ = require("lodash")
var states = ["q1","q2","q3"];
var alphabets = ["0","1"];
var initialState = "q1";
var finalStates = ["q3"];

//var transtion1 = {"q1" : {"0" : "q1","1": ["q1","q2"]},"q2":{"0":"","1":""}}
// var transtion2 = {
//   "q1":{"0":["q1","q3"],"1":["q1","q2"]},
//   "q2":{"0":"","1":"q4"},
//   "q3":{"0":"q4","1":""},
//   "q4":{"0":"q4","1":"q4"}
// }

var transtion = {
  "q1" : {"E":"q2","0":"","1":""},
  "q2" : {"0":["q2","q3"],"1":"q2"},
  "q3" : {"0":"","1":""}
}
var input = "110"

var nfaGenerator = function(state,alphabets,initialState,finalState,transtion){

  var nfa =  function(word) {
    var fs = word.reduce(function(pre,curr){
      if(Array.isArray(pre))
        return _.flattenDeep(states(pre,curr));
      return getState(pre,curr);
    },initialState)
    return fs;
  }

  var getState = function(pre,curr){
    return transtion[pre] ? s(pre,curr) : "";
  }

  var s = function(pre,curr){
    if(hasEbslon(pre)){
      var state = transtion[pre]["E"];
      return _.flattenDeep([transtion[pre][curr],transtion[state][curr]])
    }
    return transtion[pre][curr]
  }

  var states = function(pre,curr){
    return pre.map(function(ele){return getState(ele,curr)})
  }

  var hasEbslon = function(pre){
    return _.includes(Object.keys(transtion[pre]),"E");
  }

  return nfa;
}
console.log("----------",nfaGenerator(states,alphabets,initialState,finalStates,transtion)(input.split("")))
