import { IsDefined, IsString } from 'class-validator';

export class DatabaseBaseConfig {
    @IsDefined()
    @IsString()
    public readonly uri: string;
}
