import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import { VehiculeTable } from "@/components/mines/vehicule-tale";
import { DrawerDialogAdd } from "@/components/mines/add-vehicule";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DrawerDialogAddUser } from "@/components/mines/add-user";
import { UserTable } from "@/components/mines/user-tables";

export default function Page() {
  return (
    // <SidebarProvider
    //   style={
    //     {
    //       "--sidebar-width": "calc(var(--spacing) * 72)",
    //       "--header-height": "calc(var(--spacing) * 12)",
    //     } as React.CSSProperties
    //   }
    // >
    //   <AppSidebar variant="inset" />
    //   <SidebarInset>
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <Tabs defaultValue="account">
              <TabsList className="mx-6 mb-2">
                <TabsTrigger value="account">Véhicule</TabsTrigger>
                <TabsTrigger value="password">Utilisateurs</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <DrawerDialogAdd />
                <div className="p-4">
                  <VehiculeTable />
                </div>
              </TabsContent>
              <TabsContent value="password">
                <DrawerDialogAddUser/>
                 <div className="p-4">
                  <UserTable/>
                 </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
    //   </SidebarInset>
    // </SidebarProvider>
  );
}
