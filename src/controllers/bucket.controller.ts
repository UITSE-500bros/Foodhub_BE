import { Request, Response } from 'express';
import { bucketService } from '../services';
class BucketController {
  public async getBucket(req: Request, res: Response): Promise<Response> {
    try {
        const result = await bucketService.getBucketBanner();
        return res.status(200).json(result);
      
    } catch (error) {
        console.error('Error getting bucket:', error);
        return res.status(500).json({ message: 'Error getting bucket' });
    }
  }
}
const bucketController = new BucketController();
export default bucketController;