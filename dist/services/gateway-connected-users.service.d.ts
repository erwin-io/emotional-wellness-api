import { GatewayConnectedUsers } from "src/shared/entities/GatewayConnectedUsers";
import { Repository } from "typeorm";
export declare class GatewayConnectedUsersService {
    private readonly gatewayConnectedUsersRepo;
    constructor(gatewayConnectedUsersRepo: Repository<GatewayConnectedUsers>);
    findByUserId(userId: string): Promise<GatewayConnectedUsers | {
        socketId: string;
    }>;
    add(dto: {
        userId: string;
        socketId: string;
    }): Promise<GatewayConnectedUsers>;
    deleteBySocketId(socketId: string): Promise<import("typeorm").DeleteResult>;
    deleteAll(): Promise<void>;
}
