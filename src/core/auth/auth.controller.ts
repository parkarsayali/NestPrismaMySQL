// //

// import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { JwtAuthGuard } from './auth.guard';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('login')
//   async login(@Body() body) {
//     const user = await this.authService.validateUser(
//       body.username,
//       body.password,
//     );
//     if (!user) {
//       return { message: 'Invalid credentials' };
//     }
//     return this.authService.login(user);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Post('protected')
//   getProtected(@Request() req) {
//     return req.user;
//   }
// }

import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';
import { LocalAuthGuard } from './local-auth-guard';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // async login(@Body() body) {
  //   const user = await this.authService.validateUser(
  //     body.username,
  //     body.password,
  //   );
  //   if (!user) {
  //     return { message: 'Invalid credentials' };
  //   }
  //   return this.authService.login(user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('protected')
  // getProtected(@Request() req) {
  //   return req.user;
  // }
  // @Post('login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }
}
