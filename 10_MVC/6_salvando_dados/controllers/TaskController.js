const Task = require('../models/task')

module.exports = class TaskController {
    static createTasks(req, res) {
        res.render('tasks/create')
    }

    static showTasks(req, res) {
        res.render('tasks/all')
    }
}