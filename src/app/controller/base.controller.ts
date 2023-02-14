import * as express from 'express'

export abstract class BaseController {
  public jsonResponse(res: express.Response, code: number, message: Array<string> | string) {
    if (code != 200 && code != 201) {
      return res.status(code).json({
        statusCode: code,
        error: message
      });
    }

    return res.status(code).json({
      statusCode: code,
      message: message
    });
  }

  public withData<T>(res: express.Response, dto?: T, message?: Array<string> | string) {
    if (!!dto) {
      res.type('application/json');
      return res.status(200).json({
        statusCode: 200,
        data: dto,
        message: message ? message : 'Lấy dữ liệu thành công!'
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        message: message ? message : 'Success!'
      });
    }
  }

  public errorValidate<T>(res: express.Response, dto?: T) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: dto,
    })
  }

  public created(res: express.Response, message?: string) {
    return this.jsonResponse(res, 201, message ? message : 'Creted Success!');
  }

  public clientError(res: express.Response, message?: Array<string> | string) {
    return this.jsonResponse(res, 400, message ? message : 'Unauthorized');
  }

  public unauthorized(res: express.Response, message?: string) {
    return this.jsonResponse(res, 401, message ? message : 'Unauthorized');
  }

  public paymentRequired(res: express.Response, message?: string) {
    return this.jsonResponse(res, 402, message ? message : 'Payment required');
  }

  public forbidden(res: express.Response, message?: string) {
    return this.jsonResponse(res, 403, message ? message : 'Forbidden');
  }

  public notFound(res: express.Response, message?: string) {
    return this.jsonResponse(res, 404, message ? message : 'Not found');
  }

  public conflict(res: express.Response, message?: string) {
    return this.jsonResponse(res, 409, message ? message : 'Conflict');
  }

  public tooMany(res: express.Response, message?: string) {
    return this.jsonResponse(res, 429, message ? message : 'Too many requests');
  }

  public todo(res: express.Response) {
    return this.jsonResponse(res, 400, 'TODO');
  }

  public errorIntenal(res: express.Response) {
    return this.jsonResponse(res, 500, 'Error Intenal!');
  }
}