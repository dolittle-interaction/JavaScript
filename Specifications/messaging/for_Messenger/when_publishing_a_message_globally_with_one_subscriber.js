describe("when publishing a message globally with one subscriber", function () {
    var wasMessageReceived = false;
    var messageReceived;

    function received(message) {
        wasMessageReceived = true;
        messageReceived = message;
    }

    var messenger = doLittle.messaging.Messenger.global;
    messenger.subscribeTo("SimpleMessage", received);
    messenger.publish("SimpleMessage", "Hello")

    it("should call the subscriber", function () {
        expect(wasMessageReceived).toBe(true);
    });

    it("should pass along the message to the subscriber", function () {
        expect(messageReceived).toBe("Hello");
    });
});