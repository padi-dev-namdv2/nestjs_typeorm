import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { Permission } from '../../module/auth/entities/permission.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionSeeder implements Seeder {
    constructor(
        @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
    ) {
    }
	async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<void> {
        const listPermissions: Array<object> = this.getPermissions();
        await this.permissionRepository.insert(listPermissions);
	}

    getPermissions() {
        const role = require('../../config/roles.config');
        var listPermissions: Array<object> = [];
        Object.keys(role.default).map(function (key) {
            Object.keys(role.default[key].permissions).map(function (index) {
                listPermissions.push(role.default[key].permissions[index]);
            });
        });

        return listPermissions;
    }
}