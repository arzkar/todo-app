import sequelize from '../db';
import { Model, DataTypes } from 'sequelize';

class Todo extends Model {
  public id!: number;
  public title!: string;
  public completed!: boolean;
  public userId!: number;

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
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'todos',
    timestamps: false,
  }
);

export default Todo;
