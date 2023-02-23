import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
/*
 * isUnique is custom  validator is to check if any X colmun of X table is Already exist
 */
@ValidatorConstraint({ async: true })
@Injectable()
export class Unique implements ValidatorConstraintInterface {
  async validate(colmunValue: any, args: ValidationArguments) {
    const params = args.constraints[0];
    try {
      const result = await getRepository(params.table).findOne({
        where: {
          [params.column]: args.value,
        },
      });

      return result ? false : true;
    } catch (error) {
      console.log(error);
    }
  }

  defaultMessage(args: ValidationArguments) {
    const params = args.constraints[0];
    if (!params.message) return `the ${args.property} is already exist`;
    else return params.message;
  }
}
