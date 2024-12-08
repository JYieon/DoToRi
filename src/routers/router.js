module.exports = (app) => {
    app.use((req, res, next) => {
        res.locals.username = req.session.name || null;
        next();
    });

    const memberRouter = require("../routers/member/member_router");
    app.use("/member", memberRouter)

    const gameRouter = require("../routers/game/game_router")
    app.use("/game", gameRouter)

    const boardRouter = require("../routers/board/board_router")
    app.use("/board", boardRouter)

    const productRouter = require("../routers/product/product_router")
    app.use("/product", productRouter)

    const mypageRouter = require("../routers/mypage/mypage_router")
    app.use("/mypage", mypageRouter)

    const friendsRouter = require("../routers/friends/friends_router")
    app.use("/friends", friendsRouter)

    const router = require("express").Router();
    router.get("/", (req, res) => {
        res.render("main_cover", { id: req.session.uid })
    })
    router.get("/main", (req, res) => {
        res.render("main")
    })

    

    return router;
}