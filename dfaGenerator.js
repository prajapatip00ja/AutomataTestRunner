var _ = require("lodash")

exports.dfaGenerator = function(tuple){
  return function(val) {
    var fs = val.split("").reduce(function(pre,curr){
      return tuple.transtion[pre][curr]
    },tuple.initialState)
    return _.includes(tuple.finalStates,fs)
  }
}
