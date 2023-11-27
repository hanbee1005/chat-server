import { RoleType } from "./role.type";

export type MemberCreateRepuest = {
    name: string,
    role: RoleType,
    addresses: MemberAddress[]
}

type MemberAddress = {
    zipcode: string,
    address: string,
}