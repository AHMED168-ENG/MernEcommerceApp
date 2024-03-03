import comparePassword from "./comparePassword";
import createPasswordResetToken from "./createPasswordResetToken";
import toJSON from "./removePassword";



export default function(schema) {
    schema.methods.comparePassword = comparePassword 
    schema.methods.createPasswordResetToken = createPasswordResetToken
    schema.methods.toJSON = toJSON
}