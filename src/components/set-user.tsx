import { cookies } from "next/headers";
import UserPassed from "./user-passed";

const setUser = async () => {
  const allCookies = await cookies();
  const token = allCookies.get("auth");
  if (!token) {
    return;
  }

  return <UserPassed user={JSON.parse(token.value)} />;
};
export default setUser;
