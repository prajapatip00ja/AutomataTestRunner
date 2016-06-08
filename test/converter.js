var data = require('./data.json');
var chai = require("chai");
var should = chai.should();
var assert = chai.assert;
var dfaGenerator = require("../dfaGenerator.js").dfaGenerator;
var nfaGenerator = require("../nfaGenerator.js").nfaGenerator;

exports.finiteAutometa = function(data){
    var mytuple = {};
      mytuple.states = data.tuple.states,
      mytuple.alphabets = data.tuple.alphabets,
      mytuple.initialState =data.tuple["start-state"],
      mytuple.finalStates =data.tuple["final-states"],
      mytuple.transtion = data.tuple.delta
    return (data.type == "dfa") ? dfaGenerator(mytuple) : nfaGenerator(mytuple);
}
