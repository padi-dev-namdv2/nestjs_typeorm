
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
            fileSize: 1024 * 1024 * 2,
        }
    }),
    fileFilter: (req:any, file: any, cb: any, res: Response) => {
        if (!whitelist.includes(file.mimetype)) {
          return cb(new Error('File is not allowed!'));
        }
    
        cb(null, true)
    }
});