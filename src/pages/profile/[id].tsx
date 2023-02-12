import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { z } from 'zod';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Post = {
    title: string
    content: string
    comments: Comment[]
}

type Comment = {
    userId: number,
    content: string,
}

const examplePost: Post = {
    title: "GitHub lays off 10% and goes fully remote",
    content: "Source: https://techcrunch.com/2023/02/09/github-lays-off-10-and-goes-fully-remote/ The tech layoffs keep on coming. Microsoft-owned GitHub today announced that it is laying off 10% of its staff through the end of the company’s fiscal year. Before this announcement, which was first reported by Fortune, GitHub had about 3,000 employees. The company will also shutter all of its offices as their leases end, in part because of their low utilization, and move to a remote-first culture. GitHub will also continue its hiring freeze, which it first announced in January, and also make a number of other internal changes to “protect the short-term health” of its business. “We announced a number of difficult but necessary decisions and budgetary realignments to both protect the health of our business in the short term and grant us the capacity to invest in our long-term strategy moving forward. You can view our CEO’s full message to employees with additional details on these changes below,” a company spokesperson told us. In a move that’s a bit unorthodox for a company that has prided itself on remaining independent of its corporate owner, GitHub is also moving to Teams for its video conferencing needs. And as another sign of cost cutting, it’s moving its laptop refresh cycle from three to four years. “Although our entire leadership team has carefully deliberated this step and come to agreement, ultimately, as CEO the decision is mine. I recognize this will be difficult on you all, and we will approach this period with the utmost respect for every Hubber,” GitHub CEO Thomas Dohmke wrote in an email to the company’s staff today. He notes that he wants the company to become the “developer-first engineering system for the world of tomorrow,” with a strong focus on AI. Given GitHub’s recent focus on its Copilot and the overall shift at Microsoft toward AI-everything, that’s maybe not unexpected.",
    comments: [
        {
            userId: 5,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit deserunt eos minus. Adipisci dolor aperiam exercitationem corporis reprehenderit vitae repellat blanditiis quibusdam recusandae numquam. Perferendis nam totam excepturi veritatis modi!"
        },
        {
            userId: 7,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit deserunt eos minus. Adipisci dolor aperiam exercitationem corporis reprehenderit vitae repellat blanditiis quibusdam recusandae numquam. Perferendis nam totam excepturi veritatis modi!"
        },
        {
            userId: 3,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit deserunt eos minus. Adipisci dolor aperiam exercitationem corporis reprehenderit vitae repellat blanditiis quibusdam recusandae numquam. Perferendis nam totam excepturi veritatis modi!"
        },
        {
            userId: 2,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit deserunt eos minus. Adipisci dolor aperiam exercitationem corporis reprehenderit vitae repellat blanditiis quibusdam recusandae numquam. Perferendis nam totam excepturi veritatis modi!"
        },
        {
            userId: 4,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit deserunt eos minus. Adipisci dolor aperiam exercitationem corporis reprehenderit vitae repellat blanditiis quibusdam recusandae numquam. Perferendis nam totam excepturi veritatis modi!"
        },
        {
            userId: 1,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit deserunt eos minus. Adipisci dolor aperiam exercitationem corporis reprehenderit vitae repellat blanditiis quibusdam recusandae numquam. Perferendis nam totam excepturi veritatis modi!"
        },
        {
            userId: 4,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit deserunt eos minus. Adipisci dolor aperiam exercitationem corporis reprehenderit vitae repellat blanditiis quibusdam recusandae numquam. Perferendis nam totam excepturi veritatis modi!"
        },
        {
            userId: 1,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit deserunt eos minus. Adipisci dolor aperiam exercitationem corporis reprehenderit vitae repellat blanditiis quibusdam recusandae numquam. Perferendis nam totam excepturi veritatis modi!"
        },
        {
            userId: 6,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit deserunt eos minus. Adipisci dolor aperiam exercitationem corporis reprehenderit vitae repellat blanditiis quibusdam recusandae numquam. Perferendis nam totam excepturi veritatis modi!"
        },
        {
            userId: 4,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit deserunt eos minus. Adipisci dolor aperiam exercitationem corporis reprehenderit vitae repellat blanditiis quibusdam recusandae numquam. Perferendis nam totam excepturi veritatis modi!"
        }
    ]
}

const users = [
    {
        id: 1,
        firstName: "Altay",
        lastName: "Batuhan",
        email: "altaybatuhanmail@gmail.com",
        role: "ADMIN",
        profilePic: <img src="https://i.pravatar.cc/300?img=1" className="w-12 h-12 rounded-full" />,
    },
    {
        id: 2,
        firstName: "Ruby",
        lastName: "McPherson",
        email: "RubyDMcPherson@teleworm.us",
        role: "READER",
        profilePic: <img src="https://i.pravatar.cc/300?img=2" className="w-12 h-12 rounded-full" />,
    },
    {
        id: 3,
        firstName: "Andrea",
        lastName: "Richmond",
        email: "AndreaMRichmond@rhyta.com",
        role: "CONTRIBUTOR",
        profilePic: <img src="https://i.pravatar.cc/300?img=3" className="w-12 h-12 rounded-full" />,
    },
    {
        id: 4,
        firstName: "Adam",
        lastName: "Ellis",
        email: "AdamGEllis@jourrapide.com",
        role: "READER",
        profilePic: <img src="https://i.pravatar.cc/300?img=4" className="w-12 h-12 rounded-full" />,
    },
    {
        id: 5,
        firstName: "John",
        lastName: "Hinton",
        email: "JohnEHinton@dayrep.com",
        role: "READER",
        profilePic: <img src="https://i.pravatar.cc/300?img=5" className="w-12 h-12 rounded-full" />,
    },
    {
        id: 6,
        firstName: "Laura",
        lastName: "Baker",
        email: "LauraRBaker@teleworm.us",
        role: "ADMIN",
        profilePic: <img src="https://i.pravatar.cc/300?img=6" className="w-12 h-12 rounded-full" />,
    },
    {
        id: 7,
        firstName: "Cheryl",
        lastName: "Miranda",
        email: "CherylRMiranda@jourrapide.com",
        role: "CONTRIBUTOR",
        profilePic: <img src="https://i.pravatar.cc/300?img=7" className="w-12 h-12 rounded-full" />,
    },
]

const Profile: NextPage = () => {
    const [_, setForceRerender] = useState(false);
    const forceRerender = () => setForceRerender(!_);
    const [showComments, setShowComments] = useState(false);
    const { query, isReady } = useRouter();
    const firstUserCommentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (showComments) {
            firstUserCommentRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    })

    if (!isReady) {
        return <>Loading...</>;
    }

    const safeParseOfId = z.string().regex(/^\d+$/).transform(Number).safeParse(query.id);

    if (!safeParseOfId.success) {
        return (<>Invalid ID</>)
    }

    const parsedId = safeParseOfId.data;
    const user = users.find((user) => user.id === parsedId);

    if (parsedId !== 1) {
        return (
            <>
                <Head>
                    <title>{user?.firstName || "Profile"} | Blog Application</title>
                    <meta name="description" content="Blog Application Profile" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="sticky z-20 top-0 h-10 border-b border-b-gray-200 bg-white flex flex-row justify-between items-center px-[2%]">
                    <div className="font-bold cursor-default">Continuus</div>
                </div>
                <div className="fixed z-10 top-0 left-0 h-full px-6 mt-10 w-96">
                    <div className="flex flex-col w-full">
                        <Link
                            href='/'
                            className="border-l-4 border-solid border-l-white hover:border-l-emerald-400 pl-2 m-2 hover:font-bold cursor-pointer"
                        >
                            Blog Feed
                        </Link>
                        <Link
                            href="/admin"
                            className="border-l-4 border-solid border-l-white pl-2 m-2 hover:border-l-emerald-400 hover:font-bold transition-all"
                        >
                            Admin Panel
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center w-full">
                    <Tabs className={'w-[720px] mt-3'}>
                        <TabList className="flex flex-row items-center">
                            <Tab className="w-32 text-center p-4 cursor-pointer border-b-4 border-solid border-white hover:border-b-emerald-400 hover:font-bold transition-all" selectedClassName="border-b-4 border-solid border-b-emerald-400 font-bold">Posts</Tab>
                            <Tab className="w-32 text-center p-4 cursor-pointer border-b-4 border-solid border-white hover:border-b-emerald-400 hover:font-bold transition-all" selectedClassName="border-b-4 border-solid border-b-emerald-400 font-bold">Comments</Tab>
                        </TabList>

                        <TabPanel>
                            {`${user?.firstName || "This profile"} has not shared any posts yet`}
                        </TabPanel>
                        <TabPanel>
                            {`${user?.firstName || "This profile"} has not commented yet`}
                        </TabPanel>
                    </Tabs>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{users.find((user) => user.id === parsedId)?.firstName || "Profile"} | Blog Application</title>
                <meta name="description" content="Blog Application Profile" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="sticky z-20 top-0 h-10 border-b border-b-gray-200 bg-white flex flex-row justify-between items-center px-[2%]">
                <div className="font-bold cursor-default">Continuus</div>
            </div>
            <div className="fixed z-10 top-0 left-0 h-full px-6 mt-10 w-96">
                <div className="flex flex-col w-full">
                    <Link
                        href='/'
                        className="border-l-4 border-solid border-l-white hover:border-l-emerald-400 pl-2 m-2 hover:font-bold cursor-pointer"
                    >
                        Blog Feed
                    </Link>
                    <Link
                        href="/admin"
                        className="border-l-4 border-solid border-l-white pl-2 m-2 hover:border-l-emerald-400 hover:font-bold transition-all"
                    >
                        Admin Panel
                    </Link>
                </div>
            </div>
            <div className="flex flex-col items-center w-full">
                <Tabs onSelect={(i) => { setShowComments(i === 1); forceRerender() }} className='mt-3'>
                    <TabList className="flex flex-row items-center">
                        <Tab className="w-32 text-center p-4 cursor-pointer border-b-4 border-solid border-white hover:border-b-emerald-400 hover:font-bold transition-all" selectedClassName="border-b-4 border-solid border-b-emerald-400 font-bold">Posts</Tab>
                        <Tab className="w-32 text-center p-4 cursor-pointer border-b-4 border-solid border-white hover:border-b-emerald-400 hover:font-bold transition-all" selectedClassName="border-b-4 border-solid border-b-emerald-400 font-bold">Comments</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="border p-6 border-solid border-gray-200 w-[720px] my-3 relative shadow-xl rounded-md">
                            <div className="flex flex-row justify-between mb-2">
                                <div className="flex flex-row items-center w-11/12">
                                    <Link href={"/profile/1"}>
                                        <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
                                    </Link>
                                    <div className="ml-4">
                                        <div className="font-bold">Altay Batuhan</div>
                                        <div className="text-sm text-gray-400">6 months ago</div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-3xl break-words w-full mb-3">{examplePost.title}</div>
                            <p className="text-base break-words">{examplePost.content}</p>
                            <div className="flex flex-col">
                                <button
                                    className="self-end text-gray-400 hover:text-emerald-400 transition-colors px-2 py-1"
                                    onClick={() => {
                                        setShowComments(!showComments);
                                    }}
                                >
                                    {showComments ? "Close Comments" : `${examplePost.comments.length} Comment(s)`}
                                </button>
                                {showComments && <hr />}
                                <div className="max-h-80 overflow-y-auto">
                                    {showComments && examplePost.comments.map((comment, commentId) =>
                                        <>
                                            <div className="w-full flex flex-row items-start my-4" key={commentId}>
                                                <Link href={`/profile/${comment.userId}`}>
                                                    <img src={`https://i.pravatar.cc/300?img=${comment.userId}`} className="w-12 rounded-full" />
                                                </Link>
                                                <div className="ml-4 flex-1 min-w-0">
                                                    <div className="font-bold">{users.find(user => user.id === comment.userId)?.firstName + ' ' + users.find(user => user.id === comment.userId)?.lastName}</div>
                                                    <div className="text-sm text-gray-400">Several seconds ago</div>
                                                    <p className="text-base break-words">{comment.content}</p>
                                                </div>
                                            </div>
                                            {commentId !== examplePost.comments.length - 1 && <hr />}
                                        </>
                                    )}
                                </div>
                                {showComments && <div className="w-full flex flex-row items-start py-4 border-t border-solid border-t-gray-200">
                                    <Link href={"/profile/1"}>
                                        <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
                                    </Link>
                                    <form
                                        onSubmit={(event) => event.preventDefault()}
                                        className="flex-1 ml-4"
                                    >
                                        <textarea
                                            className="w-full resize-none bg-gray-100 rounded-md h-24 p-2"
                                        />
                                        <div className="flex flex-col items-end mt-2">
                                            <input
                                                type="submit"
                                                value="Submit"
                                                className="bg-emerald-400 px-6 py-2 cursor-pointer rounded-md hover:text-white transition-colors"
                                            />
                                        </div>
                                    </form>
                                </div>}
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="border p-6 border-solid border-gray-200 w-[720px] my-3 relative shadow-xl rounded-md">
                            <div className="flex flex-row justify-between mb-2">
                                <div className="flex flex-row items-center w-11/12">
                                    <Link href={"/profile/1"}>
                                        <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
                                    </Link>
                                    <div className="ml-4">
                                        <div className="font-bold">Altay Batuhan</div>
                                        <div className="text-sm text-gray-400">6 months ago</div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-3xl break-words w-full mb-3">{examplePost.title}</div>
                            <p className="text-base break-words">{examplePost.content}</p>
                            <div className="flex flex-col">
                                <button
                                    className="self-end text-gray-400 hover:text-emerald-400 transition-colors px-2 py-1"
                                    onClick={() => {
                                        setShowComments(!showComments);
                                    }}
                                >
                                    {showComments ? "Close Comments" : `${examplePost.comments.length} Comment(s)`}
                                </button>
                                {showComments && <hr />}
                                <div className="max-h-80 overflow-y-auto">
                                    {showComments && examplePost.comments.map(((userCommentFound) => (comment, commentId) => {
                                        let shouldSetRef = false
                                        if (comment.userId === 1 && !userCommentFound) {
                                            userCommentFound = true;
                                            shouldSetRef = true;
                                        }

                                        return (
                                            <>
                                                <div className={`w-full flex flex-row items-start my-4 ${comment.userId === 1 ? 'bg-amber-200 animate-pulseReduced hover:animate-none' : ''}`} key={commentId} ref={(shouldSetRef && !firstUserCommentRef.current) ? firstUserCommentRef : null}>
                                                    <Link href={`/profile/${comment.userId}`}>
                                                        <img src={`https://i.pravatar.cc/300?img=${comment.userId}`} className="w-12 rounded-full" />
                                                    </Link>
                                                    <div className="ml-4 flex-1 min-w-0">
                                                        <div className="font-bold">{users.find(user => user.id === comment.userId)?.firstName + ' ' + users.find(user => user.id === comment.userId)?.lastName}</div>
                                                        <div className="text-sm text-gray-400">Several seconds ago</div>
                                                        <p className="text-base break-words">{comment.content}</p>
                                                    </div>
                                                </div>
                                                {commentId !== examplePost.comments.length - 1 && <hr />}
                                            </>
                                        );
                                    })(false))}
                                </div>
                                {showComments && <div className="w-full flex flex-row items-start py-4 border-t border-solid border-t-gray-200">
                                    <Link href={"/profile/1"}>
                                        <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
                                    </Link>
                                    <form
                                        onSubmit={(event) => event.preventDefault()}
                                        className="flex-1 ml-4"
                                    >
                                        <textarea
                                            className="w-full resize-none bg-gray-100 rounded-md h-24 p-2"
                                        />
                                        <div className="flex flex-col items-end mt-2">
                                            <input
                                                type="submit"
                                                value="Submit"
                                                className="bg-emerald-400 px-6 py-2 cursor-pointer rounded-md hover:text-white transition-colors"
                                            />
                                        </div>
                                    </form>
                                </div>}
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>

            </div>
        </>
    )
}

export default Profile;
