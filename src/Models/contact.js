import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";


const Contact = sequelize.define('contactlist',{
    nom : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    phone : {
        type : DataTypes.STRING,
        allowNull : false
    },
    sujet:{
       type : DataTypes.STRING,
        allowNull : false 
    },
    message:{   
       type : DataTypes.STRING,
        allowNull : false 
    },
    read:{
       type : DataTypes.BOOLEAN, 
       defaultValue : false
    }


})

export default Contact;