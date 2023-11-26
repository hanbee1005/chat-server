import { Member } from "@/entity/member.entity";
import { Role } from "@/entity/role.entity";
import { MemberRepository } from "@/repository/member.repository";
import { RoleRepository } from "@/repository/role.repository";

export class MemberService {
    private memberRepository = new MemberRepository();
    private roleRepository = new RoleRepository();

    constructor() {}

    async saveAll(members: {name: string, role: 'ADMIN' | 'MEMBER'}[]) {
        // TODO: 여기서부터 다시
        // const savedMembers = await this.memberRepository.saveAll(members.map(member => new Member(member.name, [this.roleRepository.findByName(member.role)])));
        // return savedMembers;
    }
}