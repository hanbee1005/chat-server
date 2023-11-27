import { Member } from "@/entity/member.entity";
import { Role } from "@/entity/role.entity";
import { MemberRepository } from "@/repository/member.repository";
import { RoleRepository } from "@/repository/role.repository";
import { MemberCreateRepuest } from "@/types/member.type";

export class MemberService {
    private memberRepository = new MemberRepository();
    private roleRepository = new RoleRepository();

    constructor() {}

    count() {
        return this.memberRepository.count();
    }

    findAll() {
        return this.memberRepository.findAll();
    }

    async save(member: MemberCreateRepuest) {
        const newMember = await this.createMember(member);
        return this.memberRepository.save(newMember);
    }

    async saveAll(members: MemberCreateRepuest[]) {
        const savedMembers = await Promise.all(members.map(async member => {
            return await this.createMember(member);
        }));

        return this.memberRepository.saveAll(savedMembers);
    }

    async createMember(member: MemberCreateRepuest) {
        let findRole = await this.roleRepository.findByName(member.role);
        if (!findRole) findRole = new Role(member.role);
        return new Member(member.name, [findRole]);
    }
}