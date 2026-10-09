import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

export class FilterProductsQueryDto {
  @IsOptional()
  @IsIn(['office', 'electronics'])
  category?: 'office' | 'electronics';

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  limit: number = 5;
}
