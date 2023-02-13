import { User } from "../module/users/entities/user.entity";
import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
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
            select: ["id", "name", "email", "roleId"],
            where: {
                id: decodedHeader['id']
            }
        });
    }

    async deleteCacheUserPaginate(deleteKey: string) {
        const allKeysRedis = await this.getAllKeysRedis();
        console.log(allKeysRedis);
    }

    async getAllKeysRedis() : Promise<string[]> {
        return new Promise((resolve, reject) => {
            const keys = [];
            this.redisClient.scanStream({ match: '*' })
              .on('data', (resultKeys: string[]) => {
                for (const key of resultKeys) {
                  keys.push(key);
                }
              })
              .on('end', () => {
                resolve(keys);
              })
              .on('error', (error) => {
                reject(error);
              });
        });
    }
}