import { action, makeAutoObservable, observable, reaction } from "mobx";
import { MBackupInfo, MUser } from "../Models/Index";

export default class SUser {
    @observable user : MUser | null = null;
    @observable backupInfo : MBackupInfo | null = null
}