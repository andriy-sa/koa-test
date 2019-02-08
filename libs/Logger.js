const moment = require('moment');
const { createLogger, format, transports } = require('winston');

const {
  combine, timestamp, label, printf, colorize
} = format;

const consoleTransport = new transports.Console();
consoleTransport.silent = process.env.LOG_ENABLED !== 'true';

const convertTs = ts => moment(ts).format('YYYY-MM-DD HH:mm');

const lFormat = printf(i => `${convertTs(i.timestamp)} ${i.level} [${i.label}]: ${i.message}`);

const dblFormat = printf(i => `${convertTs(i.timestamp)} ${i.level} ${i.message}`);

module.exports = module => {
  const l = module.filename.replace(process.cwd(), '').substr(1);
  return createLogger({
    level: 'verbose',
    format: combine(colorize(), label({ label: l }), timestamp(), lFormat),
    transports: [consoleTransport]
  });
};

module.exports.dblogger = () => createLogger({
  level: 'verbose',
  format: combine(colorize(), label(), timestamp(), dblFormat),
  transports: [consoleTransport]
});
