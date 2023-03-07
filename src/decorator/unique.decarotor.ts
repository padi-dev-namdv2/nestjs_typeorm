import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource, getRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
import { Helper } from 'src/ultils/helper.ultil';
import { Inject } from 'typedi';
/*
 * Unique is custom  validator is to check if any X colmun of X table is Already exist
 */
@ValidatorConstraint({ async: true })
@Injectable()
export class Unique implements ValidatorConstraintInterface {
  constructor(private helpService: Helper) {}
  async validate(colmunValue: any, args: ValidationArguments) {
    const params = args.constraints[0];
    const repository = this.helpService
    console.log(repository);
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

