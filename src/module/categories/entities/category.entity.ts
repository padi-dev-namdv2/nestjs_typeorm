import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, ManyToOne} from "typeorm";
import { Length, IsNotEmpty, MinLength, MaxLength, Validate } from "class-validator";
import { Flaggedrev } from "./flaggedrev.entity";
import { Page } from "../../pages/entities/page.entity";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pr_page: number

    @Column()
    @MaxLength(255)
    cat_title: string

    @Column()
    @MaxLength(255)
    pr_title: string

    @Column()
    pageId: number

    @Column()
    cat_subcats: number

    @Column()
    cat_files: number

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Flaggedrev, (flaggedrevs) => flaggedrevs.category)
    flaggedrevs: Flaggedrev

    @ManyToOne(() => Page, (page) => page.categories)
    page: Page
}
