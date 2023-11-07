import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  Document,
  FilterQuery,
  HydratedDocument,
  Model,
  ModifyResult,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  mongo,
} from 'mongoose';
import { Base_Response } from 'src/utils/base-response';

@Injectable()
export class BaseService<T extends Document> {
  public model: Model<T>;
  constructor(public readonly modelParam: Model<T>) {
    this.model = modelParam;
  }

  async findOne(
    conditions: FilterQuery<T>,
    projection: string | Record<string, unknown> = {},
    options: Record<string, unknown> = {},
  ): Promise<Base_Response<T>> {
    const data = await this.model.findOne(
      conditions as FilterQuery<T>,
      projection,
      options,
    );
    if (data) {
      return new Base_Response<T>({ status: 200, success: true, data: data });
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'User doest not exits',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async insertOne(
    data: Partial<Record<keyof T, unknown>>,
  ): Promise<Base_Response<T>> {
    const main = await this.model.create(data);
    if (main) {
      return new Base_Response<T>({ status: 200, success: true, data: main });
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'some thing went wrong',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async find(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T> | null | undefined,
    options?: QueryOptions<T> | null | undefined,
  ): Promise<T[]> {
    const data = await this.model.find(filter, projection, options);
    if (data) return data;
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  async findById(
    id: string,
    projection: string | Record<string, unknown> = {},
    options: Record<string, unknown> = {},
  ): Promise<Base_Response<T>> {
    const data = await this.model.findById(id, projection, options);
    if (data) {
      return new Base_Response<T>({ status: 200, success: true, data: data });
    }
    throw new HttpException('NO CONTENT', HttpStatus.NO_CONTENT);
  }

  async findByIdAndUpdate(
    id: mongo.ObjectId,
    update: UpdateQuery<T>,
    options: Record<string, unknown> = {},
  ): Promise<Base_Response<T>> {
    const data = await this.model.findByIdAndUpdate(id, update, options);
    if (data) {
      return new Base_Response<T>({ status: 200, success: true, data: data });
    }
    throw new HttpException('NO CONTENT', HttpStatus.NO_CONTENT);
  }

  async findOneAndUpdate(
    conditions: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: Record<string, unknown> = {},
  ): Promise<ModifyResult<HydratedDocument<T>>> {
    try {
      return await this.model.findOneAndUpdate(conditions, update, options);
    } catch (err) {
      throw err;
    }
  }

  async updateOne(
    conditions: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: Record<string, unknown> = {},
  ): Promise<any> {
    try {
      return await this.model.updateOne(conditions, update, options);
    } catch (err) {
      throw err;
    }
  }

  async updateMany(
    conditions: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: Record<string, unknown> = {},
  ): Promise<any> {
    try {
      return await this.model.updateMany(conditions, update, options);
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(id: mongo.ObjectId): Promise<Base_Response<T>> {
    const data = await this.model.findByIdAndDelete(id);
    if (data) {
      return new Base_Response<T>({ status: 200, success: true });
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'some thing went wrong',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
