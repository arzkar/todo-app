import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class Todo extends Model {
  public id!: number;
  public title!: string;
  public completed!: boolean;
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
