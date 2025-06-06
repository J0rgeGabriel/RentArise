import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Status } from "../enums/status.enum";
import { Type } from "class-transformer";

export class UpdateContractDto {
  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  description?: string;

  @IsOptional()
  @IsEnum(Status, { message: 'Status must be a valid enum value.' })
  status?: Status;

  @Type(() => Number)
  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Value must be a number with maximum 2 decimal places.' }
  )
  value?: number;

  @IsOptional()
  startDate?: string;

  @IsOptional()
  endDate?: string;
}