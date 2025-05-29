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