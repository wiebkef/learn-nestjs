import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
  Render,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { TransformInterceptor } from './transform.interceptor';
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // GET /posts
  @Get()
  /*
   */
  @UseInterceptors(TransformInterceptor)
  @Render('posts')
  getPosts(@Query('status') status: 'published' | 'draft') {
    return status
      ? this.postsService.getPosts(status)
      : this.postsService.getPosts();
  }

  // GET /posts/:id
  @Get(':id')
  @Render('post')
  getOnePost(@Param('id') id: string) {
    /*   getOnePost(@Param('id', ParseIntPipe) id: number) {
     */
    try {
      return this.postsService.getOnePost(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // POST /posts
  @Post()
  createPost(@Body(new ValidationPipe()) createPostDto: CreatePostDto) {
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
