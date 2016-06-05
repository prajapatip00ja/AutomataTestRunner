var _ = require("lodash")
var state = ["q1","q2"];
var alphabets = ["0","1"];
var initialState = "q1";
var finalState = ["q2"];

var transtion = {"q1" : {"0" : "q1","1": ["q1","q2"]},"q2":{"0":"null","1":"null"}}

var input = "1000000001"

var nfaGenerator = function(state,alphabets,initialState,finalState,transtion){

  var nfa =  function(val) {
    var fs = val.reduce(function(pre,curr,ci,ar){
      if(Array.isArray(pre)){
        var finalStates = handleArrays(pre,ci,ar);
        return finalStates
      }
      else{
          var res =  transtion[pre] ? transtion[pre][curr] : "null"
          return res
        }
    },initialState)
    return fs;
  }

  var handleArrays = function(pre,ci,ar){
    return _.flattenDeep(pre.map(function(ele){
      initialState = ele;
      return nfa(ar.slice(ci))
  }));
}

  return nfa;
}


console.log("----------",nfaGenerator(state,alphabets,initialState,finalState,transtion)(input.split("")))
