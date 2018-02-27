describe("when mapping to type with property with mismatching types", function(){
	var mappedInstance;
	var data = { numberProperty: "42"};

	var parameters = {
	    typeConverters: {
	        convertFrom: sinon.stub().returns(42)
	    },
	    maps: { hasMapFor: sinon.stub().returns(false) }
	};

	var type = doLittle.Type.extend(function () {
        this.numberProperty = 0;
    });

	var returnedInstance = type.create();

    type.create = sinon.stub().returns(returnedInstance);


	(function becauseOf(){
	    var mapper = doLittle.mapping.mapper.create(parameters);
		mappedInstance = mapper.map(type, data);
	})();

	it("should return the instance", function () {
		expect(mappedInstance).toEqual(returnedInstance);
	});

	it("should type convert the value", function () {
	    expect(parameters.typeConverters.convertFrom.calledWith(data.numberProperty, "Number")).toBe(true);
	});

	it("should map the corresponding numberProprty value", function(){
		expect(mappedInstance.numberProperty).toEqual(42);
	});
});