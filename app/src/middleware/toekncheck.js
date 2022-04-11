const Jwt = require("../routes/home/home.jwt");
const UserStorage = require("../model/UserStorage");

module.exports = {
  async checkTokens(req, res, next) {
    if (req.cookies.accessToken === undefined) return res.redirect("/login"); 
    const accessToken = await Jwt.verify(req.cookies.accessToken);
    const refreshToken = await Jwt.refreshVerify(req.cookies.refreshToken,"test"); // *실제로는 DB 조회
    if (accessToken === null) {
        if (refreshToken === undefined) { // case1: access token과 refresh token 모두가 만료된 경우
            console.log("만료")
            return res.redirect("/login"); 
        } else { // case2: access token은 만료됐지만, refresh token은 유효한 경우
            const email = await UserStorage.getJwtEmail(req.cookies.refreshToken);
            const newAccessToken = Jwt.sign(email);
            res.cookie('accessToken', newAccessToken, {overwrite: true});
            next();
        }
    } else {
        if (refreshToken === undefined) { // case3: access token은 유효하지만, refresh token은 만료된 경우
            const newRefreshToken = Jwt.refresh();
            UserStorage.setJwtToken(accessToken.eamil, newRefreshToken);
            res.cookie('refreshToken', newRefreshToken);
            next();
        } else { // case4: accesss token과 refresh token 모두가 유효한 경우
            next();
        }
    }
  }
}