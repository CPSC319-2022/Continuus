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
                profilePic: <Link href={"/profile/1"}>
                    <img src="https://i.pravatar.cc/300?img=1" className="w-12 h-12 rounded-full" />
                </Link>,
            },
            {
                id: 2,
                firstName: "Ruby",
                lastName: "McPherson",
                email: "RubyDMcPherson@teleworm.us",
                role: "READER",
                profilePic: <Link href={"/profile/2"}>
                    <img src="https://i.pravatar.cc/300?img=2" className="w-12 h-12 rounded-full" />
                </Link>,
            },
            {
                id: 3,
                firstName: "Andrea",
                lastName: "Richmond",
                email: "AndreaMRichmond@rhyta.com",
                role: "CONTRIBUTOR",
                profilePic: <Link href={"/profile/3"}>
                    <img src="https://i.pravatar.cc/300?img=3" className="w-12 h-12 rounded-full" />
                </Link>,
            },
            {
                id: 4,
                firstName: "Adam",
                lastName: "Ellis",
                email: "AdamGEllis@jourrapide.com",
                role: "READER",
                profilePic: <Link href={"/profile/4"}>
                    <img src="https://i.pravatar.cc/300?img=4" className="w-12 h-12 rounded-full" />
                </Link>,
            },
            {
                id: 5,
                firstName: "John",
                lastName: "Hinton",
                email: "JohnEHinton@dayrep.com",
                role: "READER",
                profilePic: <Link href={"/profile/5"}>
                    <img src="https://i.pravatar.cc/300?img=5" className="w-12 h-12 rounded-full" />
                </Link>,
            },
            {
                id: 6,
                firstName: "Laura",
                lastName: "Baker",
                email: "LauraRBaker@teleworm.us",
                role: "ADMIN",
                profilePic: <Link href={"/profile/6"}>
                    <img src="https://i.pravatar.cc/300?img=6" className="w-12 h-12 rounded-full" />
                </Link>,
            },
            {
                id: 7,
                firstName: "Cheryl",
                lastName: "Miranda",
                email: "CherylRMiranda@jourrapide.com",
                role: "CONTRIBUTOR",
                profilePic: <Link href={"/profile/7"}>
                    <img src="https://i.pravatar.cc/300?img=7" className="w-12 h-12 rounded-full" />
                </Link>,
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
            <Link href="/">Blog</Link>
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
                        console.log(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    if (cell.column.id === "role") {
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                className="p-3 border-2 border-solid border-black bg-lime-200"
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
                                                className="p-3 border-2 border-solid border-black bg-lime-200"
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
        </>
    )
}

export default Admin;
