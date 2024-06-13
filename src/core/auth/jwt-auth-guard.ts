// src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_STRATEGY } from 'src/models/constants/jwt-constatnts';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY) {}
