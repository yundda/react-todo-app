// {
//     id: 0,
//     text: "리액트 공부하기",
//     done: false, // TodoList
//   },
const TodoModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Todo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0, // 기본값 false로 설정
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      tableName: "todo",
    }
  );
};

module.exports = TodoModel;
