import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

export interface UsersRepository extends Repository<User> {
  createUser: (authCredentialsDto: AuthCredentialsDto) => Promise<void>;
}
