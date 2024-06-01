const routeUser = require('./UserRoutes');
const routAuth = require('./AuthRoutes');
const routeNewsFeed = require('./NewsFeedRoutes');
const routeComment = require('./CommentRoutes');
const routeLike = require('./LikesRoutes');
const routeFollower = require('./FollowerRoutes');
const routePost = require('./PostRoutes');
const routeStatics = require('./StatisticsRoutes');
const routeProfil = require('./ProfileRoutes');

module.exports = { routeUser, routAuth, routeNewsFeed, routeComment, routeLike, routeFollower, routePost, routeStatics, routeProfil };