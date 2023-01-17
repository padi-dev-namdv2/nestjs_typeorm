import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { User } from '../../module/users/entities/user.entity'
import bcrypt from 'bcrypt'
const bcrypt = require("bcrypt");

export class UserSeeder implements Seeder {
	async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<void> {
		const userRepository = dataSource.getRepository(User)
        const salt = await bcrypt.genSalt(10);

        for (var i = 0; i < 10; i++) {
            var userData = await this.randomUser();
            const userExists = await userRepository.findOneBy({ email: userData.email })

            if (!userExists) {
                const newUser = userRepository.create(userData)
                await userRepository.save(newUser)
            }
            i++;
        }
	}

    async randomUser() {
        const salt = await bcrypt.genSalt(10);
        return {
			name: 'Guido Cerqueira',
			email: (Math.random() + 1).toString(36).substring(7) + '@email.com',
            guard: 'aricle',
			password: await bcrypt.hash('test1214', salt)
		};
    }
}