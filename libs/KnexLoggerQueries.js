const now = require('performance-now');
const logger = require('./Logger').dblogger(module);

const times = {};

const printQueryWithTime = uid => {
  const { startTime, endTime, query } = times[uid];
  const elapsedTime = endTime - startTime;
  let qString = query.sql;
  if (query.bindings.length) {
    query.bindings.forEach(element => {
      qString = qString.replace('?', element);
    });
  }
  const executionTime = +elapsedTime.toFixed(0);
  logger.log({
    level: executionTime >= 100 ? 'warn' : 'info',
    message: `[${elapsedTime.toFixed(3)} ms] ${qString}`
  });
  delete times[uid];
};

module.exports = {
  query: query => {
    const uid = query.__knexQueryUid;
    times[uid] = {
      query,
      startTime: now()
    };
  },
  query_response: (response, query) => {
    const uid = query.__knexQueryUid;
    times[uid].endTime = now();
    printQueryWithTime(uid);
  }
};
