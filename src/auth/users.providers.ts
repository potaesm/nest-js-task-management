import constants from 'src/constants';
import { DataSource } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

export const usersProviders = [
  {
    provide: constants.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      let usersRepository = dataSource.getRepository(User);
      usersRepository = usersRepository.extend({
        async createUser(
          authCredentialsDto: AuthCredentialsDto,
        ): Promise<void> {
          const { username, password } = authCredentialsDto;
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(password, salt);
          const user = usersRepository.create({
            username,
            password: hashedPassword,
          });
          await usersRepository.save(user);
        },
      });
      return usersRepository;
    },
    inject: [constants.DATA_SOURCE],
  },
];
