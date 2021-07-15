import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Task } from './task.model';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  public getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length > 0) {
      return this.taskService.getTasksWithFilters(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get(':id')
  public getTaskById(@Param('id') id: string): Task {
    const task: Task = this.taskService.getTaskById(id);
    if (task) {
      return task;
    }
    throw new NotFoundException();
  }

  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete(':id')
  public deleteTask(@Param('id') id: string): Task[] {
    return this.taskService.deleteTask(id);
  }

  @Patch(':id/status')
  public updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTastStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTastStatusDto;
    const task: Task = this.taskService.updateTaskStatus(id, status);
    if (task) {
      return task;
    }
    throw new NotFoundException();
  }
}

//   @Post()
//   public createTast(
//     @Body('title') title,
//     @Body('description') description,
//   ): Task {
//     return this.taskService.createTask(title, description);
//   }

//   @Post()
//   public createTask(@Body() body): Task {

//   }
