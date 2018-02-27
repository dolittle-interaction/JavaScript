describe("when mapping to type with matching string property", function () {
	var mappedInstance;
	var data = { stringProperty: ko.observable("string") };

	var parameters = {
	    typeConverters: {},
	    maps: { hasMapFor: sinon.stub().returns(false) }
	};

	var type = doLittle.Type.extend(function () {
        var self = this;

        this.stringProperty = "";
        this.numberProperty = 0;
        this.arrayProperty = [];
        this.objectProperty = {
        	objectProperty : ""
        };
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

	it("should map the corresponding stringProprty value", function(){
		expect(mappedInstance.stringProperty).toEqual(data.stringProperty());
	})

});