import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import type { User } from "../types/user";

const { persistAtom } = recoilPersist({ key: "profile" });

const profile = atom<User>({
  key: "profile",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export default profile;
