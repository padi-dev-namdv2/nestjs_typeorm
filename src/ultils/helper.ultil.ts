import { User } from "../module/users/entities/user.entity";
import { Injectable } from "@nestjs/common";
import jwt_decode from "jwt-decode";
import { DataSource } from "typeorm";
import * as Redis from 'redis';

@Injectable()
export class Helper {
  private redisClient: any;

  constructor(private readonly dataSource: DataSource,
  ) {
    this.redisClient = Redis.createClient();
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