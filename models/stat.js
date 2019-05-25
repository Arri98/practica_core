

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('stat',
        {
            fecha: {
                type: DataTypes.DATEONLY,
            },
            usuarios: {
                type: DataTypes.INTEGER,
            },
           tips: {
                type: DataTypes.INTEGER,
            },
            quizzes:{
                type: DataTypes.INTEGER,
            }
        });
};
