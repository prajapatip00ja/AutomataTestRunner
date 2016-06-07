var _ = require("lodash")


exports.nfaGenerator = function(tuple){
  var initialState = tuple.initialState;
  var finalStates = tuple.finalStates;
  var transtion = tuple.transtion;

  var nfa =  function(word) {
    var fs = word.split("").reduce(function(pre,curr){
        return states(pre,curr);
    },[initialState])
    if(includesArray(finalStates,fs)){
      return true
    }else{
      if(fs.some(hasEbslon)){
        var state = states(fs,null)
        return includesArray(finalStates,state)
      }
      return false
    }

    var efs = fs.some(hasEbslon) ? states(fs,null) : fs

    return includesArray(finalStates,efs)
  }

  var states = function(pre,curr){
    return _.flattenDeep(pre.map(function(ele){return transtion[ele] ? findState(ele,curr) : ""}))
  }

  var findState = function(pre,curr){
    if(hasEbslon(pre)){
      var state = states(_.flattenDeep([transtion[pre]["E"]]),curr);
      return _.flattenDeep([transtion[pre][curr],state])
    }
    return curr ? transtion[pre][curr] : pre
  }

  var hasEbslon = function(pre){
    return transtion[pre] && _.includes(Object.keys(transtion[pre]),"E");
  }

  return nfa;
}

var includesArray = function(finalStates,values){
  return values.some(function(value){return _.includes(finalStates,value)})
}
