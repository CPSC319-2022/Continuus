import { Role, User } from "@prisma/client";
import { createColumnHelper, flexRender, getCoreRowModel, PaginationState, useReactTable } from "@tanstack/react-table";
import { useMemo, useRef, useState } from "react";
import { api } from "~/utils/api";
import { ImageSkeleton } from "./ImageSkeleton";
import { ProfilePicture } from "./ProfilePicture";
import { Spinner } from "./Spinner";
import { TextSkeleton } from "./TextSkeleton";
import { UserRoleDropDown } from "./UserRoleDropDown";
import Modal from 'react-modal';

const columnHelper = createColumnHelper<User>()
{ process.env.NODE_ENV !== 'test' && Modal.setAppElement("#__next") }

const calcMaxPageIndex = (pageSize: number, userCount: number) => Math.ceil(userCount / pageSize) - 1;

export const UserTable: React.FC = () => {
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [roleUpdates, setRoleUpdates] = useState<Map<string, Role>>(new Map());
    const [isLastAdminErrorDisplayed, setIsLastAdminErrorDisplayed] = useState(false);

    const utils = api.useContext();
    const users = api.user.paginatedUsers.useQuery(
        {
            pageIndex,
            pageSize
        },
        {
            keepPreviousData: true
        }
    );
    const userCount = api.user.count.useQuery();
    const updateUser = api.user.batchUpdate.useMutation({
        onSuccess: async (data) => {
            setRoleUpdates(new Map());
            await utils.user.paginatedUsers.invalidate();
            await utils.user.currentUser.invalidate();

            setIsLastAdminErrorDisplayed(data);
        }
    });

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    );

    const columns = useMemo(() => ([
        columnHelper.accessor('id', {
            header: 'ID',
            cell: info => users.isLoading ? <TextSkeleton width={13} /> : info.getValue(),
        }),
        columnHelper.accessor('name', {
            header: 'Name',
            cell: info => users.isLoading ? <TextSkeleton width={8} /> : info.getValue(),
        }),
        columnHelper.display({
            header: 'Picture',
            cell: info => users.isLoading ? <ImageSkeleton size={3}/> : <ProfilePicture size={3} imgUrl={(info.cell.getValue() as User).image} userId={(info.cell.getValue() as User).id}/>,
        }),
        columnHelper.accessor('email', {
            header: 'E-Mail',
            cell: info => users.isLoading ? <TextSkeleton width={12} /> : info.getValue(),
        }),
        columnHelper.accessor('role', {
            header: 'Role',
            cell: info => users.isLoading ? <TextSkeleton width={6} /> : <UserRoleDropDown
                defaultRole={roleUpdates.get(info.row.original.id) || info.getValue()}
                userId={info.row.original.id}
                setRoleUpdate={(userId, role) => setRoleUpdates((oldMap) => {
                    const newMap = structuredClone(oldMap);
                    newMap.set(userId, role);
                    return newMap;
                })}
                removeUpdate={(userId) => setRoleUpdates((oldMap) => {
                    const newMap = structuredClone(oldMap);
                    newMap.delete(userId);
                    return newMap;
                })}
                disabled={updateUser.isLoading}
            />,
        }),
        columnHelper.accessor('createdAt', {
            header: 'Created At',
            cell: info => users.isLoading ? <TextSkeleton width={12} /> : info.getValue().toLocaleString(),
        }),
        columnHelper.accessor('updatedAt', {
            header: 'Updated At',
            cell: info => users.isLoading ? <TextSkeleton width={12} /> : info.getValue().toLocaleString(),
        }),
    ]), [users.isLoading, updateUser.isLoading, users.data])

    const tableData: User[] = useMemo(
        () => ((users.isLoading ? Array(10).fill({}) : (users.data || []))) as User[],
        [users.isLoading, users.data]
    );

    const table = useReactTable({
        data: tableData,
        columns,
        pageCount: calcMaxPageIndex(pageSize, userCount.data || 0) + 1,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        debugTable: true,
    })

    const tableControlsClass = 'border rounded py-1 px-4 transition-colors';
    const previousControlsClass = table.getCanPreviousPage() ? 'hover:bg-highlight-green' : 'cursor-not-allowed bg-gray-50'
    const nextControlsClass = table.getCanNextPage() ? 'hover:bg-highlight-green' : 'cursor-not-allowed bg-gray-50'

    return (
        <>
            <div className="w-full">
                <div className="flex justify-between flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            className={`${tableControlsClass} ${previousControlsClass}`}
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<<'}
                        </button>
                        <button
                            className={`${tableControlsClass} ${previousControlsClass}`}
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<'}
                        </button>
                        <button
                            className={`${tableControlsClass} ${nextControlsClass}`}
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {'>'}
                        </button>
                        <button
                            className={`${tableControlsClass} ${nextControlsClass}`}
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            {'>>'}
                        </button>
                        <span className="flex items-center gap-1">
                            <div>Page</div>
                            <strong>
                                {`${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
                            </strong>
                        </span>
                        <span className="flex items-center gap-1">
                            | Go to page:
                            <select
                                className="w-12"
                                value={table.getState().pagination.pageIndex}
                                onChange={e => {
                                    table.setPageIndex(Number(e.target.value))
                                }}
                            >
                                {[...Array(table.getPageCount()).keys()].map(pageIndex => (
                                    <option key={pageIndex} value={pageIndex}>
                                        {pageIndex + 1}
                                    </option>
                                ))}
                            </select>
                        </span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                        >
                            {[10, 20, 30, 40, 50, 100].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize} users
                                </option>
                            ))}
                        </select>
                    </div>
                    {roleUpdates.size > 0 && (
                        <button
                            className={`px-2 rounded-lg text-white transition-colors ${updateUser.isLoading ? 'bg-blue-700 border cursor-wait' : 'bg-blue-500 hover:bg-blue-600'}`}
                            onClick={() => {
                                updateUser.mutate(
                                    [...roleUpdates.entries()].map(([userId, role]) => ({
                                        where: {
                                            id: userId
                                        },
                                        data: {
                                            role
                                        }
                                    }))
                                );
                            }}
                            disabled={updateUser.isLoading}
                        >
                            {updateUser.isLoading ? <Spinner size={1} /> : <span className="text-base">Save</span>}
                        </button>
                    )}
                </div>
                <div className="relative overflow-x-auto shadow-md rounded-lg mt-2">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-stone-200">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => {
                                        return (
                                            <th key={header.id} colSpan={header.colSpan} className="px-6 py-3">
                                                {header.isPlaceholder ? null : (
                                                    <div>
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                    </div>
                                                )}
                                            </th>
                                        )
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row, i) => {
                                return (
                                    <tr
                                        key={row.id}
                                        className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b hover:bg-gray-100 transition-colors`}
                                    >
                                        {row.getVisibleCells().map(cell => {
                                            return (
                                                <td key={cell.id} className="px-6 py-4">
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                isOpen={isLastAdminErrorDisplayed}
                onRequestClose={() => setIsLastAdminErrorDisplayed(false)}
                contentLabel="Can't remove the last admin"
                overlayClassName="fixed inset-0 z-20 bg-black/75"
                ariaHideApp={process.env.NODE_ENV !== 'test'}
                className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 rounded-md md:w-2/5 z-40"
            >
                <div className="w-full p-4 text-lg text-orange-700 border-b border-b-gray-200">Warning: Can not remove the last admin</div>
                <div className="text-base p-4 font-bold text-orange-600">Please assign another user as Admin before removing the last admin</div>
                <button className="w-full p-2 border-t rounded-b-lg border-gray-200 hover:bg-slate-100 transition-colors text-green-700 font-bold" onClick={() => setIsLastAdminErrorDisplayed(false)}>Ok!</button>
            </Modal>
        </>
    );
}
