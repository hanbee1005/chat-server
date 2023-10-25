import { AppDataSource } from "@/config/data-source.config";
import { Chatroom } from "@/entity/chatroom.entity";

export class ChatroomRepository {
    chatroomRepository = AppDataSource.getRepository(Chatroom);

    constructor() {}

    findAll() {
        return this.chatroomRepository.find({});
    }

    findById(id: string) {
        return this.chatroomRepository.findOneBy({id});
    }

    save(chatroom: Chatroom) {
        return this.chatroomRepository.save(chatroom);
    }
}