import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany} from "typeorm";
import { Length, IsNotEmpty, MinLength, MaxLength, Validate } from "class-validator";
import { Category } from "../../categories/entities/category.entity";

@Entity('pages')
export class Page {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pr_page: number

    @Column()
    @MaxLength(255)
    pr_type: string

    @Column()
    @MaxLength(255)
    pr_title: string

    @Column()
    pr_cascade: number

    @Column()
    @MaxLength(14)
    pr_expiry: string

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Category, (categories) => categories.page)
    categories: Category
}
