
import { HttpException, HttpStatus } from "@nestjs/common";
import { UseFilters } from "@nestjs/common";
import { HttpExceptionFilter } from "src/app/exceptions/filter.exception";

const multer = require('multer');
const whitelist = [
    'xlsx',
    'csv'
];
import { Response } from "express";

export const excelUploadOptions: any = () => ({
    fileFilter: (req:any, file: any, cb: any, res: Response) => {
        console.log(file.originalname.match(/\.(xls|xlsx)$/));
        if (!whitelist.includes(file.mimetype)) {
            return cb(new HttpException('Không đúng định dạng!', HttpStatus.BAD_REQUEST));
        }

        if (req.headers['content-length'] > 104) {
            return cb(new HttpException('File is > 10mb!', HttpStatus.BAD_REQUEST));
        }
    
        cb(null, true)
    }
});