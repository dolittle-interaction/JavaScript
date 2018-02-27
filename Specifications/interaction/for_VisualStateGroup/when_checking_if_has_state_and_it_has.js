describe("when checking if has state and it has", function() {

	var group = doLittle.interaction.VisualStateGroup.create({dispatcher: {}});
	group.states.push({
		name: "Something else"
	});
	group.states.push({
		name: "Something"
	});

	var hasState = group.hasState("Something");

	it("should return false", function() {
		expect(hasState).toBe(true);
	});
});