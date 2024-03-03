
function toJSON () {
    const user = this.toObject()
    delete user.password
    return user
}

export default toJSON