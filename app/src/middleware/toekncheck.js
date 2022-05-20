const Jwt = require("../routes/home/home.jwt");
const UserStorage = require("../model/UserStorage");

const getInfo = async (email) => {
    const info = await UserStorage.getUserInfo(email);
    return {email: info.email, name: info.name}
}

module.exports = {
    
    checkTokens: (redir, opt) => {    
        return async function(req, res, next) {
            if (req.cookies.refreshToken === undefined) {
                return opt?res.redirect(redir):next(); 
            } 
            const accessToken = await Jwt.verify(req.cookies.accessToken);
            const refreshToken = await Jwt.refreshVerify(req.cookies.refreshToken, await UserStorage.getJwtEmail(req.cookies.refreshToken)); // *실제로는 DB 조회
            if (accessToken === null) {
                if (refreshToken === undefined) { // case1: access token과 refresh token 모두가 만료된 경우
                    return opt?res.redirect(redir):next(); 
                } else { // case2: access token은 만료됐지만, refresh token은 유효한 경우
                    const email = await UserStorage.getJwtEmail(req.cookies.refreshToken);
                    const newAccessToken = Jwt.sign(email);
                    res.cookie('accessToken', newAccessToken, {overwrite: true});
                    req.data = await getInfo(email);
                    next();
                }
            } else {
                if (refreshToken === undefined) { // case3: access token은 유효하지만, refresh token은 만료된 경우
                    const newRefreshToken = Jwt.refresh();
                    UserStorage.setJwtToken(accessToken.email, newRefreshToken);
                    res.cookie('refreshToken', newRefreshToken,  {overwrite: true});
                    req.data = await getInfo(accessToken.email);
                    next();
                } else { // case4: accesss token과 refresh token 모두가 유효한 경우
                    req.data = await getInfo(accessToken.email);
                    next(); 
                }
            }
          }
    },

    
}