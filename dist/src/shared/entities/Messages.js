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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
const typeorm_1 = require("typeorm");
let Messages = class Messages {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "MessageId" }),
    __metadata("design:type", String)
], Messages.prototype, "messageId", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "Message" }),
    __metadata("design:type", String)
], Messages.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "FromUserId" }),
    __metadata("design:type", String)
], Messages.prototype, "fromUserId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "ToUserId" }),
    __metadata("design:type", String)
], Messages.prototype, "toUserId", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", { name: "DateTime" }),
    __metadata("design:type", Date)
], Messages.prototype, "dateTime", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "IsCustomer", default: () => "false" }),
    __metadata("design:type", Boolean)
], Messages.prototype, "isCustomer", void 0);
Messages = __decorate([
    (0, typeorm_1.Index)("pk_messages_997578592", ["messageId"], { unique: true }),
    (0, typeorm_1.Entity)("Messages", { schema: "dbo" })
], Messages);
exports.Messages = Messages;
//# sourceMappingURL=Messages.js.map