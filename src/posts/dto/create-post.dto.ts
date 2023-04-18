import { MinLength } from 'class-validator';
export class CreatePostDto {
  @MinLength(3)
  title: string;
  content: string;
  status: string;
}
