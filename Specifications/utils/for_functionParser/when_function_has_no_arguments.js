describe("when function has no arguments", function() {
	var func = function() {};

	var result = Dolittle.functionParser.parse(func);
	
	it("should return an empty array", function() {
		expect(result.length).toBe(0);
	});
});