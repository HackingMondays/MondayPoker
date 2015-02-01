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
});