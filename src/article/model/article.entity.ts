import { DataTypes } from "sequelize"
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Auth } from "src/auth/model/auth.entity";

@Table({
    tableName: 'auth',
    timestamps: false
})
export class Article extends Model{

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    title!: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    content!: string;

    @ForeignKey(() => Auth)
    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @BelongsTo(() => Auth)
    user_id!:number;
}

