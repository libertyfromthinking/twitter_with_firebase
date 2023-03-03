import { User } from "firebase/auth";
import React from "react";

export type Fn = () => void;
export type NullableUser = User | null;

export interface Profile {
  displayName?: string | null | undefined;
  photoURL?: string | null | undefined;
}
export interface CustomUser {
  displayName: string;
  uid: string;
  photoURL: string;
  updateProfile: (args: Profile) => void;
}
export interface NweetObj {
  id: string;
  text: string;
  fileUrl: string;
  createdAt: Date;
  creatorId: string;
}
