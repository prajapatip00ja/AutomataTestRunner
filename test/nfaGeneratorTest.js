var chai = require("chai");
var should = chai.should();
var assert = chai.assert;
var nfaGenerator = require("../nfaGenerator.js").nfaGenerator;
var _ = require("lodash")

var tuple1 = {
  states : ["q1","q2","q3","q4"],
  alphabets : ["0","1"],
  initialState : "q1",
  finalStates : ["q4"],
  transtion : {
    "q1" : {"E":"q2","0":"","1":""},
    "q2" : {"E":"q3","0":"","1":""},
    "q3" : {"0":["q3","q4"],"1":"q3"},
    "q4" : {"0":"","1":""}
  }
}

describe("NfaGenerator accepts languages that is ending with 0",function(){

  it("should accept 110",function(){
    var input = "110"
    var nfa = nfaGenerator(tuple1)
    nfa(input).should.equal(true)
  })

  it("should accept 0",function(){
    var input = "0"
    var nfa = nfaGenerator(tuple1)
    nfa(input).should.equal(true)
  })

  it("should not accept 11",function(){
    var input = "11"
    var nfa = nfaGenerator(tuple1)
    nfa(input).should.not.equal(true)
  })

})

var tuple2 = {
  states : ["q1","q2","q3"],
  alphabets : ["0","1"],
  initialState : "q1",
  finalStates : ["q3"],
  transtion : {
    "q1" : {"0":"q1","1":["q1","q2"]},
    "q2" : {"0":"q3","1":"q3"},
    "q3" : {"0":"","1":""},
  }
}

describe("NfaGenerator accepts languages whose next-to-last symbol is 1",function(){

  it("should accept 110",function(){
    var input = "110"
    var nfa = nfaGenerator(tuple2)
    nfa(input).should.equal(true)
  })

  it("should not accept 10001",function(){
    var input = "10001"
    var nfa = nfaGenerator(tuple2)
    nfa(input).should.not.equal(true)
  })

})

var tuple3 = {
  states : ["q1","q2","q3","q4","q5"],
  alphabets : ["0","1"],
  initialState : "q1",
  finalStates : ["q4","q5"],
  transtion : {
    "q1" : {"0":[],"1":[],"E":["q2","q3"]},
    "q2" : {"1":["q4"],"0":[]},
    "q3" : {"0":["q5"],"1":[]},
    "q4" : {"0":[],"1":["q2"]},
    "q5" : {"0":["q3"],"1":[]}
  }
}

describe("NfaGenerator accepts languages whose had odd continious of 0 or 1",function(){

  it("should accept 000",function(){
    var input = "000"
    var nfa = nfaGenerator(tuple3)
    nfa(input).should.equal(true)
  })

  it("should not accept 0000",function(){
    var input = "0000"
    var nfa = nfaGenerator(tuple3)
    nfa(input).should.not.equal(true)
  })

  it("should accept 111",function(){
    var input = "111"
    var nfa = nfaGenerator(tuple3)
    nfa(input).should.equal(true)
  })

  it("should not accept 1111",function(){
    var input = "1111"
    var nfa = nfaGenerator(tuple3)
    nfa(input).should.not.equal(true)
  })

})

describe("Nfa_generator_with_epsolon",function(){
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
})

var tuple4 = {
  states : ["q1","q2"],
  alphabets : ["0","1"],
  initialState : "q1",
  finalStates : ["q2"],
  transtion : {
  "q1":{'E':["q2"],"0":["q1"]},
  "q2":{"1":["q2"]}
  }
}
describe("NfaGenerator accepts languages ",function(){

  it("should accept 0",function(){
    var input = "0"
    var nfa = nfaGenerator(tuple4)
    nfa(input).should.equal(true)
  })

  it("should accept 1",function(){
    var input = "1"
    var nfa = nfaGenerator(tuple4)
    nfa(input).should.equal(true)
  })

  it("should accept 01",function(){
    var input = "01"
    var nfa = nfaGenerator(tuple4)
    nfa(input).should.equal(true)
  })

  it("should accept empty",function(){
    var input = ""
    var nfa = nfaGenerator(tuple4)
    nfa(input).should.equal(true)
  })

  it("should not accept 10",function(){
    var input = "10"
    var nfa = nfaGenerator(tuple4)
    nfa(input).should.not.equal(true)
  })
})
