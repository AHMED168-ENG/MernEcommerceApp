import comparePassword from "./comparePassword";
import createPasswordResetToken from "./createPasswordResetToken";



export default function(schema) {
    schema.methods.comparePassword = comparePassword
    schema.methods.createPasswordResetToken = createPasswordResetToken
}