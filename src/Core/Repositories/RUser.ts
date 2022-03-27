import { MBackupInfo, MUser } from "../Models/Index";
import {backupInfo, user} from "../MockData/Index"
let mockUser = user;
let mockBackupInfo  = backupInfo


export interface RUser {
  createUser: (value: MUser) => Promise<void>;
  getUser: () => Promise<MUser>;
  updateName: (value: string) => Promise<void>;
  updateMobileNumber: (value: string) => Promise<void>;
  updateBusinessName: (value: string) => Promise<void>;

  // createBackupInfo: (value: MBackupInfo) => Promise<void>;
  // getBackupInfo: () => Promise<MBackupInfo>;
  // updateBackupInfo: (value: MBackupInfo) => Promise<void>;
}

export class MockUserRepo implements RUser {
  async createUser(value: MUser) {
    mockUser = value;
  }
  async getUser() {
    return mockUser;
  }
  async updateName(value: string) {
    mockUser.name = value;
  }
  async updateMobileNumber(value: string) {
    mockUser.mobileNumber = value;
  }
  async updateBusinessName(value: string) {
    mockUser.businessName = value;
  }
  

  async createBackupInfo(value: MBackupInfo) {
      mockBackupInfo = value;
  }
  async getBackupInfo() {
      return mockBackupInfo;
  }
  async updateBackupInfo(value: MBackupInfo) {
    mockBackupInfo = value;
  }
}