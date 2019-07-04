var kue = require('kue-scheduler');
var Queue = kue.createQueue();

class JobController {
    static create(req, res) {
        const jobs = ['Developer PHP', 'Developer Javascript', 'Developer Android', 'Developer iOS']
        //create a job instance
        var job = Queue
        .createJob('every', data)
        .attempts(3)
        .backoff(backoff)
        .priority('normal');

        //schedule it to run every Thursday at 00:00:00 
        var thursday = '0 0 0 * * 4';
        Queue.every(thursday, job);

        //somewhere process your scheduled jobs
        Queue.process('every', function(job, done) {
            let title = Math.floor(Math.random() * jobs.length)
            Job
            .create(title)
            .then(job => {
                res.status(200).json(job)
            })
            .catch(err => {
                res.status(500).json(err)
            })
            done();
        });
    }
}

module.exports = JobController
