import {playerService} from '../services/playerService.js'
import {resource} from "../resource.js"

export const playerController = {
    list(req, res) {
        res.json(playerService.findAll());
    },
    create(req, res) {
        var player = req.body;
        if (playerService.exists(player.name)) {
            return res.status(304).end();
        }
        playerService.add(player);
        return res.status(201).end();
    },
    fetch(req, res) {
        var player = playerService.findByName(req.params.id);
        if (player) {
            return res.json(player);
        }
        return res.status(404).end();
    },
    update(req, res) {
        var player = playerService.findByName(req.params.id);
        if (player) {
            player.url = req.body.url;
            return res.status(204).end();
        }
        return res.status(404).end();
    },
    destroy(req, res) {
        var player = playerService.findByName(req.params.id);
        if (player) {
            playerService.deleteByName(req.params.id);
            return res.status(204).end();
        }
        return res.status(404).end();
    }
};