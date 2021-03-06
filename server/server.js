
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const profileRouter = require('./routes/profile.router');
const addTimeRouter = require('./routes/addtime.router');
const manageEmployeeRouter = require('./routes/manageEmployee.router');
const timesheetRouter = require('./routes/timesheet.router');
const notificationRouter = require('./routes/notifications.router');
const reviewRouter = require('./routes/review.router');
const editRouter = require('./routes/editTime.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/profile', profileRouter);
app.use('/addtime', addTimeRouter);
app.use('/manage', manageEmployeeRouter);
app.use('/timesheetreport', timesheetRouter);
app.use('/notification', notificationRouter);
app.use('/review', reviewRouter);
app.use('/edit', editRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
