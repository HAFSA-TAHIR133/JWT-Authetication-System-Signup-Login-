  async function up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING, // Make sure STRING is capitalized here too!
      allowNull: false,
      unique: true
    });
  }

  // "down" defines how to undo the migration if something goes wrong
  async function down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING, // Revert it back to what it was before
      allowNull: true
    });
  };