import {Member} from "@/entity/member.entity";
import {AppDataSource} from "@/config/data-source.config";

export class MemberRepository {
    memberRepository = AppDataSource.getRepository(Member);

    constructor() {}

    count() {
        return this.memberRepository.count();
    }

    findAll() {
        return this.memberRepository.find({
            select: {id: true, name: true}
        });
    }

    saveAll(member: Member[]) {
        return this.memberRepository.save(member);
    }
}