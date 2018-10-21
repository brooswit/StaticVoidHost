const express = require('express')
const enableWs = require('express-ws')
const path = require('path')

const SessionBehavior = require('./behaviors/SessionBehavior')
const express = require('express')
const enableWs = require('express-ws');
const Element = require('./classes/Element')

module.exports = class StaticVoidHost {
    constructor({syncThrottle, port}) {
        this._port = port || process.env.PORT || 8080
        this._syncThrottle = syncThrottle || 1000 / 3

        this._nextElementId = 0
        this._elements = []
        this._Behaviors = []

        const app = express()

        enableWs(app)

        app.use(express.static(path.join(__dirname, 'public')))
          .set('views', path.join(__dirname, 'views'))
          .set('view engine', 'ejs')
          .get('/', this._handleRequest)
          .ws('/stream', this._handleStream)
          .listen(this._port)

        this.registerBehavior(SessionBehavior)
    }

    _handleRequest(req, res) {
        res.render('pages/main', {})
    }

    _handleStream(ws) {
        this.createElement(['SessionBehavior', ws])
    }

    registerBehavior(Behavior) {
        this._Behaviors[Behavior.name] = Behavior;
    }

    createElement(behaviors, state) {
        let id = nextElementId++
        elements[id] = new Element(id, behaviors, state)
    }
}

