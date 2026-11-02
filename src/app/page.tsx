import { Hero } from "@/sections/hero";
import { Intro } from "@/sections/intro";
import { Featured } from "@/sections/featured";
import { Experiments } from "@/sections/experiments";
import { MultiModel } from "@/sections/multi-model";
import { DigitalIdentity } from "@/sections/digital-identity";
import { Security } from "@/sections/security";
import { AllApplications } from "@/sections/all-applications";
import { WhatIBuild } from "@/sections/what-i-build";
import { Technology } from "@/sections/technology";
import { Ecosystem } from "@/sections/ecosystem";
import { BuildingInPublic } from "@/sections/building-in-public";
import { FinalCta } from "@/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Featured />
      <Experiments />
      <MultiModel />
      <DigitalIdentity />
      <Security />
      <AllApplications />
      <WhatIBuild />
      <Technology />
      <Ecosystem />
      <BuildingInPublic />
      <FinalCta />
    </>
  );
}
