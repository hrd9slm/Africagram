const routeUser = require('./UserRoutes');
const routAuth = require('./AuthRoutes');
const routeNewsFeed = require('./NewsFeedRoutes');
const routeComment = require('./CommentRoutes');
const routeLike = require('./LikesRoutes');
const routeFollower = require('./FollowerRoutes');
const routePost = require('./PostRoutes');
const routeStatics = require('./StatisticsRoutes');
const routeProfil = require('./ProfileRoutes');
const uplodeImageRouter = require("./uplode-images");
const postRouter = require("./PostRoutes");
const likesRouter = require("./LikesRoutes");
const commentsRouter = require("./CommentRoutes");

module.exports = { routeUser, routAuth, routeNewsFeed, routeComment, routeLike, routeFollower, routePost, routeStatics, routeProfil, uplodeImageRouter, postRouter, likesRouter, commentsRouter };