import { Subject } from "@/files";

export const MOCK_SUBJECTS: Subject[] = [
    {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        department: "CS",
        description: "An introductory course covering the fundamental concepts of programming and computer science",
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        code: "MATH201",
        name: "Calculus I",
        department: "Math",
        description: "Integration by Parts, Limits, and Series",
        createdAt: new Date().toISOString(),
    },
    {
        id: 3,
        code: "ENG102",
        name: "Literature and Composition",
        department: "English",
        description: "A course focused on critical reading and writing",
        createdAt: new Date().toISOString(),
    }
]