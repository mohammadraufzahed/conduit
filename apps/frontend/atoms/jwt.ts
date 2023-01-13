import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "jwt",
});

const jwt = atom<null | string>({
  key: "jwt",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default jwt;
