import { DataTypes } from "sequelize"
import { BeforeCreate, Column, HasMany, Model, Table } from "sequelize-typescript";
import*as bcrypt from "bcrypt";

@Table({
    tableName: 'articles',
    timestamps: false
})
export class Auth extends Model{

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    username!: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    otp!: string;

    @HasMany(() => Article)
    articles?: Article[];

    @BeforeCreate
    static async hashPassword(user: Auth) {
user.password = await bcrypt.hash(user.password, 10);
}
}

