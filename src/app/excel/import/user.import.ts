import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ReadStream } from 'fs';
import * as xlsx from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx';