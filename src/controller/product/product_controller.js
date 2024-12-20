const ser = require("../../service/product/product_service")
const commonSer = require("../../service/ser_common")
const mypser = require("../../service/mypage/mypage_service");

const list = async (req, res) => {
    const check = commonSer.sessionCheck(req.session)
    if(check == 0){
        const productList = await ser.productList()
        const thema = await ser.haveThema(req.session.uid)
        const userDotori = await ser.member(req.session.uid)
        const userInfo = await mypser.getUserInfo(req.session.uid); //사용자 사진, 메세지 설정
        req.session.dotori = userInfo.DOTORI
        res.render("product/list", {uid : req.session.uid , list : productList, uThema : thema.uThema, hThema : thema.hThema, uDotori : userDotori.DOTORI})
    }else {
        res.send(check)
    }
    
}

const load = (req, res) => {
    const path = `./thema/${req.query.thema}`
    res.download(path)
}

const purchase = async (req, res) => {
    const result = await ser.loginCheck(req.query.no, req.session.uid)
    const userInfo = await mypser.getUserInfo(req.session.uid); //사용자 사진, 메세지 설정
    req.session.dotori = userInfo.DOTORI
    res.send(result)
}

async function saveThema(req, res) {
    console.log("ctrl saveThema")
    ser.saveThema(req.session.uid, req.query.thema)
    res.redirect("/product")
}

module.exports = {list, load, purchase, saveThema}