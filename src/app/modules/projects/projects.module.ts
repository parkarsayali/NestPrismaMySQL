import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import ProjectRepository from './projects.repository';
import { ProjectsService } from './projects.service';
import { ProjectController } from './projects.controller';
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service';
import { BackblazeService } from 'src/shared/backblaze/backblaze.service';
import { VercelService } from 'src/shared/vercel/vercel.service';

@Module({
  imports: [PrismaModule],
  providers: [
    ProjectRepository,
    ProjectsService,
    CloudinaryService,
    BackblazeService,
    VercelService,
  ],
  controllers: [ProjectController],
})
export class ProjectsModule {}
