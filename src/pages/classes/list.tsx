import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useList } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Class } from "@/types";
import { Badge } from "@/components/ui/badge";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";

const ClassesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | "all">("all");
  const [selectedTeacher, setSelectedTeacher] = useState<string | "all">("all");

  // Fetch subject options
  const { result: subjectsResult } = useList({
    resource: "subjects",
    pagination: { pageSize: 100 },
  });

  // Fetch teacher options
  const { result: teachersResult } = useList({
    resource: "users",
    filters: [{ field: "role", operator: "eq", value: "teacher" }],
    pagination: { pageSize: 100 },
  });

  const subjectOptions = subjectsResult?.data ?? [];
  const teacherOptions = teachersResult?.data ?? [];

  const subjectFilters =
    selectedSubject && selectedSubject !== "all"
      ? [{ field: "subject", operator: "eq" as const, value: selectedSubject }]
      : [];

  const teacherFilters =
    selectedTeacher && selectedTeacher !== "all"
      ? [{ field: "teacher", operator: "eq" as const, value: selectedTeacher }]
      : [];

  const searchFilters = searchQuery
    ? [{ field: "name", operator: "contains" as const, value: searchQuery }]
    : [];
  const classTable = useTable<Class>({
    columns: useMemo<ColumnDef<Class>[]>(
      () => [
        {
          id: "banner",
          accessorKey: "bannerUrl",
          size: 120,
          header: () => <p className="column-title">Banner</p>,
          cell: ({ getValue }) => {
            const url = getValue<string>();
            return url ? (
              <img src={url} alt="Banner" className="h-12 w-20 object-cover rounded" />
            ) : (
              <div className="h-12 w-20 bg-muted rounded" />
            );
          },
        },
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
      filters: {
        permanent: [...subjectFilters, ...teacherFilters, ...searchFilters],
      },
      sorters: {
        initial: [{ field: "id", order: "desc" }],
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />
      <h1 className="text-2xl font-bold">Classes</h1>
      <div className="intro-row">
        <p>Manage all the classes in the school.</p>
        <div className="flex items-center justify-between w-full gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />

            <input
              type="text"
              placeholder="Search by class name..."
              className="pl-10 w-full border rounded-md px-3 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjectOptions.map((s: any) => (
                  <SelectItem key={s.id} value={String(s.id)}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teachers</SelectItem>
                {teacherOptions.map((t: any) => (
                  <SelectItem key={t.id} value={String(t.id)}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <CreateButton resource="classes" />
          </div>
        </div>
      </div>
      <DataTable table={classTable} />
    </ListView>
  );
};

export default ClassesList;