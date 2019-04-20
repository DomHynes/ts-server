import { User } from '../entities/User';
import { AuthenticatedRequest, CustomResponse, JWTPayload } from '../types';

class MeController {
  public static details = async (req: AuthenticatedRequest, res: CustomResponse<JWTPayload>) => {
    let user: User;
    try {
      user = await User.findOneOrFail(
        { id: req.user.id },
        {
          relations: ['integrations'],
          select: {
            id: true,
            username: true,
            roles: true,
            integrations: {
              id: true,
              avatar: true,
              username: true,
              service: true,
            },
          },
        },
      );
    } catch (e) {
      return res.status(401).send();
    }

    res.json({
      user,
    });
  };
}

export default MeController;
