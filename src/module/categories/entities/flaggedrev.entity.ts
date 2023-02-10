import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne} from "typeorm";
import { Length, IsNotEmpty, MinLength, MaxLength, Validate } from "class-validator";
import { Category } from "./category.entity";

@Entity('flaggedrevs')
export class Flaggedrev {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoryId: number

    @Column()
    fr_user: number

    @Column()
    fr_quality: boolean

    @Column()
    fr_timestamp: number

    @Column()
    @MaxLength(255)
    fr_tags: string

    @Column()
    @MaxLength(255)
    fr_flags: string

    @Column()
    fr_rev_timestamp: number

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Category, (category) => category.flaggedrevs)
    category: Category
}
