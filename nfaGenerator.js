var _ = require("lodash")

exports.nfaGenerator = function(tuple){
  var initialState = tuple.initialState;
  var finalStates = tuple.finalStates;
  var transtion = tuple.transtion;

  var nfa =  function(word) {
    var fs = word.split("").reduce(function(previousState,currentElement){
        return stateReducer(previousState,currentElement);
    },[initialState])
    return includesArray(finalStates,fs) || (fs.some(hasEpsilon) && includesArray(finalStates,stateReducer(fs,null)))
  }

  var stateReducer = function(previousState,currentElement){
    return _.flattenDeep(previousState.map(function(state){
      return transtion[state] ? findState(state,currentElement) : ""
    }))
  }

  var findState = function(previousState,currentElement){
    if(hasEpsilon(previousState)){
      var state = stateReducer(_.flattenDeep([transtion[previousState]["E"]]),currentElement);
      return [transtion[previousState][currentElement],state]
    }
    return currentElement ? transtion[previousState][currentElement] : previousState
  }

  var hasEpsilon = function(previousState){
    return previousState && transtion[previousState] && _.includes(Object.keys(transtion[previousState]),"E");
  }

  return nfa;
}

var includesArray = function(finalStates,values){
  return values.some(function(value){return _.includes(finalStates,value)})
}
