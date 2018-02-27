describe("when getting and properties starting with underscore exist on resolvers", function() {

	doLittle.dependencyResolvers._something = { something: "hello"};

	var all = doLittle.dependencyResolvers.getAll();

	it("should ignore the properties starting with underscore", function() {
		var hasUnderscore = false;
		for( var i=0; i<all.length; i++ ) {
			if( all[i].something === "hello" ) {
				hasUnderscore = true;
			}
		}

		expect(hasUnderscore).toBe(false);

	});
});