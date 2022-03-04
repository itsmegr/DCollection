export interface MUser {
  name: string;
  mobileNumber: string;
  businessName: string;
}

export interface MCustomer {
  id: number;
  name: string;
  mobileNumber: string;
  address: string;
  guarantorName: string;
  guarantorMobileNumber: string;
  createdAt : Date;
}

export interface MEntry {
  id: number;
  customerId : number;
  type: "given" | "collected" | "penalty";
  amount: number;
  desc: string;
  timeStamp: Date;
  bills: string[];
}

export interface MBackupInfo {
  gmail: string;
  accessToken: string;
  refreshToken: string;
  lastBackupTimeStamp: Date;
}

