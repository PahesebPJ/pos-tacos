import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);

    return this.productRepository.save(newProduct);
  }

  async findAll() {
    const productsFound = await this.productRepository.find();

    if (!productsFound) {
      return new HttpException('Tables not found', HttpStatus.NOT_FOUND);
    }

    return productsFound.map((product) => {
      return {
        ...product,
        url: `http://${'localhost'}:${5000}/images/${product.url}`,
      };
    });
  }

  async findOne(id: number) {
    const productFound = await this.productRepository.findOne({
      where: { id },
    });

    if (!productFound) {
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return {
      ...productFound,
      url: `http://${'localhost'}:${5000}/images/${productFound.url}`,
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productFound = await this.productRepository.findOne({
      where: { id },
    });

    if (!productFound) {
      return new HttpException(
        'The table could not be updated, because it does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.productRepository.update(id, updateProductDto);
  }

  async delete(id: number) {
    const rowAffected = await this.productRepository.delete(id);

    if (rowAffected.affected === 0) {
      return new HttpException(
        'The product could not be deleted, because it does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return rowAffected;
  }
}
