const { CronJob } = require('cron');

require('../env.validate.js');
const logger = require('../libs/Logger')(module);

const jobs = [
  new CronJob('* * * * * *', async () => {
    logger.info('tick');
  })
];
// Initial and run jobs
for (let i = 0; i < jobs.length; i += 1) {
  jobs[i].start();
}
