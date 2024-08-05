import { Request, Response } from 'express';
import UploadUserProfilePictureService from '../services/UploadUserProfilePictureService';
import { StandardError } from '@shared/errors/AppError';

class UserProfilePictureController {
  public async generateUploadURL(req: Request, res: Response): Promise<Response> {
    const fileName = req.query.fileName as string;
    const fileType = req.query.fileType as string;

    if (!fileName || !fileType) {
      throw new StandardError('Missing fileName or fileType query parameters');
    }

    const uploadProfilePicture = new UploadUserProfilePictureService();

    try {
      const uploadURL = await uploadProfilePicture.execute({ fileName, fileType });
      return res.json({ uploadURL });
    } catch (error) {
      console.error('Error generating S3 upload URL', error);
      throw new StandardError('Error generating S3 upload URL', 'Internal Server Error', 500);
    }
  }
}

export default UserProfilePictureController;
