import { HttpStatus, Injectable, Logger } from '@nestjs/common';
const readXlsxFile = require('read-excel-file/node');
import * as Validator from 'validatorjs';
const fs = require('fs');
const { promisify } = require('util');
import path, { join } from 'path';

export class ImportUser {
    async importUser(path: string) {
        const staticPath: string = join(__dirname, '../../../../../') + path;
        await readXlsxFile(path).then((rows: any) => {
            rows.shift();
            let arrayUsers: Array<any> = [];
            let messageErrors: Array<string> = [];
            rows.forEach((row: any, index: number) => {
                let arrayUser = {
                    name: row[0],
                    email: row[1],
                    password: '123456'
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
                    Object.keys(validation.errors).forEach((key) => {
                        let item = validation.errors[key];
                        Object.keys(item).forEach((index) => {
                            for (var i in Object.keys(item[index])) {
                                messageErrors.push(item[index][i]);
                            }
                        });
                    })
                } else {
                    arrayUsers.push(arrayUser);
                }
            });
            console.log(messageErrors);
            console.log(arrayUsers);
        });
        await fs.unlinkSync(staticPath); 
    }
}