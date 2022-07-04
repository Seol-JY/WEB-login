const Jwt = require("../routes/home/home.jwt");
const UserStorage = require("../model/UserStorage");
const ctrl = require("../routes/home/home.ctrl");
const { refresh } = require("../routes/home/home.jwt");

const getInfo = async (email) => {
    const info = await UserStorage.getUserInfo(email);
    return {email: info.email, name: info.name}
}

module.exports = {
    checkTokens: (redir, opt) => {    
        return async function(req, res, next) {
            try {
                if (req.cookies.tokenType === "1") {
                    if (req.cookies.accessToken!=undefined) {
                        req.data = await ctrl.proc.kakaoprofile(req,res);
                        next();
                    } else { return opt?res.redirect(redir):next(); }
                }
                if (req.cookies.refreshToken === undefined) {
                    return opt?res.redirect(redir):next(); 
                } 
                const accessToken = await Jwt.verify(req.cookies.accessToken);
                const refreshToken = await Jwt.refreshVerify(req.cookies.refreshToken, await UserStorage.getJwtEmail(req.cookies.refreshToken));
                if (!accessToken) {
                    if (!refreshToken) { // case1: access token과 refresh token 모두가 만료된 경우
                        return opt?res.redirect(redir):next(); 
                    } else { // case2: access token은 만료됐지만, refresh token은 유효한 경우
                        const email = await UserStorage.getJwtEmail(req.cookies.refreshToken);
                        const newAccessToken = Jwt.sign({email: email});
                        res.cookie('accessToken', newAccessToken, {overwrite: true});
                        res.cookie('tokenType', "0");
                        req.data = await getInfo(email);
                        next();
                    }
                } 
                else {
                    // if (refreshToken === undefined) { // case3: access token은 유효하지만, refresh token은 만료된 경우
                    //     console.log("case3");
                    //     const newRefreshToken = Jwt.refresh();
                    //     UserStorage.setJwtToken(accessToken.email, newRefreshToken);
                    //     res.cookie('refreshToken', newRefreshToken,  {overwrite: true});
                    //     res.cookie('tokenType', "0");
                    //     req.data = await getInfo(accessToken.email);
                    //     next();
                    // }
                    req.data = await getInfo(accessToken.email);  // case4: accesss token과 refresh token 모두가 유효한 경우
                    next(); 
                }
                 
                
            } catch (e) {
                console.log(e);
            }
            
        }
    },

    
}