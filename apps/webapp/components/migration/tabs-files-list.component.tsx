"use client";

import { useState } from "react";
import ManagersFilesList from "./managers-list.component";
import CheetisFilesList from "./cheetis-list.component";
import CheetiPaataluFilesList from "./cheeti-paatalu.component";

export default function TabsFilesListComponent() {
  const [activeTab, setActiveTab] = useState<string>("managers");

  function activateTabHandler(tabName: string) {
    setActiveTab(tabName);
  }
  return (
    <div className="w-full">
      <div role="tablist" className="tabs tabs-border">
        <a
          role="tab"
          className={`tab flex-1 ${activeTab === "managers" ? "tab-active" : ""}`}
          onClick={() => activateTabHandler("managers")}
        >
          Managers
        </a>
        <a
          role="tab"
          className={`tab flex-1 ${activeTab === "cheetis" ? "tab-active" : ""}`}
          onClick={() => activateTabHandler("cheetis")}
        >
          Cheeti's
        </a>
        <a
          role="tab"
          className={`tab flex-1 ${activeTab === "cheeti-paatalu" ? "tab-active" : ""}`}
          onClick={() => activateTabHandler("cheeti-paatalu")}
        >
          Cheeti Paatalu
        </a>
      </div>
      <div className="mt-4">
        {activeTab === "managers" && <div>Here we will show Managers List</div>}
        {activeTab === "cheetis" && <div>Here we will show Cheeti's List</div>}
        {activeTab === "cheeti-paatalu" && (
          <div>Here we will show Cheeti Paatalu List</div>
        )}
      </div>
    </div>
  );
}
