module.exports = (target, duration, message) =>
    target.send(message).then(msg => msg.delete({timeout: duration}))