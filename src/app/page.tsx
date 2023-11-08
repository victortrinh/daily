"use client";

import { Card, DarkThemeToggle, Flowbite } from "flowbite-react";

export default function Page() {
  return (
    <Flowbite>
      <div className="bg-slate-200 dark:bg-slate-800 w-full h-full">
        <div className="container mx-auto ">
          <DarkThemeToggle />
          <Card>
            Daily
          </Card>
        </div>
      </div>
    </Flowbite>
  );
}
