describe("when mapping to type with an empty object", function(){
	var mappedInstance;
	var data = {};
	var returnedInstance = {};

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

    type.create = sinon.stub().returns(returnedInstance);


	(function becauseOf(){
		var mapper = doLittle.mapping.mapper.create(parameters);
		mappedInstance = mapper.map(type, data);
	})();

	it("should create an instance of the type", function () {
		expect(type.create.called).toBe(true);
	});

	it("should return the instance", function () {
		expect(mappedInstance).toEqual(returnedInstance);
	});
});