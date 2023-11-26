import {Member} from "@/entity/member.entity";
import {AppDataSource} from "@/config/data-source.config";
import { Role } from "@/entity/role.entity";

export class RoleRepository {
    roleRepository = AppDataSource.getRepository(Role);

    constructor() {}

    count() {
        return this.roleRepository.count();
    }

    findAll() {
        return this.roleRepository.find({
            select: {id: true, name: true}
        });
    }

    findByName(name: 'ADMIN' | 'MEMBER') {
        return this.roleRepository.find({
            where: {
                name
            }
        })
    }

    saveAll(roles: Role[]) {
        return this.roleRepository.save(roles);
    }
}