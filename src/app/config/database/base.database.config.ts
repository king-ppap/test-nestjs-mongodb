import { IsDefined, IsOptional, IsNumber, IsString } from 'class-validator';

export class DatabaseBaseConfig {
  @IsDefined()
  @IsString()
  public readonly dialect: string;

  @IsDefined()
  @IsString()
  public readonly host: string;

  @IsDefined()
  @IsNumber()
  public readonly port: number = 3306;

  @IsDefined()
  @IsString()
  public readonly database: string;

  @IsDefined()
  @IsString()
  public readonly username: string;

  @IsDefined()
  @IsString()
  public readonly password: string;
}
