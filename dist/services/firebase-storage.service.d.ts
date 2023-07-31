import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
export declare class FirebaseStorageService {
    private firebaseProvoder;
    constructor(firebaseProvoder: FirebaseProvider);
    uploadProfilePicture(fileName: any, data: any): void;
}
