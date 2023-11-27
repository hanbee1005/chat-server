import {Member} from "@/entity/member.entity";
import {AppDataSource} from "@/config/data-source.config";
import { Address } from "@/entity/address.entity";

export class AddressRepository {
    addressRepository = AppDataSource.getRepository(Address);

    constructor() {}

    findByMemberId(memberId: Member['id']) {
        return this.addressRepository.find({
            where: {
                member: {
                    id: memberId
                }
            }
        })
    }

    saveAll(addresses: Address[]) {
        return this.addressRepository.save(addresses);
    }

    deleteByMemberId(memberId: Member['id']) {
        return this.addressRepository.createQueryBuilder('address')
        .delete()
        .from(Address)
        .where('address.member_id = :memberId', {memberId});
    }
}