const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const UserStorage = require("../../model/UserStorage");

module.exports = {
    sign: (user) => { // access token 발급
      const payload = { // access token에 들어갈 payload
        email: user.email,
      };
      return jwt.sign(payload, secret, { // secret으로 sign하여 발급하고 return
        algorithm: 'HS256', // 암호화 알고리즘
        expiresIn: '1m', 	  // 유효기간
      });
    },
    verify: async (token) => { // access token 검증
      let decoded = null;
      try {
        decoded = jwt.verify(token, secret);

        return decoded;
      } catch (err) {
        return null;
      }
    },

    refresh: () => { // refresh token 발급
      return jwt.sign({}, secret, { // refresh token은 payload 없이 발급
        algorithm: 'HS256',
        expiresIn: '5m',
      });
    },

    refreshforkeep: () => { // refresh token 발급 (자동 로그인용!)
      return jwt.sign({}, secret, { // refresh token은 payload 없이 발급
        algorithm: 'HS256',
        expiresIn: '1d',
      });
    },

    refreshVerify:  async(token, email) => { // refresh token 검증
      try {
        const data = await UserStorage.getJwtToken(email); // refresh token 가져오기
        if (token === data) {
          try {
            return jwt.verify(token, secret);
          } catch (err) {
            return undefined;
          }
        } else {
          return undefined;
        }
      } catch (err) {
        return err;
      }
    },
  };
