"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayConnectedUsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const GatewayConnectedUsers_1 = require("../shared/entities/GatewayConnectedUsers");
const Users_1 = require("../shared/entities/Users");
const typeorm_2 = require("typeorm");
let GatewayConnectedUsersService = class GatewayConnectedUsersService {
    constructor(gatewayConnectedUsersRepo) {
        this.gatewayConnectedUsersRepo = gatewayConnectedUsersRepo;
    }
    async findByUserId(userId) {
        try {
            const connectedUser = await this.gatewayConnectedUsersRepo.findOneBy({
                user: { userId },
            });
            if (!connectedUser) {
                return { socketId: "0" };
            }
            return connectedUser;
        }
        catch (e) {
            throw e;
        }
    }
    async add(dto) {
        try {
            return await this.gatewayConnectedUsersRepo.manager.transaction(async (entityManager) => {
                const connectedUser = await entityManager.findOne(GatewayConnectedUsers_1.GatewayConnectedUsers, {
                    where: { user: { userId: dto.userId } },
                    relations: ["user"],
                });
                if (connectedUser) {
                    connectedUser.socketId = dto.socketId;
                    return await entityManager.save(connectedUser);
                }
                else {
                    const newConnectedUser = new GatewayConnectedUsers_1.GatewayConnectedUsers();
                    newConnectedUser.user = await entityManager.findOne(Users_1.Users, {
                        where: { userId: dto.userId },
                    });
                    newConnectedUser.socketId = dto.socketId;
                    return await entityManager.save(newConnectedUser);
                }
            });
        }
        catch (e) {
            throw e;
        }
    }
    async deleteBySocketId(socketId) {
        try {
            return this.gatewayConnectedUsersRepo.delete({ socketId });
        }
        catch (e) {
            throw e;
        }
    }
    async deleteAll() {
        try {
            await this.gatewayConnectedUsersRepo
                .createQueryBuilder()
                .delete()
                .execute();
        }
        catch (e) {
            throw e;
        }
    }
};
GatewayConnectedUsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(GatewayConnectedUsers_1.GatewayConnectedUsers)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GatewayConnectedUsersService);
exports.GatewayConnectedUsersService = GatewayConnectedUsersService;
//# sourceMappingURL=gateway-connected-users.service.js.map