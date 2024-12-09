const router = require("express").Router();
const ctrl = require("../../controller/mypage/mypage_ctrl");

// 마이페이지 메인화면
router.get("/", ctrl.views.getMainPage);
// 개인정보 수정 페이지
router.get("/edit", ctrl.views.getEditPage);
// 개인정보 수정 처리
router.post("/edit", ctrl.process.updateInfo);
// 회원탈퇴 페이지
router.get("/delete", ctrl.views.getDeletePage);
// 회원탈퇴 처리
router.post("/delete", ctrl.process.deleteUser);
// 로그아웃 처리
router.post("/logout", ctrl.process.logout);

module.exports = router;