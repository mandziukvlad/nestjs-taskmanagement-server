import { TasksService } from './tasks.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  public helloWorld(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Post()
  public createTast(
    @Body('title') title,
    @Body('description') description,
  ): Task {
    return this.taskService.createTask(title, description);
  }

  //   @Post()
  //   public createTask(@Body() body): Task {

  //   }
}
