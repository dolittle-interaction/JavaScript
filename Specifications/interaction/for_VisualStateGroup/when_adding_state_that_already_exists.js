describe("when adding state that already exists", function() {

	var exception = null;
	var group = doLittle.interaction.VisualStateGroup.create({dispatcher: {}});
	var state = { some: "state" };
	group.addState(state);

	try {
		var otherState = { some: "state" };
		group.addState(otherState);
	} catch( e ) {
		exception = e;
	}

	it("should throw an exception", function() {
		expect(exception).not.toBe(null);
	});
});