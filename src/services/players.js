var players = [];

export const playerService = {
    findByName(name) {
        return players.find((player) => {
            return player.name == name;
        })
    },
    deleteByName(name) {
        players = players.filter((player) => {
            return player.name != name;
        });
        return players;
    },
    exists(name) {
        return !!this.findByName(name);
    },
    add(player) {
        players.push(player);
        return players;
    },
    findAll() {
        return players.concat([]);
    }
};