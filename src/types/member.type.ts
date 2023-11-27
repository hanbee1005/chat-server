import { Member } from "@/entity/member.entity";
import { RoleType } from "./role.type";

export type MemberCreateRepuest = {
    name: string,
    role: RoleType,
    addresses: MemberAddress[]
}

export type MemberUpdateRequest = {
    memberId: Member['id'],
    mbti?: string,
    roles?: RoleType[],
    address?: MemberAddress[]
}

type MemberAddress = {
    zipcode: string,
    address: string,
}