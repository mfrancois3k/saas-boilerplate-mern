// INTERFACE ADAPTER LAYER
module.exports = function makeExpressCallback(controller) {
    return (req, res) => {
        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            ip: req.ip,
            method: req.method,
            path: req.path,
            cookies: req.cookies,
            headers: {
                'Content-Type': req.get('Content-Type'),
                Referer: req.get('referer'),
                'User-Agent': req.get('User-Agent'),
                'Authorization': req.get('Authorization'),
                'stripe-signature': req.get('stripe-signature'),
            }
        }
        controller(httpRequest)
            .then(httpResponse => {
                if (httpResponse.headers) {
                    res.set(httpResponse.headers)
                }
                if(httpResponse.clearCookies) {
                    var { name } = httpResponse.clearCookies
                    res.clearCookie(name, { httpOnly: true, secure: false })
                }
                if (httpResponse.cookies) {
                    var { name, value } = httpResponse.cookies
                    res.cookie(name, value, { httpOnly: true, secure: true, sameSite: 'None' })
                }
                
                res.type('json')
                res.status(httpResponse.statusCode).send(httpResponse.body)
            })
            .catch(e => res.status(500).send({ error: 'An unkown error occurred.' }))
    }
}