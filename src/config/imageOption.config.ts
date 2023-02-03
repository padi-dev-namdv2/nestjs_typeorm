
import { HttpException, HttpStatus } from "@nestjs/common";
import { UseFilters } from "@nestjs/common";
import { HttpExceptionFilter } from "src/app/exceptions/filter.exception";

const multer = require('multer');
const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
];
import { Response } from "express";

export const fileUploadOptions: any = (folderName: string) => ({
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            cb(null, 'upload/' + folderName);
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
        if (!whitelist.includes(file.mimetype)) {
            return cb(new HttpException('File is not allowed!', HttpStatus.BAD_REQUEST));
        }

        if (req.headers['content-length'] > 1048576) {
            return cb(new HttpException('File is > 10mb!', HttpStatus.BAD_REQUEST));
        }
    
        cb(null, true)
    }
});