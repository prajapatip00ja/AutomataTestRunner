var state = ["q1","q2"];
var _ = require("lodash")
var alphabets = ["0","1"];
var initialState = "q1";
var finalState = ["q1"]
var transtion = {"q1": {"0": "q2","1": "q1"}, "q2":{"1":"q2","0":"q1"} }




exports.dfaGenerator = function(state,alphabets,initialState,finalState,transtion){
  return function(val) {
    var fs = val.split("").reduce(function(pre,curr){
      return transtion[pre][curr]
    },initialState)
    return _.includes(finalState,fs)
  }
}
