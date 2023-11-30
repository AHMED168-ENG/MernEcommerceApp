
import Crypto from "crypto"

function createPasswordResetToken() : string {

    let restateToken = Crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = Crypto.createHash("sha256").update(restateToken).digest("hex")
    this.passwordResetExpiration = Date.now() + 10 * 60 * 1000 // 10 mints
    return restateToken
}

export default createPasswordResetToken