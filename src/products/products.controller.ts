import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { requestValidationPipe } from '../common/request-validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductsQueryDto } from './dto/filter-products-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body(requestValidationPipe) dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  findFiltered(@Query(requestValidationPipe) query: FilterProductsQueryDto) {
    return this.productsService.findFiltered(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // Already completed: use it to inspect products and compare their state.
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(requestValidationPipe) dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }
}
