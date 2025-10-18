"use client";
import { store } from "@/lib/store";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
