import {
  action,
  makeAutoObservable,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";
import { MBackupInfo, MUser } from "../Models/Index";
import { RUser } from "../Repositories/RUser";

export default class SUser {
  user: MUser = {} as MUser;
  backupInfo: MBackupInfo = {} as MBackupInfo;

  constructor(private userRepo: RUser) {
  
    makeObservable(this, {
      user: observable,
      backupInfo: observable,
      fetchData: action,
      fetchUser: action,
      fetchBackupInfo: action,
      updateUserName: action,
      updateMobileNumber: action,
      updateBusinessName: action,
    });
    this.fetchData();
  }

  async fetchData() {
    await this.fetchUser();
    // await this.fetchBackupInfo();
  }

  async fetchUser() {
    let res = await this.userRepo.getUser();
    runInAction(() => {
      this.user = res;
    });
  }
  async fetchBackupInfo() {
    // let res = await this.userRepo.getBackupInfo();
    // runInAction(() => {
    //   this.backupInfo = res;
    // });
  }

  async updateUserName(value: string) {
    await this.userRepo.updateName(value);
    await this.fetchUser();
  }

  async updateMobileNumber(value: string) {
    await this.userRepo.updateMobileNumber(value);
    await this.fetchUser();
  }
  async updateBusinessName(value: string) {
    await this.userRepo.updateBusinessName(value);
    await this.fetchUser();
  }
}
