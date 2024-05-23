// index file is the default file that will be loaded

import { Redirect } from "expo-router";

export default function TabIndex() {
  return <Redirect href={"/(admin)/menu/"} />;
}
