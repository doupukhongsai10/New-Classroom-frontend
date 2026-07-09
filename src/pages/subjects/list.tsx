import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { ListView } from "@/components/refine-ui/views/list-view"
import { useMemo, useState } from "react"
import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DEPARTMENT_OPTIONS } from "@/constants"
import { CreateButton } from "@/components/refine-ui/buttons/create"
import { DataTable } from "@/components/refine-ui/data-table/data-table"
import { useTable } from "@refinedev/react-table"
import { Subject } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react";

const SubjectsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const departmentFilters = selectedDepartment === 'all' ? [] : [
    { field: 'department', operator: 'eq' as const, value: selectedDepartment}
  ];
  const searchFilters = searchQuery ? [
    { field: 'name', operator: 'contains' as const, value: searchQuery}
  ] : [];

  const subjectTable = useTable<Subject>({
    columns: useMemo<ColumnDef<Subject>[]>(() =>[
        {
            id: 'code',
            accessorKey: 'code',
            size: 100,
            header: () => (
                <p className="column-title ml-2">Code</p>
            ),
            cell: ({ getValue}) => <Badge>{getValue<string>()}</Badge>
        },
        {
            id: 'name',
            accessorKey: 'name',
            size: 200,
            header: () => (
                <p className="column-title">Name</p>
            ),
            cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
            filterFn: 'includesString'
        },
        {
            id: 'department',
            accessorKey: 'department.name',
            size: 150,
            header: () => (
                <p className="column-title">Department</p>
            ),
            cell: ({ getValue }) => <Badge
            variant="secondary">{getValue<string>()}</Badge>
        },
        {
            id: 'description',
            accessorKey: 'description',
            size: 300,
            header: () => (
                <p className="column-title">Description</p>
            ),
            cell: ({ getValue }) => <span className="truncate 
            line-clamp-2">{getValue<string>()}</span>
        }
    ],[]),
    refineCoreProps: {
        resource: 'subjects',
        pagination: { pageSize: 10, mode: 'server'},
        filters: {
            permanent: [...departmentFilters, ...searchFilters]
        },
        sorters: {
            initial: [
                { field: 'id', order: 'desc'},
            ]
        },
    }
  });
  return (
    <ListView>
        <Breadcrumb />
        <h1 className="page-title">Subjects</h1>
        <div className="intro-row">
            <p className="mb-4">Quick access to essential metrices and management tools.</p>
            <div className="flex items-center justify-between w-full">
                {/* Left side: Search */}
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />

                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="pl-10 w-full border rounded-md px-3 py-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Right side: Department + Create */}
                <div className="flex items-center gap-4 ml-4">
                    <Select
                        value={selectedDepartment}
                        onValueChange={setSelectedDepartment}
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by department" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">
                                All Department
                            </SelectItem>

                            {DEPARTMENT_OPTIONS.map((department) => (
                                <SelectItem
                                    key={department.value}
                                    value={department.value}
                                >
                                    {department.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <CreateButton />
                </div>
            </div>
        </div>
        <DataTable table={subjectTable} />
    </ListView>
  )
}

export default SubjectsList