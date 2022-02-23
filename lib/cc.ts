import "reflect-metadata"
import { ValidationError, BadRequestException, ValidationPipe } from '@nestjs/common';
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsInt, IsString, Max, MaxLength, Min } from "class-validator";
import { IntersectionType } from '@nestjs/mapped-types';

const optionalBooleanMapper = new Map([
  ['1', true],
  ['0', false],
]);
function parseOptionalBoolean({ value }: any) {
  console.log(`In parseOptionalBoolean: parsing ${value} (${typeof value})`);
  const bValue = optionalBooleanMapper.get(value.toLowerCase());
  console.log(`In parseOptionalBoolean: parsed ${bValue} (${typeof bValue})`);
  return bValue === undefined ? value : bValue;
}

export class Props {
  @IsInt()
  @Type(() => {
    console.log('In @Type');
    return Number;
  })
  @Min(1)
  @Max(1024)
  count?: number;

  @IsBoolean()
  @Transform(parseOptionalBoolean)
  flag?: boolean;
}
export class Category {
  @IsString()
  @MaxLength(1024)
  category!: String;
}

class Frankenstein extends IntersectionType(Category, Props) {}

const pipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  exceptionFactory: (errors: ValidationError[]) => new BadRequestException({
    message: 'Validation failed',
    payload: errors.map(error => Object.values(error.constraints || {})).reduce((prev, curr) => [...prev, ...curr], []),
  }),
});


async function validate(arg: any) {
  try {
    const obj = await pipe.transform(arg, {
      type: 'query',
      metatype: Frankenstein,
    });
    console.log(obj);
  } catch (e) {
    console.log(e);
  }
}
validate({
  count: '10',
  category: 'foo',
  flag: '0',
});
