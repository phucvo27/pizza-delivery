const dev = {
    httpPort: 3000,
    stage: 'development'
}

const production = {
    httpPort: 5000,
    stage: 'production'
}

const currentStage = typeof process.env.NODE_ENV === 'string' && process.env.NODE_ENV === 'production' ? production : dev;

module.exports = currentStage