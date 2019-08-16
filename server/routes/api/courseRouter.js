const verify = require('../../utils').verify;

function Router(app) {
  app.get('/api/courses/registered', function (request, response) {
    const token = request.query.token;

    verify(token)
      .then(() => {
        let registeredCourses = [{
          title: 'Course Title 1',
          duration: '34:12',
          total: 6,
          completed: 3
        }, {
          title: 'Course Title 2',
          duration: '39:10',
          total: 6,
          completed: 6
        },{
          title: 'Course Title 3',
          duration: '14:12',
          total: 6,
          completed: 0
        },{
          title: 'Course Title 4',
          duration: '54:12',
          total: 6,
          completed: 1
        }];

        response.send({
          registeredCourses: registeredCourses
        })
      })
      .catch(err => {
        response.status(401).send({message: err.message});
      })
  });
  app.get('/api/courses/more', function (request, response) {
    const token = request.query.token;

    verify(token)
      .then(() => {
        let moreCourses = [{
          title: 'Course Title 1',
          duration: '34:12',
          category: 'JS',
          total: 3
        }, {
          title: 'Course Title 2',
          duration: '39:10',
          category: 'PHP',
          total: 6
        },{
          title: 'Course Title 3',
          duration: '14:12',
          category: 'JS',
          total: 0
        },{
          title: 'Course Title 4',
          duration: '54:12',
          category: 6,
          total: 1
        }];

        response.send({
          moreCourses: moreCourses
        })
      })
      .catch(err => {
        response.status(401).send({message: err.message});
      })
  });
}

module.exports = Router;
