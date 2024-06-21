// src/auth/jwt.strategy.ts
// import { Injectable, Logger } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   private readonly logger = new Logger(JwtStrategy.name);

//   constructor(private readonly configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secret: configService.get('JWT_SECRET'),
//       //   secret: `99cefbde81a7be3d3dac9647c328579f3d5f34a35a216a1529f2f567ad7b846a03bdd7cda5f6db5471180a1b32805316265852860aba607e8a7c0ce3727de125`,
//     });
//     // Print JWT secret for debugging
//     const jwtSecret = this.configService.get('JWT_SECRET');
//     this.logger.debug(
//       `JWT Secre-------------------------------t: ${jwtSecret}`,
//     );
//   }
//   async validate(payload: any) {
//     return { userId: payload.sub, username: payload.username };
//   }
// }

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwtSecret'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
