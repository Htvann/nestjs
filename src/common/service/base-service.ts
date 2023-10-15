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
} from 'mongoose';

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
  ): Promise<T> {
    try {
      return await this.model.findOne(
        conditions as FilterQuery<T>,
        projection,
        options,
      );
    } catch (err) {
      throw err;
    }
  }

  async insertOne(data: Partial<Record<keyof T, unknown>>): Promise<T> {
    try {
      return await this.model.create(data);
    } catch (err) {
      console.log('chgeck');
      throw err;
    }
  }

  async find(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T> | null | undefined,
    options?: QueryOptions<T> | null | undefined,
  ): Promise<T[]> {
    try {
      const data = await this.model.find(filter, projection, options);
      if (data) return data;
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    } catch (err) {
      throw err;
    }
  }

  async findById(
    id: string,
    projection: string | Record<string, unknown> = {},
    options: Record<string, unknown> = {},
  ): Promise<T> {
    try {
      const data = await this.model.findById(id, projection, options);
      if (data) return data;
      throw new HttpException('NO CONTENT', HttpStatus.NO_CONTENT);
    } catch (err) {
      throw err;
    }
  }

  async findByIdAndUpdate(
    id: string,
    update: UpdateQuery<T>,
    options: Record<string, unknown> = {},
  ): Promise<T> {
    try {
      return await this.model.findByIdAndUpdate(id, update, options);
    } catch (err) {
      throw err;
    }
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
}
