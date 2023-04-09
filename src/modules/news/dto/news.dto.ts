import { IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { constants } from 'src/core';

export class NewsDto {
  @IsNotEmpty()
  @IsString()
  @Max(constants.NEWS_OPTIONS.titleLength)
  @Min(2)
  readonly title: string;

  @IsNotEmpty()
  @Max(constants.NEWS_OPTIONS.slugLength)
  @Min(2)
  readonly slug: string;

  @IsString()
  @IsNotEmpty()
  @Max(constants.NEWS_OPTIONS.summaryLength)
  @Min(2)
  readonly summary: string;
}
