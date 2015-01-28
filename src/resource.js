import express from "express"

export const resource = (uri, bindables) => {
    var router = express.Router({
        mergeParams: true
    });
    var bind = (key) => {
        return bindables[key].bind(bindables);
    };
    if (bindables.list) {
        router.route(uri).get(bind("list"));
    }
    if (bindables.create) {
        router.route(uri).post(bind("create"));
    }
    if (bindables.update) {
        router.route(`${uri}/:id`).put(bind("update"))
    }
    if (bindables.destroy) {
        router.route(`${uri}/:id`).delete(bind("destroy"))
    }
    if (bindables.fetch) {
        router.route(`${uri}/:id`).get(bind("fetch"))
    }
    return router;
};