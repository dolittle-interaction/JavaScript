﻿describe("when specification has not been evaluated against an instance", function () {

    var evaluator = sinon.stub();
    var rule = doLittle.specifications.Specification.create();
    rule.evaluator = evaluator;
    var isSatisfied = rule.isSatisfied();

    it("should not call the evaluator", function () {
        expect(evaluator.called).toBe(false);
    });

    it("should not be satisfied", function () {
        expect(isSatisfied).toBe(false);
    });
});