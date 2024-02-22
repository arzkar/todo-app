import sequelize from '../db';
import { Model, DataTypes } from 'sequelize';

class Todo extends Model {
  public id!: number;
  public title!: string;
  public completed!: boolean;
  public userId!: number;

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
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'todos',
    timestamps: false,
  }
);

export default Todo;
