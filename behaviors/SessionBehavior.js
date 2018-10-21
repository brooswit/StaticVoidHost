const Behavior = require('../classes/Behavior')

module.exports = class SessionBehavior extends Behavior {
    constructor(parent, state) {
        super(parent, state)
        const {ws} = state

        ws.on('message', (msg) => this.handleEvent(JSON.parse(msg)) )
        ws.on('close', () => this.destroy() )

        let ping = 0
        while(true) {
            let snapshot = await session.getSnapshot({ping}) || {ping}
            let startTime = Date.now()
            let raw = JSON.stringify(snapshot)
            await new Promise((done) => ws.send(raw, done))
            let endTime = Date.now()
            ping = endTime - startTime
            let throttle = this._syncThrottle
            let delay = Math.min(Math.max(1, throttle - ping), throttle)
            await new Promise((done) => setTimeout(done, delay))
        }
    }
}