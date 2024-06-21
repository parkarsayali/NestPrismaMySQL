import { Injectable } from '@nestjs/common';
import ProjectRepository from './projects.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepo: ProjectRepository) {}

  async createProject(data: any) {
    try {
      const project = ProjectRepository.create(data);
      return project;
    } catch (error) {
      console.log('Failed to create project service:', error);
    }
  }
}
