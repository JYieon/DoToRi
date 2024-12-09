const ser = require("../../service/friends/friends_service")
const mctrl = require("../controller") //thema설정하려고 추가

const views = {
    list: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        await ser.pageRead.check(req.session.uid)
        let data = await ser.pageRead.list(req.query.start, req.session.uid)
        res.render("friends/list", { result: data.result, page: data.page, start: data.start, name: req.session.uid, thema })
    },
    alram: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        let data = await ser.pageRead.alram(req.query.start, req.session.uid)
        res.render("friends/alramList", { result: data.result, page: data.page, start: data.start, name: req.session.uid, thema })
    },
    view: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        let result = await ser.pageRead.view(req.query.num)
        console.log("view list : ", result)
        res.render("friends/view", { result, name: req.session.uid, thema })
    },
    friendsview: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        let data = await ser.pageRead.friendsview(req.query.start, req.session.uid)
        res.render("friends/friendsView", { result: data.result, page: data.page, start: data.start, name: req.session.uid, thema })
    }
}
const process = {
    check: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        res.render("friends/insert_form", { name: req.session.uid, body: req.body, thema })
    },
    insert: async (req, res) => {
        await ser.pageInsert.insert(req.body)
        res.send(`<script>
                alert("메세지 전송 완료")
                location.href="/friends"
            </script>`)
    },
    update: async (req, res) => {
        console.log("update : ", req.body)
        let msg = await ser.pageInsert.update(req.body)
        res.send(msg)
    },
    del: (req, res) => {
        console.log("delete : ", req.body)
        ser.pageInsert.del(req.body)
        res.redirect("/friends/alram")
    },
    friendsdel: (req, res) => {
        console.log("friendsdelete : ", req.body.id)
        ser.pageInsert.friendsdel(req.body.id, req.session.uid)
        res.redirect("/friends/friendsview")
    }
}

module.exports = { views, process }