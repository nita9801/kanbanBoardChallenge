import { Sequelize, Model, Optional } from 'sequelize';
import * as DataTypes from 'sequelize/types/data-types';
import { User } from './user';

interface TicketAttributes {
  id: number;
  name: string;
  status: string;
  description: string;
  assignedUserId?: number;
}

interface TicketCreationAttributes extends Optional<TicketAttributes, 'id'> {}

export class Ticket extends Model<TicketAttributes, TicketCreationAttributes> {
  static init(arg0: { id: { type: any; autoIncrement: boolean; primaryKey: boolean; }; name: { type: any; allowNull: boolean; }; status: { type: any; allowNull: boolean; }; description: { type: any; allowNull: boolean; }; assignedUserId: { type: any; allowNull: boolean; }; }, arg1: { tableName: string; sequelize: Sequelize; }) {
    throw new Error('Method not implemented.');
  }
  public id!: number;
  public name!: string;
  public status!: string;
  public description!: string;
  public assignedUserId!: number;

  // associated User model
  public readonly assignedUser?: User | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function TicketFactory(sequelize: Sequelize): typeof Ticket {
  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      assignedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tickets',
    }
  );
  return Ticket;
}
