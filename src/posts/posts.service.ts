import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async getPosts(status?: 'published' | 'draft'): Promise<Post[]> {
    return status
      ? this.postModel.find({ status: status }).exec()
      : this.postModel.find().exec();
  }

  // still needs 404 error thrown
  async getOnePost(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
    /*   const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new Error("Post doesn't exist");
    }
    return post; */
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  /*   createPost(createPostDto: createPostDto) {
    const newPost = { ...createPostDto, id: Date.now() };
    this.posts.push(newPost);
    return newPost;
  } */

  updatePost(id: number, updatePostDto: UpdatePostDto) {
    /*  this.posts = this.posts.map((post) => {
      if (post.id === id) {
        return { ...post, ...updatePostDto };
      }
      return post;
    });
    return this.getOnePost(id); */
  }

  deletePost(id: number) {
    /*  const toBeRemoved = this.getOnePost(id);
    this.posts = this.posts.filter((post) => post.id !== id);
    return toBeRemoved;
  } */
  }
}
