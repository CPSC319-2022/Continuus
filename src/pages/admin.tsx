import { type NextPage } from "next";
import Head from "next/head";
import { ReactElement, useMemo, useState } from "react";
import { useTable } from "react-table";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Link from "next/link";


interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    profilePic: ReactElement,
}

const userRoles = ["READER", "CONTRIBUTOR", "ADMIN"]

const Admin: NextPage = () => {
    const [data, setData] = useState(
        [
            {
                id: 1,
                firstName: "Altay",
                lastName: "Batuhan",
                email: "altaybatuhanmail@gmail.com",
                role: "ADMIN",
                profilePic: <div className="w-full flex justify-center">
                    <Link href={"/profile/1"}>
                        <img src="https://i.pravatar.cc/300?img=1" className="w-12 h-12 rounded-full" />
                    </Link>
                </div>,
            },
            {
                id: 2,
                firstName: "Ruby",
                lastName: "McPherson",
                email: "RubyDMcPherson@teleworm.us",
                role: "READER",
                profilePic: <div className="w-full flex justify-center">
                    <Link href={"/profile/2"}>
                        <img src="https://i.pravatar.cc/300?img=2" className="w-12 h-12 rounded-full" />
                    </Link>
                </div>,
            },
            {
                id: 3,
                firstName: "Andrea",
                lastName: "Richmond",
                email: "AndreaMRichmond@rhyta.com",
                role: "CONTRIBUTOR",
                profilePic: <div className="w-full flex justify-center">
                    <Link href={"/profile/3"}>
                        <img src="https://i.pravatar.cc/300?img=3" className="w-12 h-12 rounded-full" />
                    </Link>
                </div>,
            },
            {
                id: 4,
                firstName: "Adam",
                lastName: "Ellis",
                email: "AdamGEllis@jourrapide.com",
                role: "READER",
                profilePic: <div className="w-full flex justify-center">
                    <Link href={"/profile/4"}>
                        <img src="https://i.pravatar.cc/300?img=4" className="w-12 h-12 rounded-full" />
                    </Link>
                </div>,
            },
            {
                id: 5,
                firstName: "John",
                lastName: "Hinton",
                email: "JohnEHinton@dayrep.com",
                role: "READER",
                profilePic: <div className="w-full flex justify-center">
                    <Link href={"/profile/5"}>
                        <img src="https://i.pravatar.cc/300?img=5" className="w-12 h-12 rounded-full" />
                    </Link>
                </div>,
            },
            {
                id: 6,
                firstName: "Laura",
                lastName: "Baker",
                email: "LauraRBaker@teleworm.us",
                role: "ADMIN",
                profilePic: <div className="w-full flex justify-center">
                    <Link href={"/profile/6"}>
                        <img src="https://i.pravatar.cc/300?img=6" className="w-12 h-12 rounded-full" />
                    </Link>
                </div>,
            },
            {
                id: 7,
                firstName: "Cheryl",
                lastName: "Miranda",
                email: "CherylRMiranda@jourrapide.com",
                role: "CONTRIBUTOR",
                profilePic: <div className="w-full flex justify-center">
                    <Link href={"/profile/7"}>
                        <img src="https://i.pravatar.cc/300?img=7" className="w-12 h-12 rounded-full" />
                    </Link>
                </div>,
            },
        ]
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
                <title>Blog Application Admin Panel</title>
                <meta name="description" content="Admin Panel" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="sticky z-20 top-0 h-10 border-b border-b-gray-200 bg-white flex flex-row justify-between items-center px-[2%]">
                <div className="font-bold cursor-default">Continuus</div>
            </div>
            <div className="fixed z-10 top-0 left-0 h-full px-6 mt-10 w-96">
                <div className="flex flex-col w-full">
                    <Link
                        href='/'
                        className="border-l-4 border-solid border-l-white hover:border-l-emerald-400 pl-2 m-2 hover:font-bold"
                    >
                        Blog Feed
                    </Link>
                    <div className="border-l-4 border-solid pl-2 m-2 border-l-emerald-400 font-bold transition-all cursor-pointer">
                        Admin Panel
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center w-full">
                <div className="min-w-[70%] shadow-lg">
                    <table {...getTableProps()} className="mt-3 w-full">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            {...column.getHeaderProps()}
                                            className="border border-solid border-gray-400 bg-white font-bold"
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
                                            if (cell.column.id === "role") {
                                                return (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="p-3 border border-solid border-gray-400"
                                                    >
                                                        <Dropdown
                                                            options={userRoles}
                                                            value={cell.value}
                                                            placeholder="Select an option"
                                                        />
                                                    </td>
                                                )
                                            } else {
                                                return (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="p-3 border border-solid border-gray-400"
                                                    >
                                                        {cell.render('Cell')}
                                                    </td>
                                                )
                                            }
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Admin;
