"use client"

import * as React from "react"
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
  ColumnFiltersState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useVehicleModalStore } from "@/store/state"
import { getVehiclesFromApi } from "@/utils/register"
import { DrawerDialogDemo } from "./modifi-drawer"
import { Vehicle } from "@/store/state" 
import { Button } from "../ui/button"
import { DrawerDialogAdd } from "./add-vehicule"

// ✅ Colonnes pour react-table
const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "plateNumber",
    header: "ID",
  },
  {
    accessorKey: "brand",
    header: "Marque",
  },
  {
    accessorKey: "model",
    header: "Modèle",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "year",
    header: "Année",
  },
  {
    accessorKey: "price",
    header: "Prix (€)",
    cell: ({ getValue }) => `${getValue()} €`,
  },
]

export function VehiculeTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const vehicles = useVehicleModalStore((state) => state.vehicles)
  const toggleOpen = useVehicleModalStore((state) => state.toggleModal) // adapte si nécessaire
  const setVehhicule =useVehicleModalStore((state) => state.setVehicle) // adapte si nécessaire
  const reload =useVehicleModalStore((state) => state.reload) // adapte si nécessaire

  React.useEffect(() => {
    getVehiclesFromApi()
  }, [reload])

  const table = useReactTable({
    data: vehicles,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <DrawerDialogDemo />
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell,index) => (
                    <TableCell key={cell.id} onClick={() =>{ toggleOpen?.(cell.row.original.id); setVehhicule(row.original)}} className="cursor-pointer">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun véhicule trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
