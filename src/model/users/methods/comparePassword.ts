import bcrypt from 'bcrypt';



function comparePassword(password : string ) {
    return bcrypt.compareSync(password , this.password)
}

export default comparePassword;