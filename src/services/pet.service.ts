import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { extname } from "path";
import { PetDto } from "src/core/dto/pet/pet.dto";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { Files } from "src/shared/entities/Files";
import { Pet } from "src/shared/entities/Pet";
import { Users } from "src/shared/entities/Users";
import { EntityManager, Repository } from "typeorm";
import { v4 as uuid } from "uuid";

@Injectable()
export class PetService {
  constructor(
    private firebaseProvoder: FirebaseProvider,
    @InjectRepository(Pet) private readonly petRepo: Repository<Pet>
  ) {}

  async save(user: Users, dto: PetDto) {
    try {
      return await this.petRepo.manager.transaction(async (entityManager) => {
        let pet = new Pet();
        pet.name = dto.petName;
        if (dto.petProfilePic) {
          const { fileName, data } = dto.petProfilePic;
          const newFileName: string = uuid();
          const bucket = this.firebaseProvoder.app.storage().bucket();

          let file = new Files();
          file.fileName = `${fileName}${extname(fileName)}`;

          const bucketFile = bucket.file(
            `profile/pet/${newFileName}${extname(fileName)}`
          );
          const img = Buffer.from(data, "base64");
          await bucketFile.save(img).then(async () => {
            const url = await bucketFile.getSignedUrl({
              action: "read",
              expires: "03-09-2500",
            });
            file.url = url[0];
            file = await entityManager.save(Files, file);
          });
          pet.profilePicFile = file;
        }
        pet.user = user;
        pet = await entityManager.save(pet);
        return pet;
      });
    } catch (e) {
      throw e;
    }
  }

  async update(userId: string, dto: PetDto) {
    return await this.petRepo.manager.transaction(async (entityManager) => {
      const { petName, petProfilePic } = dto;
      const pet: Pet = await entityManager.findOne(Pet, {
        where: {
          user: {
            userId,
          },
        },
        relations: {
          profilePicFile: true,
          user: true,
        },
      });
      if (!pet) {
        throw new HttpException(`Pet doesn't exist`, HttpStatus.NOT_FOUND);
      }
      pet.name = petName;
      if (petProfilePic) {
        const newFileName: string = uuid();
        const bucket = this.firebaseProvoder.app.storage().bucket();
        if (pet.profilePicFile) {
          try {
            const deleteFile = bucket.file(
              `profile/pet/${pet.profilePicFile.fileName}`
            );
            deleteFile.delete();
          } catch (ex) {
            console.log(ex);
          }
          const file = pet.profilePicFile;
          file.fileName = `${newFileName}${extname(petProfilePic.fileName)}`;

          const bucketFile = bucket.file(
            `profile/pet/${newFileName}${extname(petProfilePic.fileName)}`
          );
          const img = Buffer.from(petProfilePic.data, "base64");
          return await bucketFile.save(img).then(async (res) => {
            console.log("res");
            console.log(res);
            const url = await bucketFile.getSignedUrl({
              action: "read",
              expires: "03-09-2500",
            });

            file.url = url[0];
            pet.profilePicFile = await entityManager.save(Files, file);
            return await entityManager.findOne(Pet, {
              where: { user: { userId } },
              relations: { profilePicFile: true },
            });
          });
        } else {
          const file = new Files();
          file.fileName = `${newFileName}${extname(petProfilePic.fileName)}`;
          const bucketFile = bucket.file(
            `profile/pet/${newFileName}${extname(petProfilePic.fileName)}`
          );
          const img = Buffer.from(petProfilePic.data, "base64");
          return await bucketFile.save(img).then(async () => {
            const url = await bucketFile.getSignedUrl({
              action: "read",
              expires: "03-09-2500",
            });
            file.url = url[0];
            pet.profilePicFile = await entityManager.save(Files, file);
            return await entityManager.findOne(Pet, {
              where: { user: { userId } },
              relations: { profilePicFile: true },
            });
          });
        }
      }
      return await entityManager.save(Pet, pet);
    });
  }
}
