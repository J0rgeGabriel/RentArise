import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { Status } from "../enums/status.enum";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { UserEntity } from "src/app/user/entity/user.entity";

export class CreateContractDto {
  @IsNotEmpty({ message: 'Description is required.' })
  @IsString({ message: 'Description must be a string.' })
  @ApiProperty({ description: 'Contract description' })
  description: string;

  @IsEnum(Status, { message: 'Status must be a valid enum value.' })
  @ApiProperty({ description: 'Contract status', enum: Status, default: Status.PENDING })
  status?: Status;

  @ApiProperty({ description: 'Contract value'})
  value?: number;

  @IsNotEmpty({ message: 'Start date is required.' })
  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date.' })
  @ApiProperty({ description: 'Start date of the contract', example: '2025-06-10T00:00:00Z' })
  startDate: Date;

  @IsNotEmpty({ message: 'End date is required.' })
  @Type(() => Date)
  @IsDate({ message: 'End date must be a valid date.' })
  @ApiProperty({ description: 'End date of the contract', example: '2025-06-15T00:00:00Z' })
  endDate: Date;

  @IsNotEmpty({ message: 'Product ID is required.' })
  @IsUUID('4', { message: 'Product ID must be a valid UUID.' })
  @ApiProperty({ description: 'ID of the product associated with the contract' })
  productId: string;

  @ApiHideProperty()
  tenant?: UserEntity;
}