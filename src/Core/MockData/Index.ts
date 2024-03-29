import { MBackupInfo, MCustomer, MEntry, MUser } from "../Models/Index";

export let user: MUser = {
  name: "Govind Rathore",
  mobileNumber: "8769785549",
  businessName: "My business and me",
};

export let backupInfo: MBackupInfo = {
  gmail: "itsmegr876@gmail.com",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  lastBackupTimeStamp: new Date(),
};

export let customers: MCustomer[] = [
  {
    id: 1,
    name: "Gopal Rathore",
    mobileNumber: "9521480753",
    guarantorName: "Govind Rathore",
    guarantorMobileNumber: "9521480753",
    address: "Kanwari",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Tanish Gupta",
    mobileNumber: "9521480753",
    guarantorName: "Tanish Gupta",
    guarantorMobileNumber: "9521480753",
    address: "Kanwari",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Himanshu Sah",
    mobileNumber: "9521480753",
    guarantorName: "Tanish Gupta",
    guarantorMobileNumber: "9521480753",
    address: "Kanwari",
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Gopal Rathore 1",
    mobileNumber: "9521480753",
    guarantorName: "Tanish Gupta",
    guarantorMobileNumber: "9521480753",
    address: "Kanwari",
    createdAt: new Date(),
  },
  {
    id: 5,
    name: "Gopal Rathore 2",
    mobileNumber: "9521480753",
    guarantorName: "Tanish Gupta",
    guarantorMobileNumber: "9521480753",
    address: "Kanwari",
    createdAt: new Date(),
  },
  {
    id: 6,
    name: "Gopal Rathore 3",
    mobileNumber: "9521480753",
    guarantorName: "Tanish Gupta",
    guarantorMobileNumber: "9521480753",
    address: "Kanwari",
    createdAt: new Date(),
  },
  {
    id: 7,
    name: "Gopal Rathore 4",
    mobileNumber: "9521480753",
    guarantorName: "Tanish Gupta",
    guarantorMobileNumber: "9521480753",
    address: "Kanwari",
    createdAt: new Date(),
  },
  {
    id: 8,
    name: "Gopal Rathore 5",
    mobileNumber: "9521480753",
    guarantorName: "Tanish Gupta",
    guarantorMobileNumber: "9521480753",
    address: "Kanwari",
    createdAt: new Date(),
  },
  {
    id: 9,
    name: "Gopal Rathore 3",
    mobileNumber: "9521480753",
    guarantorName: "Tanish Gupta",
    guarantorMobileNumber: "9521480753",
    address: "Kanwari",
    createdAt: new Date(),
  },
  {
    id: 10,
    name: "Gopal Rathore 4",
    mobileNumber: "9521480753",
    guarantorName: "Tanish Gupta",
    guarantorMobileNumber: "9521480753",
    address: "Kanwari",
    createdAt: new Date(),
  },
  {
    id: 11,
    name: "Gopal Rathore 5",
    mobileNumber: "9521480753",
    guarantorName: "Tanish Gupta",
    guarantorMobileNumber: "9521480753",
    address: "Kanwari",
    createdAt: new Date(),
  },
];

export let entries: MEntry[] = [
  {
    id: 1,
    customerId: 1,
    type: "given",
    amount: 10000,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 2,
    customerId: 1,
    type: "collected",
    amount: 100,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 3,
    customerId: 1,
    type: "penalty",
    amount: 30,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 4,
    customerId: 1,
    type: "penalty",
    amount: 20,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 5,
    customerId: 1,
    type: "collected",
    amount: 100,
    desc: "given to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 6,
    customerId: 1,
    type: "collected",
    amount: 100,
    desc: "given to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 7,
    customerId: 1,
    type: "collected",
    amount: 200,
    desc: "given to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 11,
    customerId: 2,
    type: "given",
    amount: 10000,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 12,
    customerId: 2,
    type: "collected",
    amount: 100,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 13,
    customerId: 2,
    type: "collected",
    amount: 100,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 14,
    customerId: 2,
    type: "penalty",
    amount: 20,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 15,
    customerId: 2,
    type: "collected",
    amount: 100,
    desc: "given to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },

  {
    id: 21,
    customerId: 3,
    type: "given",
    amount: 10000,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 22,
    customerId: 3,
    type: "collected",
    amount: 100,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 23,
    customerId: 3,
    type: "collected",
    amount: 200,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 24,
    customerId: 3,
    type: "penalty",
    amount: 20,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 25,
    customerId: 3,
    type: "collected",
    amount: 100,
    desc: "given to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },

  {
    id: 26,
    customerId: 4,
    type: "given",
    amount: 10000,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 27,
    customerId: 4,
    type: "collected",
    amount: 100,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 28,
    customerId: 4,
    type: "collected",
    amount: 200,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 29,
    customerId: 4,
    type: "penalty",
    amount: 20,
    desc: "gievn to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },
  {
    id: 30,
    customerId: 4,
    type: "collected",
    amount: 100,
    desc: "given to govind",
    bills: ["bill1", "bill2"],
    timeStamp: new Date(),
  },

  //
];
