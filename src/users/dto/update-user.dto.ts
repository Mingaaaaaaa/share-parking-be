import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    readonly username?: string;
    readonly phone?: string;
    readonly password?: string;
    readonly role?: string;
}
