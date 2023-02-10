import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Helper } from 'src/ultils/helper.ultil';
import { Role } from 'src/module/auth/entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly helperService: Helper) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any) {
    return true;
    // if (!request.headers["x-api-key"]) {
    //   return true;
    // }

    // let link: string = request.route.path;
    // const user = await this.helperService.getAuthUser(request.headers["x-api-key"]);
    // let paths: Array<string> = [];
  
    // if (user.roleId) {
    //   const role = await this.roleRepository.findOne({
    //     select: {
    //       id: true,
    //       name: true,
    //       permissions: {
    //         id: true,
    //         path: true
    //       }
    //     },
    //     relations: {
    //       permissions: true
    //     },
    //     where: {
    //       id: user.roleId
    //     }
    //   });

    //   paths = role.permissions.map(permission => permission.path);
    // }

    // if (!paths.length) {
    //   return false;
    // }

    // return paths.includes(link);
  }
}