import { DataSource } from 'typeorm'
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension'
import { UserSeeder } from './user.seeder'
import { PermissionSeeder } from './permission.seeder'

export class MainSeeder implements Seeder {
	async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<void> {
		await runSeeder(dataSource, UserSeeder)
		await runSeeder(dataSource, PermissionSeeder);
	}
}