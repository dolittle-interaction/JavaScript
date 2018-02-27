describe("when adding state", function() {

	var group = doLittle.interaction.VisualStateGroup.create({dispatcher: {}});
	var state = { some: "state" };

	group.addState(state);

	it("should have one state", function() {
		expect(group.states().length).toBe(1);
	});

	it("should hold the state added", function() {
		expect(group.states()[0]).toBe(state);
	});
});