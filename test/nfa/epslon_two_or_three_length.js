var chai = require("chai");
var should = chai.should();
var assert = chai.assert;
var nfaGenerator = require("../../nfaGenerator.js").nfaGenerator;
var _ = require("lodash")

describe("nfa_generator_with_epsolon",function(){
	it("should accept string with tuple_two_or_three_length",function(){
		var tuple_two_or_three_length = {
			transtion:{
				"q1":{"E":["q2","q5"]},
				"q2":{"0":["q3"]},
				"q3":{"0":["q4"]},
				"q5":{"0":["q6"]},
				"q6":{"0":["q7"]},
				"q7":{"0":["q4"]}
			},
			alfabets:["0"],
			states:["q1","q2","q3","q4","q5","q6","q7"],
			initialState:"q1",
			finalStates:["q4"],
		}

		var nfa_two_or_three_length = nfaGenerator(tuple_two_or_three_length);
		assert.isNotTrue(nfa_two_or_three_length("0"))
		assert.isTrue(nfa_two_or_three_length("00"))
		assert.isTrue(nfa_two_or_three_length("000"));
		assert.isNotTrue(nfa_two_or_three_length("0000"));
  });

  it("should accept string with tuple_two_or_three_length with multiple epsilon transition",function(){
		var tuple_two_or_three_length = {
			transtion:{
				"q1":{'E':["q2","q5"]},
				"q2":{"0":["q3"]},
				"q3":{"0":["q4"]},
				"q5":{"0":["q6"]},
				"q6":{"0":["q7"]},
				"q7":{"E":["q8"]},
				"q8":{"E":["q9"]},
				"q9":{"0":["q4"]}
			},
			alfabet:["0"],
			states:["q1","q2","q3","q4","q5","q6","q7","q8","q9"],
			initialState:"q1",
			finalStates:["q4"],
		}

		var nfa_two_or_three_length = nfaGenerator(tuple_two_or_three_length);

    assert.isNotTrue(nfa_two_or_three_length("0"))
		assert.isTrue(nfa_two_or_three_length("00"))
		assert.isTrue(nfa_two_or_three_length("000"));
		assert.isNotTrue(nfa_two_or_three_length("0000"));

  });

  it("should accept string with tuple_two_or_three_length with last epsilon transition",function(){
    var tuple_two_or_three_length = {
  		transtion:{
  			"q1":{'E':["q2","q5"]},
  			"q2":{"0":["q3"]},
  			"q3":{"0":["q4"]},
        "q4":{"0":"","1":""},
  			"q5":{"0":["q6"]},
  			"q6":{"0":["q7"]},
  			"q7":{"0":["q8"]},
  			"q8":{'E':["q9"]},
  			"q9":{'E':["q4"],"0":"","1":""}
  		},
  		alfabet:["0"],
  		states:["q1","q2","q3","q4","q5","q6","q7","q8","q9"],
  		initialState:"q1",
  		finalStates:["q4"],
  	}

  	var nfa_two_or_three_length = nfaGenerator(tuple_two_or_three_length);
    	assert.isNotTrue(nfa_two_or_three_length("0"))
    	assert.isTrue(nfa_two_or_three_length("00"))
    	assert.isTrue(nfa_two_or_three_length("000"));
    	assert.isNotTrue(nfa_two_or_three_length("0000"));
    });

});
