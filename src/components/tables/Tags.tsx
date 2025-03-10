import React from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import { useMissingPersons } from "@/hooks/useMissingPersons";
import { MissingPerson } from "../MissingPerson";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function LoRaTagTable() {
    
  const { missingPersons, loading, error } = useMissingPersons();
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  User
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                  Last Seen
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                  Description
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                  Tag EUI
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {missingPersons.map((person: MissingPerson) => (
                  <TableRow>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Avatar className="w-20 h-20">
                            {/* <AvatarImage src={person.image} alt={person.name} /> */}
                            <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90 hover:underline hover:font-semibold">
                          <Link key={person._id} href={`/tracker?devEUI=${person.devEUI}`}>
                            {person.name}
                          </Link>
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          Age: {person.age}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                          person.status === "Found"
                          ? "success"
                          : person.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                      >
                      {person.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex w-48 content-center">
                    {person.last_seen_location.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {person.description}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {person.devEUI}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
      </div>
    </div>
  );
}
