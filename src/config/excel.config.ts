
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
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            cb(null, 'upload/excel');
        },
        filename: (req: any, file: any, cb: any) => {
            cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
        },
        limits: {
            fieldNameSize: 255,
            fileSize: 1048576,
        }
    }),
    fileFilter: (req:any, file: any, cb: any, res: Response) => {
        if (!file.mimetype.includes("excel") && !file.mimetype.includes("spreadsheetml")) {
            return cb(new HttpException('Không đúng định dạng!', HttpStatus.BAD_REQUEST));
        }

        if (req.headers['content-length'] > 1048576) {
            return cb(new HttpException('File excel is > 10mb!', HttpStatus.BAD_REQUEST));
        }
    
        cb(null, true)
    }
});