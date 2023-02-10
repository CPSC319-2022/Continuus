import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { z } from 'zod';

import 'react-tabs/style/react-tabs.css';
import Link from "next/link";

type Post = {
    title: string
    content: string
    comments: Comment[]
}

type Comment = {
    content: string,
}

const examplePost: Post = {
    title: "GitHub lays off 10% and goes fully remote",
    content: "Source: https://techcrunch.com/2023/02/09/github-lays-off-10-and-goes-fully-remote/ The tech layoffs keep on coming. Microsoft-owned GitHub today announced that it is laying off 10% of its staff through the end of the company’s fiscal year. Before this announcement, which was first reported by Fortune, GitHub had about 3,000 employees. The company will also shutter all of its offices as their leases end, in part because of their low utilization, and move to a remote-first culture. GitHub will also continue its hiring freeze, which it first announced in January, and also make a number of other internal changes to “protect the short-term health” of its business. “We announced a number of difficult but necessary decisions and budgetary realignments to both protect the health of our business in the short term and grant us the capacity to invest in our long-term strategy moving forward. You can view our CEO’s full message to employees with additional details on these changes below,” a company spokesperson told us. In a move that’s a bit unorthodox for a company that has prided itself on remaining independent of its corporate owner, GitHub is also moving to Teams for its video conferencing needs. And as another sign of cost cutting, it’s moving its laptop refresh cycle from three to four years. “Although our entire leadership team has carefully deliberated this step and come to agreement, ultimately, as CEO the decision is mine. I recognize this will be difficult on you all, and we will approach this period with the utmost respect for every Hubber,” GitHub CEO Thomas Dohmke wrote in an email to the company’s staff today. He notes that he wants the company to become the “developer-first engineering system for the world of tomorrow,” with a strong focus on AI. Given GitHub’s recent focus on its Copilot and the overall shift at Microsoft toward AI-everything, that’s maybe not unexpected.",
    comments: [
        {
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
    const { query, isReady } = useRouter();

    if (!isReady) {
        return <>Loading...</>;
    }

    const safeParseOfId = z.string().regex(/^\d+$/).transform(Number).safeParse(query.id);

    if (!safeParseOfId.success) {
        return (<>Invalid ID</>)
    }

    const parsedId = safeParseOfId.data;

    return (
        <>
            <Head>
                <title>{users.find((user) => user.id === parsedId)?.firstName || "Profile"} | Blog Application</title>
                <meta name="description" content="Blog Application Profile" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Link href="/">Blog</Link>
            <br />
            <Link href="/admin">Admin Panel</Link>
            <Tabs>
                <TabList>
                    <Tab>Posts</Tab>
                    <Tab>Comments</Tab>
                </TabList>

                <TabPanel>
                    <div className="flex flex-col items-center w-full">
                        <div className="border border-solid border-black w-5/6 my-2 relative">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center w-11/12">
                                    <Link href={"/profile/1"}>
                                        <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
                                    </Link>
                                    <div className="text-3xl break-words w-11/12">{examplePost.title}</div>
                                </div>
                            </div>
                            <p className="text-base break-words">{examplePost.content}</p>
                            <div className="border-t border-black border-solid flex flex-col">
                                <div className="text-2xl">Comments</div>
                                {examplePost.comments.map((comment, commentId) =>
                                    <div className="w-full flex flex-row items-start my-2" key={commentId}>
                                        <Link href={"/profile/1"}>
                                            <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
                                        </Link>
                                        <p className="text-base break-words w-11/12">{comment.content}</p>
                                    </div>
                                )}
                                <div className="w-full flex flex-row items-center my-2">
                                    <Link href={"/profile/1"}>
                                        <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
                                    </Link>
                                    <form onSubmit={(event) => event.preventDefault()}>
                                        <textarea />
                                        <input type="submit" value="Submit" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="flex flex-col items-center w-full">
                        <div className="border border-solid border-black w-5/6 my-2 relative">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center w-11/12">
                                    <Link href={"/profile/1"}>
                                        <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
                                    </Link>
                                    <div className="text-3xl break-words w-11/12">{examplePost.title}</div>
                                </div>
                            </div>
                            <p className="text-base break-words">{examplePost.content}</p>
                            <div className="border-t border-black border-solid flex flex-col">
                                <div className="text-2xl">Comments</div>
                                <div className="w-full flex flex-row items-start my-2">
                                    <p className="text-base break-words w-11/12 text-blue-500 hover:text-blue-700 hover:underline cursor-pointer">Show 34 comments</p>
                                </div>
                                {examplePost.comments.map((comment, commentId) =>
                                    <div className="w-full flex flex-row items-start my-2 bg-amber-200" key={commentId}>
                                        <Link href={"/profile/1"}>
                                            <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
                                        </Link>
                                        <p className="text-base break-words w-11/12">{comment.content}</p>
                                    </div>
                                )}
                                <div className="w-full flex flex-row items-start my-2">
                                    <p className="text-base break-words w-11/12 text-blue-500 hover:text-blue-700 hover:underline cursor-pointer">Show 2 comments</p>
                                </div>
                                {examplePost.comments.map((comment, commentId) =>
                                    <div className="w-full flex flex-row items-start my-2 bg-amber-200" key={commentId}>
                                        <Link href={"/profile/1"}>
                                            <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
                                        </Link>
                                        <p className="text-base break-words w-11/12">{comment.content}</p>
                                    </div>
                                )}
                                <div className="w-full flex flex-row items-start my-2">
                                    <p className="text-base break-words w-11/12 text-blue-500 hover:text-blue-700 hover:underline cursor-pointer">Show 72 comments</p>
                                </div>
                                <div className="w-full flex flex-row items-center my-2">
                                    <Link href={"/profile/1"}>
                                        <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
                                    </Link>
                                    <form onSubmit={(event) => event.preventDefault()}>
                                        <textarea />
                                        <input type="submit" value="Submit" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
}

export default Profile;
