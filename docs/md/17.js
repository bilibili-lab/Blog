

class EventEmitter {
  constructor() {
    this.__event = {}

  }
  on(eventName, cb) {
    const event = this.__event[eventName] || []
    event.push(cb)
    this.__event[eventName] = event
    console.log('this.__event ', this.__event )
    return this

  }
  emit(eventName, ...args) {
    const event = this.__event[eventName] || []
    event.forEach(cb => {
      cb.apply(null, args)
      if (cb.once) {
        event = event.filters(eventCb => eventCb !== cb)
      }
    });

  }
  once(eventName, cb) {
    cb.once = true
    this.on(eventName, cb)
  }
}

const event = new EventEmitter()
event.on('hi',(...args)=>{
  console.log('2222',args)
})
event.emit('hi',12,34)