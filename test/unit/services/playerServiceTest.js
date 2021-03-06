import rewire from 'rewire'
var serviceImport = rewire('../../../src/services/playerService.js');
var playerService = serviceImport.playerService;

describe("PlayersService", () => {
    beforeEach(() => {
        serviceImport.__set__("players", []);
    });

    it("should not find any players before any player is added", () => {
        expect(playerService.findAll())
            .to.be.empty();
    });
    it("should find the added player when one is added", () => {
        var name = "toto";
        playerService.add({
            name
        });
        var players = playerService.findAll();
        expect(players).to.have.length(1);
        var player = playerService.findByName(name);
        expect(player).to.exist();
        expect(player.name).to.equal(name);
        expect(playerService.exists(name)).to.be.true();
    });
    it("should not find a removed player", () => {
        var name = "Alfred";
        playerService.add({
            name
        });
        playerService.deleteByName(name);
        expect(playerService.findByName(name)).to.not.exist();
        expect(playerService.exists(name)).to.be.false();
    });
});