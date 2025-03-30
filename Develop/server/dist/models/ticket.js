import { Model } from 'sequelize';
import * as DataTypes from 'sequelize/types/data-types';
export class Ticket extends Model {
    static init(arg0, arg1) {
        throw new Error('Method not implemented.');
    }
}
export function TicketFactory(sequelize) {
    Ticket.init({
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
    }, {
        sequelize,
        tableName: 'tickets',
    });
    return Ticket;
}
