import {ProjectSetting} from "./projectsettings";
export class User {
    id!: number;
    first_name!: string;
    last_name!: string;
    email!: string;
    extId!: string;
    login1c!:string;
    is_admin!: boolean;
    // project_settings!: ProjectSetting[];
}
