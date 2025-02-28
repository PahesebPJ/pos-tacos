import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('url', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadFolder = './images';
          if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true }); // ✅ Ensure folder exists
          }
          cb(null, uploadFolder);
        },
        filename: (req, file, cb) => {
          const originalName = file.originalname; // Get original filename
          const filePath = `./images/${originalName}`;

          // ✅ Check if a file with the same name already exists
          if (fs.existsSync(filePath)) {
            return cb(null, originalName); // Reuse the existing filename
          }

          // ✅ If not, save the new file with the same name
          cb(null, originalName);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    let imageUrl = 'default.png';

    if (file) {
      const filePath = `./images/${file.originalname}`;

      if (fs.existsSync(filePath)) {
        imageUrl = file.originalname; // Reuse the same filename
      } else {
        imageUrl = file.filename; // Save the new file
      }
    }

    return this.productsService.create({
      ...createProductDto,
      url: imageUrl,
    });
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  /* ToDo: Si se envia la misma imagen no pasarle el parametro url */
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('url', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadFolder = './images';
          if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true }); // ✅ Ensure folder exists
          }
          cb(null, uploadFolder);
        },
        filename: (req, file, cb) => {
          const originalName = file.originalname; // Get original filename
          const filePath = `./images/${originalName}`;

          // ✅ Check if a file with the same name already exists
          if (fs.existsSync(filePath)) {
            return cb(null, originalName); // Reuse the existing filename
          }

          // ✅ If not, save the new file with the same name
          cb(null, originalName);
        },
      }),
    }),
  )
  update(
    @UploadedFile()
    file: Express.Multer.File,
    @Param('id') id: string,
    @Body()
    updateProductDto: UpdateProductDto,
  ) {
    let imageUrl = 'default.png';

    if (file) {
      const filePath = `./images/${file.originalname}`;

      if (fs.existsSync(filePath)) {
        imageUrl = file.originalname; // Reuse the same filename
      } else {
        imageUrl = file.filename; // Save the new file
      }
    }
    return this.productsService.update(+id, {
      ...updateProductDto,
      url: imageUrl,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(+id);
  }
}
