PORT = process.env.PORT || 8080;
DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/pomodoro";
DUMMY_USERNAME = process.env.DUMMY_USERNAME || "dummy";
DUMMY_PASS = process.env.DUMMY_PASS || "pass";
// exports.ADMIN_KEY = process.env.ADMIN_KEY ||
module.exports = {PORT, DATABASE_URL, DUMMY_USERNAME, DUMMY_PASS};
