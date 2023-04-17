import { Injectable } from '@nestjs/common';
import { createPostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private posts = [
    {
      id: 0,
      title: 'My blog post',
      content:
        'Nisi proident nostrud voluptate tempor ex culpa culpa. Labore labore aliquip amet incididunt duis velit deserunt veniam culpa sint in aliquip consequat deserunt. Occaecat minim aliquip voluptate id eiusmod minim aute. Fugiat Lorem aliqua laboris ex duis elit ex excepteur. Dolor cillum elit ipsum est sint cupidatat culpa et deserunt enim do in nisi.',
      status: 'published',
    },
    {
      id: 1,
      title: 'My second blog post',
      content:
        'Nisi magna non aliquip exercitation quis nulla commodo labore duis. Ullamco esse deserunt ad Lorem pariatur sunt cupidatat aute dolore minim amet. Ea voluptate et dolore ullamco eiusmod qui. Labore et minim irure voluptate aliquip laborum minim quis. Proident sit commodo est eu. Dolor aute dolor amet deserunt id aliquip amet id tempor. Velit minim aute veniam labore ad sit est esse quis velit reprehenderit ea enim.',
      status: 'draft',
    },
    {
      id: 2,
      title: 'My third blog post',
      content:
        'Nisi magna non aliquip exercitation quis nulla commodo labore duis. Ullamco esse deserunt ad Lorem pariatur sunt cupidatat aute dolore minim amet. Ea voluptate et dolore ullamco eiusmod qui. Labore et minim irure voluptate aliquip laborum minim quis. Proident sit commodo est eu. Dolor aute dolor amet deserunt id aliquip amet id tempor. Velit minim aute veniam labore ad sit est esse quis velit reprehenderit ea enim.',
      status: 'published',
    },
  ];

  getPosts(status?: 'published' | 'draft') {
    if (status) {
      return this.posts.filter((posts) => posts.status === status);
    }
    return this.posts;
  }

  getOnePost(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new Error("Post doesn't exist");
    }
    return post;
  }

  createPost(createPostDto: createPostDto) {
    const newPost = { ...createPostDto, id: Date.now() };
    this.posts.push(newPost);
    return newPost;
  }

  updatePost(id: number, updatePostDto: UpdatePostDto) {
    this.posts = this.posts.map((post) => {
      if (post.id === id) {
        return { ...post, ...updatePostDto };
      }
      return post;
    });
    return this.getOnePost(id);
  }

  deletePost(id: number) {
    const toBeRemoved = this.getOnePost(id);
    this.posts = this.posts.filter((post) => post.id !== id);
    return toBeRemoved;
  }
}
