import bunyan from 'bunyan'

const logger = bunyan.createLogger({name: "custom_logger"})

export default logger;