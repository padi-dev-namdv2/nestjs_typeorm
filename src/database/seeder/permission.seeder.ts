import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { Permission } from '../../module/auth/entities/permission.entity';

export class PermissionSeeder implements Seeder {
	async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<void> {
        const permissionRepository = dataSource.getRepository(Permission);
        const listPermissions: Array<object> = this.getPermissions();
        await permissionRepository.insert(listPermissions);
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