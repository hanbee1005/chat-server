import { AppDataSource } from '@/config/data-source.config';
import { Address } from '@/entity/address.entity';
import { Member } from '@/entity/member.entity';
import { Role } from '@/entity/role.entity';
import { AddressRepository } from '@/repository/address.repository';
import { MemberRepository } from '@/repository/member.repository';
import { RoleRepository } from '@/repository/role.repository';
import { MemberCreateRepuest, MemberUpdateRequest } from '@/types/member.type';

export class MemberService {
  private memberRepository = new MemberRepository();
  private roleRepository = new RoleRepository();
  private addressRepository = new AddressRepository();

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
    const savedMembers = await Promise.all(
      members.map(async member => {
        return await this.createMember(member);
      }),
    );

    return this.memberRepository.saveAll(savedMembers);
  }

  async createMember(member: MemberCreateRepuest) {
    let findRole = await this.roleRepository.findByName(member.role);
    if (!findRole) findRole = new Role(member.role);

    const newMember = new Member(member.name);
    newMember.roles = [findRole];
    newMember.addresses = member.addresses.map(
      address => new Address(address.zipcode, address.address),
    );

    return newMember;
  }

  async updateMemberInfo(request: MemberUpdateRequest) {
    const member = await this.memberRepository.findById(request.memberId);
    if (!member) throw new Error('member does not exist.');

    if (request.mbti) member.mbti = request.mbti;

    if (request.roles) {
      const roles = await Promise.all(
        request.roles?.map(
          async role => await this.roleRepository.findByName(role),
        ),
      );

      if (roles) {
        member.roles = roles.filter(role => role !== null) as Role[];
      }
    }

    if (request.address) {
      const address = request.address?.map(
        adr => new Address(adr.zipcode, adr.address),
      );
      if (address) member.addresses = address;
    }

    let response: Member;

    const runner = AppDataSource.createQueryRunner();
    try {
      await runner.connect();
      await runner.startTransaction();

      const addressRepo = runner.manager.getRepository(Address);
      const memberRepo = runner.manager.getRepository(Member);

      await addressRepo
        .createQueryBuilder()
        .delete()
        .from(Address)
        .where('member_id = :memberId', { memberId: member.id })
        .execute();

      response = await memberRepo.save(member);

      // throw new Error('강제 에러');

      await runner.commitTransaction();
    } catch (error) {
        console.log(error);
        await runner.rollbackTransaction();
        return Promise.reject(error);
    } finally {
      runner.release();
    }

    return response;
  }
}
