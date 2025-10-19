import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Loader, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";
import { DataTableProps } from "@/lib/types/app-table";

export default function AppTable<T extends { id: string | number }>({
  data,
  columns,
  title,
  description,
  renderActions,
  actionsLabel = "Actions",
  caption,
  className = "",
  isLoading = false,
  emptyMessage = "No data available",
  error,
  onRowClick,
  retry,
}: Readonly<DataTableProps<T>>) {
  const totalColumns = columns.length + (renderActions ? 1 : 0);
  let tableRow;
  if (isLoading) {
    tableRow = (
      <TableRow>
        <TableCell colSpan={totalColumns} className="text-center p-8">
          <div data-testid="table-loader" className="flex justify-center">
            <Loader className="mr-2 h-6 w-6 animate-spin" />
          </div>
        </TableCell>
      </TableRow>
    );
  } else if (data.length > 0) {
    tableRow = data.map((row) => (
      <TableRow
        key={row.id}
        className={`${onRowClick ? "cursor-pointer hover:bg-muted" : ""}`}
        onClick={onRowClick ? () => onRowClick(row) : undefined}
      >
        {columns.map((col) => {
          const alignClass = col.align === "center" ? "text-center" : "";
          const tableHeadClassName = `px-5 py-3 ${alignClass}`;
          return (
            <TableCell key={String(col.key)} className={tableHeadClassName}>
              {col.render
                ? col.render(row[col.key])
                : String(row[col.key] ?? "")}
            </TableCell>
          );
        })}
        {renderActions && (
          <TableCell className="text-center px-5 py-3">
            {renderActions(row)}
          </TableCell>
        )}
      </TableRow>
    ));
  } else {
    tableRow = (
      <TableRow>
        <TableCell
          colSpan={totalColumns}
          className="text-center p-8 text-muted-foreground"
        >
          {emptyMessage}
        </TableCell>
      </TableRow>
    );
  }
  return (
    <Card className={`gap-0 pt-0 rounded-xl shadow-none overflow-hidden ${className}`}>
      {(title || description) && (
        <CardHeader className="p-3">
          {(title || description) && (
            <div>
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
          )}
        </CardHeader>
      )}

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
              <TableRow className="bg-muted-foreground/10">
                {columns.map((col) => {
                  const alignClass =
                    col.align === "center" ? "text-center" : "";
                  const tableHeadClassName = `px-5 ${alignClass}`;
                  return (
                    <TableHead
                      key={String(col.key)}
                      className={tableHeadClassName}
                    >
                      {col.label}
                    </TableHead>
                  );
                })}
                {renderActions && (
                  <TableHead className="px-5 text-center">
                    {actionsLabel}
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell colSpan={totalColumns} className="text-center p-8">
                    <Button
                      onClick={retry}
                      className="bg-transparent text-muted-foreground shadow-none hover:bg-transparent cursor-pointer"
                    >
                      <RotateCcw />
                      Retry
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                <>{tableRow}</>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
