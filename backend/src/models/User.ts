import sequelize from '../db';
import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;

  static associate(models: any) {
    User.hasMany(models.Todo, {
      foreignKey: 'userId',
      as: 'todos',
    });
  }

  static async generateToken(username: string, password: string) {
    const user = await User.findOne({ where: { username } });
    if (!user || !bcrypt.compareSync(password, user!.password)) {
      throw new Error('Invalid username or password');
    }
    const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
    return token;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  }
);

export default User;
