import {ConnectParametr} from "./connect-param";

export interface Project {
    id: number;
    name: string;
    description: string;
    is_archive: boolean;
    platform: string;
    connect_parameters: ConnectParametr[];
}
