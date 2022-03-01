import { action, makeAutoObservable, observable, reaction } from "mobx";
import { MBackupInfo, MUser } from "../Models/Index";
import { RUser } from "../Repositories/RUser";

export default class SUser {
    @observable user : MUser | null = null;
    @observable backupInfo : MBackupInfo | null = null

    constructor(private userRepo : RUser){
    }
}