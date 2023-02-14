import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Helper } from 'src/ultils/helper.ultil';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly helperService: Helper) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any) {
    //logic check authenticate
    return true;
  }
}