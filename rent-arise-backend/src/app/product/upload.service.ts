import * as fs from 'fs-extra';
import * as path from 'path';

/* @Injectable()
export class UploadService {
  private readonly uploadDir = path.resolve(process.cwd(), 'uploads');

  constructor() {
    fs.ensureDirSync(this.uploadDir);
  }

  async uploadImage(file: FileProductDto, filePath: string): Promise<string> {
    const fullPath = path.join(this.uploadDir, filePath);

    try {
      await fs.ensureDir(path.dirname(fullPath));
      await fs.writeFile(fullPath, file.buffer);
    } catch (err) {
      throw new Error('Erro ao salvar imagem localmente: ' + err.message);
    }

    return `http://localhost:3000/uploads/${filePath}`;
  }
} */

import { createClient } from "@supabase/supabase-js";
import { FileProductDto } from "./dto/file-product-dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UploadService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_KEY as string,
      {
        auth: {
          persistSession: false
        }
      }
    );
  }

  async uploadImage(file: FileProductDto, path: string): Promise<string> {
    const { data, error } = await this.supabase.storage
      .from('products')
      .upload(path, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error || !data?.path) {
      throw new Error(error?.message || 'Erro ao fazer upload');
    }

    const { data: urlData } = this.supabase.storage
      .from('products')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  }
}