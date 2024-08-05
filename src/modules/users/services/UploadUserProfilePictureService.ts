import s3 from '@config/aws';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { StandardError } from '@shared/errors/AppError';

interface IReq {
    fileName: string;
    fileType: string;
}

class UploadUserProfilePictureService {
    public async execute({ fileName, fileType }: IReq): Promise<string> {
        const BUCKET_NAME = process.env.S3_BUCKET_NAME || '';

        try {
            const command = new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: `profile-picture/${fileName}`,
                ContentType: fileType,
            });

            const uploadURL = await getSignedUrl(s3, command, { expiresIn: 3600 });
            return uploadURL;
        } catch (error) {
            throw new StandardError('Error generating S3 upload URL', 'Internal Server Error', 500);
        }
    }
}

export default UploadUserProfilePictureService;
