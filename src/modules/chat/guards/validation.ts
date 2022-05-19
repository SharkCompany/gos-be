import { IS_PUBLIC_KEY } from "@decorator";
import { UserService } from "@modules/user/user.service";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Socket } from "socket.io";

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | any | Promise<boolean | any>> {
    // const client: Socket = context.switchToWs().getClient<Socket>();
    // const authToken: any = client.handshake?.query?.token;

    // const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);
    // console.log("is public", isPublic);
    // if (isPublic) {
    //   return true;
    // }

    // try {
    //   const decoded = this.jwtService.verify(authToken);
    //   const user = await this.userService.getUserById(decoded.id); // response to function
    //   console.log("my love", user);

    //   context.switchToWs().getData().user = user;

    //   return user;
    // } catch (ex) {
    //   return false;
    // }
    return true;
  }
}
