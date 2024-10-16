import axios, {AxiosResponse} from 'axios';

export class ResourceService {
    public async getResources(): Promise<any[]> {
        const res = await axios.get('http://localhost:8084/resources');
        return res.data.resources
    }

    // public async patchResource(id: string): Promise<any> {
    //     const res = await axios.patch(`http://localhost:8084/resources/${id}/allowDelete`);
    //     return res.data
    // }
}