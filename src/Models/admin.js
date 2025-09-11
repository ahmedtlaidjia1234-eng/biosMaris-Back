import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";


const Admin = sequelize.define('adminLog',{
    name : {
        type : DataTypes.STRING,
        allowNull : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    auth : {
        type : DataTypes.BOOLEAN,
        defaultValue: false,
    },
    email:{
       type : DataTypes.STRING,
        allowNull : true 
    },
    phone:{
       type : DataTypes.INTEGER,
        allowNull : true 
    }


})

export default Admin;