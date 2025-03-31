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
  // No custom init method is needed; Sequelize's Model.init will be used in the TicketFactory function.
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
