describe("when extending without a parameter", function() {
	var exception;
	
	try {
		doLittle.Type.extend();
	} catch(e) {
		exception = e;
	}
	
	it("should throw missing class definition exception", function() {
		expect(exception instanceof doLittle.MissingTypeDefinition).toBeTruthy();
	});
});