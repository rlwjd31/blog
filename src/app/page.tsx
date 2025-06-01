import { redirect } from "next/navigation";

export default function Home() {
  // TODO: 나중에 homepage는 landing page인 hero section으로 변경
  redirect("/blog");
}
