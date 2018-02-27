describe("when mapping to instance with observable property with mismatching types", function(){
	
	var data = { numberProperty: "42"};

	var parameters = {
	    typeConverters: {
	        convertFrom: sinon.stub().returns(42)
	    },
	    maps: { hasMapFor: sinon.stub().returns(false) }
	};

	var type = doLittle.Type.extend(function () {
        this.numberProperty = ko.observable(0);
    });

	var mappedInstance = type.create();

	(function becauseOf(){
	    var mapper = doLittle.mapping.mapper.create(parameters);
		mapper.mapToInstance(type, data, mappedInstance);
	})();

	it("should type convert the value", function () {
	    expect(parameters.typeConverters.convertFrom.calledWith(data.numberProperty, "Number")).toBe(true);
	});

	it("should map the corresponding numberProprty value", function(){
		expect(mappedInstance.numberProperty()).toEqual(42);
	});
});