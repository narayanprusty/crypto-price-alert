import {
  IsUrl,
} from 'class-validator';

export class WebhookDto {
  @IsUrl()
  url: string;
}