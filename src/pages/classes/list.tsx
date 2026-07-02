import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useTable } from "@refinedev/react-table";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Class } from "@/types";
import { Badge } from "@/components/ui/badge";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";

const ClassesList = () => {
  const classTable = useTable<Class>({
    columns: useMemo<ColumnDef<Class>[]>(
      () => [
        {
          id: "name",
          accessorKey: "name",
          size: 200,
          header: () => <p className="column-title">Name</p>,
          cell: ({ getValue }) => (
            <span className="text-foreground">{getValue<string>()}</span>
          ),
        },
        {
          id: "subject",
          accessorKey: "subject.name",
          size: 150,
          header: () => <p className="column-title">Subject</p>,
          cell: ({ getValue }) => <Badge variant="secondary">{getValue<string>()}</Badge>,
        },
        {
            id: "teacher",
            accessorKey: "teacher.name",
            size: 150,
            header: () => <p className="column-title">Teacher</p>,
            cell: ({ getValue }) => <Badge variant="secondary">{getValue<string>()}</Badge>,
        },
        {
            id: "capacity",
            accessorKey: "capacity",
            size: 100,
            header: () => <p className="column-title ml-2">Capacity</p>,
            cell: ({ getValue}) => <Badge>{getValue<string>()}</Badge>
        },
        {
            id: "status",
            accessorKey: "status",
            size: 100,
            header: () => <p className="column-title ml-2">Status</p>,
            cell: ({ getValue}) => <Badge>{getValue<string>()}</Badge>
        },
      ],
      []
    ),
    refineCoreProps: {
      resource: "classes",
      pagination: { pageSize: 10, mode: "server" },
      sorters: {
        initial: [{ field: "id", order: "desc" }],
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />
        <h1 className="text-2xl font-bold">Create a Classes</h1>      <div className="intro-row">

        <div className="flex items-center justify-between">
            <p>Manage all the classes in the school.</p>
          <CreateButton resource="classes" />
        </div>
      </div>
      <DataTable table={classTable} />
    </ListView>
  );
};

export default ClassesList;