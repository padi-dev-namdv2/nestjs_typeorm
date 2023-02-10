import { HttpStatus, Injectable, Logger } from '@nestjs/common';
const readXlsxFile = require('read-excel-file/node');
import * as Validator from 'validatorjs';
const fs = require('fs');
const { promisify } = require('util');
import path, { join } from 'path';
const bcrypt = require("bcrypt");
import { User } from 'src/module/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
import { async } from 'rxjs';

@Injectable()
export class ImportUser {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>
    ) {}

    async importUser(path: string) {
        const staticPath: string = join(__dirname, '../../../../../') + path;
        const salt = await bcrypt.genSalt(10);
        const password: string = await bcrypt.hash('123456', salt);
        let arrayUsers: Array<any> = [];
        let messageErrors: Array<string> = [];
        await readXlsxFile(path).then((rows: any) => {
            rows.shift();
            rows.forEach((row: any, index: number) => {
                let arrayUser = {
                    name: row[0],
                    email: row[1],
                    password: password,
                    guard: 'aricle'
                };

                let rules = {
                    name: 'required|min:3|max:255',
                    email: 'required|email|max:255|min:6',
                    password: 'required|max:255|min:6'
                };
          
                let validation: Validator = new Validator(arrayUser, rules, 
                    {
                        "email.email": "Email không hợp lệ",
                        "required.email": "Email k đc để trống",
                        "min.name": "Tên phải dài hơn 3 ký tự"
                    });

                if (validation.fails()) {
                    Object.values(validation.errors)
                        .flatMap(item => Object.values(item))
                        .flatMap(errorArray => errorArray)
                        .forEach(error => messageErrors.push(error));
                } else {
                    arrayUsers.push(arrayUser);
                }
            });
        });

        arrayUsers = await this.removeDuplicateObjects(arrayUsers);

        if (Object.keys(arrayUsers).length) {
            messageErrors.unshift('Import success');
            await this.userRepository.insert(arrayUsers);
            await fs.unlinkSync(staticPath);
            return { result: true, message: messageErrors }
        }

        await fs.unlinkSync(staticPath);
        messageErrors.unshift('Import Fail');
        return { result: false, message: messageErrors }
    }

    async removeDuplicateObjects(arrayUsers: Array<any>) {
        let uniqueArr = [];
        for (let i = 0; i < arrayUsers.length; i++) {
            let emptyUser = await this.userRepository.findOne(
                {
                    where: {
                        email: arrayUsers[i].email
                    }
                }
            )

            let checkInArray: boolean = uniqueArr.map(function(e) {
                return e.email;
            }).indexOf(arrayUsers[i].email) === -1;

            if (checkInArray && !emptyUser) {
                uniqueArr.push(arrayUsers[i]);
            }
        }

        return uniqueArr;
      }
}