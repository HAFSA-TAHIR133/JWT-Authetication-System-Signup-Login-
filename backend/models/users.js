import { DataTypes, Sequelize, STRING } from "sequelize";
import { sequelize } from "../config/database.js";

export const Users=sequelize.define("Users",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,allowNull:true},
    email:{type:DataTypes.STRING,allowNull:false},
    password:{type:DataTypes.STRING,allowNull:false},
    role:{type:DataTypes.STRING,allowNull:false},
    createdAt:{type:DataTypes.DATE,allowNull: false,defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
},{
    freezeTableName:true,
    timestamps:true,
}
);

export default Users;
