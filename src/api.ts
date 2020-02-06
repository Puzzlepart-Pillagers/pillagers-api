export module Api {

    export function hello(req, res, next) { res.send(`Hello ${req.params.name}`); return next() }

    export function echo(req, res, next) { res.send(req.params); return next(); }

    export function notFound(req, res, err, cb) {
        res.send('404 not found!');
        return cb();
    }
    export function badRequest(req, res, err, cb) {
        res.send("400 bad request!")
        return cb();
    }
}

export default Api;