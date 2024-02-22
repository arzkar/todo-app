import sequelize from '../db';
import { Model, DataTypes } from 'sequelize';

class Todo extends Model {
  public id!: number;
  public title!: string;
  public completed!: boolean;

  static associate(models: any) {
    Todo.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'todos',
    timestamps: false,
  }
);

export default Todo;
