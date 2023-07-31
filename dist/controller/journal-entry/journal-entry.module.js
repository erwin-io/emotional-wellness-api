"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalEntryModule = void 0;
const common_1 = require("@nestjs/common");
const journal_entry_controller_1 = require("./journal-entry.controller");
const JournalEntry_1 = require("../../shared/entities/JournalEntry");
const journal_entry_service_1 = require("../../services/journal-entry.service");
const typeorm_1 = require("@nestjs/typeorm");
const JournalEntryActivity_1 = require("../../shared/entities/JournalEntryActivity");
const HeartRateLog_1 = require("../../shared/entities/HeartRateLog");
const heart_rate_log_module_1 = require("../heart-rate-log/heart-rate-log.module");
const Users_1 = require("../../shared/entities/Users");
const users_module_1 = require("../users/users.module");
let JournalEntryModule = class JournalEntryModule {
};
JournalEntryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            heart_rate_log_module_1.HeartRateLogModule,
            typeorm_1.TypeOrmModule.forFeature([
                Users_1.Users,
                JournalEntry_1.JournalEntry,
                JournalEntryActivity_1.JournalEntryActivity,
                HeartRateLog_1.HeartRateLog,
            ]),
        ],
        controllers: [journal_entry_controller_1.JournalEntryController],
        providers: [journal_entry_service_1.JournalEntryService],
        exports: [journal_entry_service_1.JournalEntryService],
    })
], JournalEntryModule);
exports.JournalEntryModule = JournalEntryModule;
//# sourceMappingURL=journal-entry.module.js.map