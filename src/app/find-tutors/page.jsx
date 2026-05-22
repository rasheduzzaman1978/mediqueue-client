import { Suspense } from "react";
import FindTutorsClient from "./FindTutorsClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FindTutorsClient />
    </Suspense>
  );
}