describe("when handling post binding with one element", function() {
	var root = document.createElement("div");
	var element = document.createElement("button");
	
	var documentService = {
		traverseObjects: function(callback) {
			callback(element);
		}
	};

	var visitStub = sinon.stub();

	var visitorType = doLittle.views.PostBindingVisitor.extend(function () {
		this.visit = visitStub;
	});

	beforeEach(function () {
	    sinon.stub(doLittle.markup.ElementVisitor, "getExtenders").returns([]);

	    sinon.stub(doLittle.views.PostBindingVisitor, "getExtenders").returns([visitorType]);

		var instance = doLittle.views.UIManager.createWithoutScope({
			documentService: documentService
		})

		instance.handlePostBinding(root);
	});

	afterEach(function () {
	    doLittle.markup.ElementVisitor.getExtenders.restore();
		doLittle.views.PostBindingVisitor.getExtenders.restore();
	});

	it("should call the visit function of the visitor", function() {
		expect(visitStub.calledWith(element)).toBe(true);
	});
});