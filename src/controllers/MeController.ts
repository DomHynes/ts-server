import { Request } from 'express';
import { CustomResponse, JWTPayload } from '../types';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

class MeController {
  public static details = async (req: Request, res: CustomResponse<JWTPayload>) => {
    const UserRepository = getRepository(User);

    let user: User;
    try {
      user = await UserRepository.findOneOrFail(res.locals.id, {
        select: ['id', 'username', 'roles'], //We dont want
      });
    } catch (e) {
      res.status(401).send();
    }

    res.json({
      user,
    });
  };
}

export default MeController;
