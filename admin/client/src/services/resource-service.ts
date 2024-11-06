import axios, {AxiosResponse} from 'axios';

export class ResourceService {

    private adminServiceDomain: string = !!process.env.ADMIN_SERVICE_DOMAIN ? process.env.ADMIN_SERVICE_DOMAIN : 'localhost:8084';
    private adminServiceProto: string = !!process.env.ADMIN_SERVICE_PROTO ? process.env.ADMIN_SERVICE_PROTO : 'http';

    public async getResources(): Promise<any[]> {
        const res = await axios.get(`${this.adminServiceProto}://${this.adminServiceDomain}/resources`);
        return res.data.resources
    }

    public async patchResource(id: string, val: boolean): Promise<any> {
        const res = await axios.patch(`${this.adminServiceProto}://${this.adminServiceDomain}/resources/${id}/allowDelete`, {allowDelete: val});
        return res.data
    }
}