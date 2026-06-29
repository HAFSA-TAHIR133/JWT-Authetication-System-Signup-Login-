'use strict';

  export async function up (queryInterface, Sequelize) {
    queryInterface.createTable("Users",{
      id:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
          name:{type:Sequelize.STRING,allowNull:true},
          email:{type:Sequelize.STRING,allowNull:false},
          password:{type:Sequelize.STRING,allowNull:false},
          role:{type:Sequelize.STRING,allowNull:false},
          createdAt:{type:Sequelize.DATE,allowNull: false,defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          },
          updatedAt: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          }
    });
  };

  export async function down (queryInterface, Sequelize) {
    queryInterface.dropTable("Users");
  };
