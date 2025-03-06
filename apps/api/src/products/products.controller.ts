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
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { Products } from './entities/products.entity';

const PHOTO_CONFIG = {
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
};

function getImageUrl(file: Express.Multer.File) {
  let imageUrl = 'default.png';

  if (file) {
    const filePath = `./images/${file.originalname}`;

    if (fs.existsSync(filePath)) {
      imageUrl = file.originalname;
    } else {
      imageUrl = file.filename;
    }
  }

  return imageUrl;
}

/* <input type="file" name="image" accept="image/*" /> */

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('url', PHOTO_CONFIG))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductRequestDto,
  ): Promise<Products> {
    return this.productsService.create({
      ...createProductDto,
      url: getImageUrl(file),
    });
  }

  @Get()
  findAll(@Query('order') order: 'ASC' | 'DESC') {
    return this.productsService.findAll(order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  /* ToDo: Si se envia la misma imagen no pasarle el parametro url */
  @Put(':id')
  @UseInterceptors(FileInterceptor('url', PHOTO_CONFIG))
  update(
    @UploadedFile()
    file: Express.Multer.File,
    @Param('id') id: string,
    @Body()
    updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, {
      ...updateProductDto,
      url: getImageUrl(file),
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(+id);
  }
}
