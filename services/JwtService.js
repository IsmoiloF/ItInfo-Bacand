/** 
* @class JwtService
*/

const jwt = require("jsonwebtoken")
const config = require("config")

/** 
* @name: JwtService
*/
class JwtService {
    /**
     * JwtService constructor
     * @param accesKey
     * @param refreshKey
     * @param accesTime
     * @param refreshTime
     */
    constructor(accesKey,refreshKey,accesTime,refreshTime){
        this.accesKey = accesKey
        this.refreshKey = refreshKey
        this.accesTime = accesTime
        this.refreshTime = refreshTime
    }

    /**
     * Verify token
     * @param token
     * @param callback
     * @returns {*}
     */
    async verifyAccess(token) {
        return jwt.verify(token,this.accesKey,{})
    }
    async verifyRefresh(token) {
        return jwt.verify(token,this.refreshKey,{})
    }

    generateTokens(payload){
        const accesToken = jwt.sign(payload,this.accesKey,{
            expiresIn:this.accesTime,
        })
        const refreshToken = jwt.sign(payload,this.refreshKey,{
            expiresIn:this.refreshTime,
        })
        return {
            accesToken,
            refreshToken
        }
    }
}

module.exports = new JwtService(
    config.get("access_key"),
    config.get("refresh_key"),
    config.get("acces_time"),
    config.get("refresh_time")
)