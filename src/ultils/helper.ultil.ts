import { User } from "../module/users/entities/user.entity";
import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import jwt_decode from "jwt-decode";
import { DataSource } from "typeorm";

@Injectable()
export class Helper {
    constructor(private readonly dataSource: DataSource,
    ) {
    }

    async getAuthUser(jwt: string) {
        const decodedHeader: object = jwt_decode(jwt);

        return await this.dataSource.getRepository(User).findOne({
          select: ["id", "name", "email"],
          where: {
              id: decodedHeader['id']
          }
        });
    }
}