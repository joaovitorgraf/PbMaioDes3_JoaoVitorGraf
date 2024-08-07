import { jest } from '@jest/globals';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import UploadUserProfilePictureService from '../../src/modules/users/services/UploadUserProfilePictureService';
import { StandardError } from '../../src/shared/errors/AppError';
import s3 from '../../src/config/aws';

jest.mock('@aws-sdk/s3-request-presigner', () => ({
    getSignedUrl: jest.fn(),
}));

describe('UploadUserProfilePictureService', () => {
    let uploadUserProfilePictureService: UploadUserProfilePictureService;
    const BUCKET_NAME = 'test-bucket';

    beforeAll(() => {
        process.env.S3_BUCKET_NAME = BUCKET_NAME;
    });

    beforeEach(() => {
        uploadUserProfilePictureService = new UploadUserProfilePictureService();
    });

    it('should generate a signed URL for file upload', async () => {
        const mockURL = 'https://signed-url.com' as never;
        const mockFileName = 'test.jpg';
        const mockFileType = 'image/jpeg';

        // Mock de getSignedUrl para resolver com mockURL
        (getSignedUrl as jest.Mock).mockResolvedValue(mockURL);

        const url = await uploadUserProfilePictureService.execute({
            fileName: mockFileName,
            fileType: mockFileType,
        });

        expect(getSignedUrl).toHaveBeenCalledWith(s3, expect.any(PutObjectCommand), {
            expiresIn: 3600,
        });
        expect(url).toBe(mockURL);
    });

    it('should throw an error if URL generation fails', async () => {
        const mockFileName = 'test.jpg';
        const mockFileType = 'image/jpeg';

        // Mock de getSignedUrl para rejeitar com um erro
        (getSignedUrl as jest.Mock).mockImplementation(() => {
            throw new Error('S3 error');
        });

        await expect(
            uploadUserProfilePictureService.execute({
                fileName: mockFileName,
                fileType: mockFileType,
            }),
        ).rejects.toBeInstanceOf(StandardError);

        expect(getSignedUrl).toHaveBeenCalledWith(s3, expect.any(PutObjectCommand), {
            expiresIn: 3600,
        });
    });
});
