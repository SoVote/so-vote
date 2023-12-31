'use server'
import { SplitScreen } from "@/components/SplitScreen";
import { Heading } from "@/components/Heading";
import { Target } from "@/components/Target";
import { Discussion } from "@/components/Discussion";

export default async function Home() {
  return (
    <SplitScreen heading={
      <Heading/>
    } target={
      <Target/>
    } discussion={
      <Discussion/>
    }/>
  )
}
