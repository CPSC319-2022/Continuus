import { type NextPage } from "next";
import Head from "next/head";
import { ReactElement, useMemo } from "react";
import { useTable } from "react-table";

interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    profilePic: ReactElement,
}

const Admin: NextPage = () => {
    const data = useMemo(
        () => [
            {
                id: 1,
                firstName: "Altay",
                lastName: "Batuhan",
                email: "altaybatuhanmail@gmail.com",
                role: "Admin",
                profilePic: <img src="https://i.pravatar.cc/300?img=1" className="w-12 h-12 rounded-full" />,
            }
        ],
        []
    )

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id' as keyof User,
            },
            {
                Header: 'First Name',
                accessor: 'firstName' as keyof User,
            },
            {
                Header: 'Last Name',
                accessor: 'lastName' as keyof User,
            },
            {
                Header: 'E-Mail',
                accessor: 'email' as keyof User,
            },
            {
                Header: 'Role',
                accessor: 'role' as keyof User,
            },
            {
                Header: 'PP',
                accessor: 'profilePic' as keyof User,
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<User>({ columns, data })


    return (
        <>
            <Head>
                <title>Blog Application</title>
                <meta name="description" content="Blog Application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <table {...getTableProps()} className="border border-solid border-black">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="border-2 border-solid border-red-600 bg-blue-300 font-bold"
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="p-3 border-2 border-solid border-black bg-lime-500"
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Admin;
