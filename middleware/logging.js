const logging = (req, res, next) => {
    req.time = new Date(Date.now()).toString();
    console.log({'Request Method: ': req.method,'Status Code: ': res.status, 'Request body: ': JSON.stringify(req.body), 'Query Params: ': JSON.stringify(req.query), 'Params: ': JSON.stringify(req.params),'Host: ':req.hostname, 'Path: ':req.path,'Time: ':req.time});
    next()
}

module.exports = { logging }