import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { createPostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // GET /posts
  @Get()
  getPosts(@Query('status') status: 'published' | 'draft') {
    return this.postsService.getPosts(status);
  }

  // GET /posts/:id
  @Get(':id')
  getOnePost(@Param('id') id: string) {
    return this.postsService.getOnePost(+id);
  }

  // POST /posts
  @Post()
  createPost(@Body() createPostDto: createPostDto) {
    return this.postsService.createPost(createPostDto);
  }

  // PUT /posts/:id
  @Put(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(+id, updatePostDto);
  }

  // DELETE /posts/:id
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }
}
