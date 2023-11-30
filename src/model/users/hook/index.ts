import mongoose from 'mongoose';
import UserSchema from './../schemas/userSchema';
import HashPassword from "./hashPassword";
import { UserType } from '../../../types/user';



export default function(schema) {
    schema.pre(["save" , "findOneAndUpdate"] , function(next) {
        HashPassword(next , this)})
}