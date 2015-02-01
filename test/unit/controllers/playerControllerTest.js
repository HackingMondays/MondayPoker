import {wrap} from "../../tools/fakeRequest.js"
import rewire from 'rewire'
var controllerImport = rewire("../../../src/controllers/playerController.js");
var playerController = wrap(controllerImport.playerController);

// Vocabulary
var [status] = ["status"];

describe("PlayerController", () => {
    beforeEach(() => {
        controllerImport.__set__("playerService", rewire('../../../src/services/playerService.js').playerService)
    });
    describe("#create", () => {
        it("should accept new player", async () => {
            var response = await playerController.create.with({
                body: { name: "toto" }
            });
            expect(response.status).to.equal(201);
        });
        it("should reject new player one already exists with the same name", async () => {
            var firstResponse = await playerController.create.with({
                body: { name: "toto" }
            });
            expect(firstResponse.status).to.equal(201);

            var lastResponse = await playerController.create.with({
                body: { name: "toto" }
            });
            expect(lastResponse.status).to.equal(304);
        });
    });
    describe("#fetch", () => {
        it("should respond with a 404 if the queried player does not exist", async () => {
            var response = await playerController.fetch.with({
                param: { id:'toto' }
            });
            expect(response.status).to.equal(404);
        });
        it("should retrieve an existing player", async () => {
            var name = "A Player";
            var createResponse = await playerController.create.with({
                body: { name }
            });
            expect(createResponse.status).to.equal(201);
            var fetchResponse = await playerController.fetch.with({
                params: { id: name }
            });
            expect(fetchResponse.data.name).to.equal(name);
        });
    });
    describe("#findAll", () => {
        it("should list all added players", async () => {
            var toto = { name: "toto" };
            var alfred = { name: "Alfred" };
            var firstResponse = await playerController.create.with({ body: toto });
            expect(firstResponse.status).to.equal(201);

            var lastResponse = await playerController.create.with({ body: alfred });
            expect(lastResponse.status).to.equal(201);

            var listResponse = await playerController.list();
            expect(listResponse.data).to.have.length(2);
            expect(listResponse.data).to.deep.include.members([alfred, toto]);
        });
        it("should respond an empty list if no players were added", async () => {
            var response = await playerController.list();

            expect(response.data).to.be.empty();
        })
    });
    describe("#update", () => {
        it("should respond 404 if the player does not exist.", async () => {
            var name = "toto";
            var response = await playerController.update.with({
                params: { id: name },
                body: { url:"localhost" }
            });
            expect(response.status).to.equal(404);
        });
        it("should update the player if it exists", async () => {
            var name = "toto";
            var createResponse = await playerController.create.with({
                body: { name, url:"http://google.fr" }
            });
            expect(createResponse.status).to.equal(201);

            var updatedUrl = "localhost";
            var updateResponse = await playerController.update.with({
                params: { id: name },
                body: { name:"Alfred", url: updatedUrl }
            });
            expect(updateResponse.status).to.equal(204);

            var fetchResponse = await playerController.fetch.with({
                params: { id:name }
            });
            expect(fetchResponse.data).to.exist();
            expect(fetchResponse.data.name).to.equal(name);
            expect(fetchResponse.data.url).to.equal(updatedUrl)
        });
    });
    describe("#destroy", () => {
        it("should respond 404 if the player does not exist.", async () => {
            var response = await playerController.destroy.with({
                params: { id: "toto" }
            });
            expect(response.status).to.equal(404);
        });
        it("should delete the player if it exists", async () => {
            var name = "toto";
            var createResponse = await playerController.create.with({
                body: { name, url:"http://google.fr" }
            });
            expect(createResponse.status).to.equal(201);

            var updateResponse = await playerController.destroy.with({
                params: { id: name }
            });
            expect(updateResponse.status).to.equal(204);

            var fetchResponse = await playerController.fetch.with({
                params: { id:name }
            });
            expect(fetchResponse.status).to.equal(404);
        });
    });

});