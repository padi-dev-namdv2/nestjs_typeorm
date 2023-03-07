import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Workbook } from "exceljs";
import * as tmp from 'tmp';
import wrireFile from 'fs/promises';
import { rename } from "fs";
import { HttpException, HttpStatus } from '@nestjs/common';
import { throws } from "assert";
import { HttpExceptionFilter } from "src/app/exceptions/filter.exception";
import { UseFilters } from '@nestjs/common';

const headersTitle = [
    'name',
    'email',
    'ngày tạo'
]

const data = [
    {
        name: 'name',
        email: 'test1@gmail.com',
        created_at: 'test date'
    },
    {
        name: 'name1',
        email: 'test2@gmail.com',
        created_at: 'test date'
    },
    {
        name: 'name3',
        email: 'test2@gmail.com',
        created_at: 'test date'
    }
];

export class ExcelService {
    // @UseFilters(HttpExceptionFilter)
    async userExport() {
        let rows: Array<any> = [];

        rows.push(headersTitle);
        data.forEach((doc) => {
            rows.push(Object.values(doc));
        });

        let book: Workbook = new Workbook();

        let sheet = book.addWorksheet('list_user');

        sheet.addRows(rows);

        tmp.setGracefulCleanup();
        let file = await new Promise((resole, reject) => {
            tmp.file({ discardDescriptor: true, prefix: 'test_excel', unsafeCleanup: true, postfix: '.xlsx'}, async(error: any, file: any) => {
                if (error) {
                    reject(error);
                }

                book.xlsx.writeFile(file).then(() => {
                    resole(file);
                }).catch((err) => {
                    reject(err);
                });
            });
        }).catch ((errorMessage) => {
            throw new HttpException("Write error", HttpStatus.BAD_REQUEST);
        });

        return file;
    }
}

