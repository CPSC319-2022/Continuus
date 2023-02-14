import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Modal from 'react-modal';

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
  content: "Source: https://techcrunch.com/2023/02/09/github-lays-off-10-and-goes-fully-remote/ \n\nThe tech layoffs keep on coming. Microsoft-owned GitHub today announced that it is laying off 10% of its staff through the end of the company’s fiscal year. Before this announcement, which was first reported by Fortune, GitHub had about 3,000 employees. The company will also shutter all of its offices as their leases end, in part because of their low utilization, and move to a remote-first culture. GitHub will also continue its hiring freeze, which it first announced in January, and also make a number of other internal changes to “protect the short-term health” of its business. “We announced a number of difficult but necessary decisions and budgetary realignments to both protect the health of our business in the short term and grant us the capacity to invest in our long-term strategy moving forward. You can view our CEO’s full message to employees with additional details on these changes below,” a company spokesperson told us. In a move that’s a bit unorthodox for a company that has prided itself on remaining independent of its corporate owner, GitHub is also moving to Teams for its video conferencing needs. And as another sign of cost cutting, it’s moving its laptop refresh cycle from three to four years. “Although our entire leadership team has carefully deliberated this step and come to agreement, ultimately, as CEO the decision is mine. I recognize this will be difficult on you all, and we will approach this period with the utmost respect for every Hubber,” GitHub CEO Thomas Dohmke wrote in an email to the company’s staff today. He notes that he wants the company to become the “developer-first engineering system for the world of tomorrow,” with a strong focus on AI. Given GitHub’s recent focus on its Copilot and the overall shift at Microsoft toward AI-everything, that’s maybe not unexpected.",
  comments: [
    {
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit deserunt eos minus. Adipisci dolor aperiam exercitationem corporis reprehenderit vitae repellat blanditiis quibusdam recusandae numquam. Perferendis nam totam excepturi veritatis modi!"
    },
    {
      content: "Great article! It provided so much valuable information and I learned a lot from it."
    },
    {
      content: "This post was so well written and easy to understand. I appreciated the clear explanations and helpful tips."
    },
    {
      content: "I found this post to be extremely informative and relevant to my interests. I will definitely be sharing it with my friends."
    },
    {
      content: "This post was a real eye-opener for me. I never thought about the topic in that way before, and now I have a much better understanding."
    },
    {
      content: "I love the way this post was structured and the examples given really helped me grasp the concept."
    },
    {
      content: "This post was an absolute delight to read. I was immediately drawn in by the engaging writing style and the well-researched information presented. I particularly appreciated the clear and concise explanations, which made it easy for me to understand even the more complex topics. The examples and real-life scenarios provided throughout the post were extremely helpful in solidifying my understanding of the topic at hand.\n\nAs someone who is always on the lookout for quality content, I was pleasantly surprised to find this gem of a post. The depth of knowledge displayed by the author is truly remarkable and I am grateful for the time and effort put into creating such a valuable resource.\n\nI also appreciated the attention to detail and the care taken to ensure that all aspects of the topic were thoroughly covered. From the introduction to the conclusion, I was thoroughly impressed by the level of thought and research that went into this post. I also appreciated the practical tips and advice offered, which I know will be useful for me in my personal and professional life.\n\nIn conclusion, I cannot recommend this post enough. It is a must-read for anyone looking to expand their knowledge on this topic and I look forward to reading more from this author in the future. Thank you for such a fantastic piece of work!"
    }
  ]
}

const examplePost2: Post = {
  title: "Maximizing Your Potential with the Latest Demo Technology",
  content: "Source: ChatGPT \n\nAs technology continues to advance, the world of demos is becoming more and more exciting. With new tools and techniques emerging every day, it's becoming easier to create interactive, engaging demonstrations that help you showcase your products and ideas. If you're looking to create a demo that truly stands out, it's essential that you stay up-to-date with the latest developments in demo technology. Here are just a few of the latest tools and techniques that you can use to maximize your potential and take your demo to the next level. Interactive simulations are a great way to engage your audience and help them understand complex concepts. By allowing users to interact with your product or service, you can help them see exactly how it works and what it can do. This type of interaction can help increase user engagement and retention, making your demo more effective and memorable. Virtual reality and augmented reality are becoming increasingly popular in the world of demos. By creating an immersive experience for users, you can help them see your product or service in a completely new light. Whether you're showcasing a new piece of software or a physical product, virtual reality and augmented reality can help you create a demo that's truly one of a kind. Storytelling is a powerful tool that can be used to bring your demo to life. By incorporating elements of storytelling into your demo, you can help your audience understand the context and significance of what you're demonstrating. Whether you're telling a personal story or using a fictional scenario to demonstrate how your product works, storytelling can help you connect with your audience on a deeper level. Animated graphics are a great way to add some visual interest to your demo. Whether you're showcasing a product or explaining a complex concept, animated graphics can help you bring your message to life. From simple animations to full-fledged 3D graphics, there are many different tools and techniques that you can use to create eye-catching visuals that will help you stand out from the crowd. Finally, live demonstrations can be a great way to demonstrate your product or service in real-time. By giving users the opportunity to see your product in action, you can help them better understand what it can do and how it can help them. Whether you're showcasing a new piece of software or a physical product, live demonstrations are a great way to connect with your audience and demonstrate your expertise. In conclusion, by incorporating these latest technologies and techniques into your demo, you can help maximize your potential and create a demonstration that truly stands out. Whether you're showcasing a new product, explaining a complex concept, or simply trying to engage your audience, these tools and techniques can help you take your demo to the next level.",
  comments: []
}

const Home: NextPage = () => {
  const [feed, setFeed] = useState<Post[]>([examplePost, examplePost2])
  const [createPostModalVisible, setCreatePostModalVisible] = useState(false);
  const [editPostModalVisible, setEditPostModalVisible] = useState(false);
  const [createPostFormState, setCreatePostFormState] = useState<Post>({
    title: "",
    content: "",
    comments: [],
  });
  const [editPostFormState, setEditPostFormState] = useState<Post & { id: number }>({
    id: -1,
    title: "",
    content: "",
    comments: []
  });
  const [addCommentStates, setAddCommentStates] = useState<string[]>([""])
  const [showCommentsStates, setShowCommentsStates] = useState<boolean[]>([false]);
  const [deletePostModalVisible, setDeletePostModalVisible] = useState<boolean>(false);
  const [deletePostModalTargetPostId, setDeletePostModalTargetPostId] = useState<number>(-1);

  const handleCreateBlogFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFeed((feed) => [createPostFormState, ...feed]);
    setAddCommentStates((state) => ["", ...state]);
    setShowCommentsStates((state) => [false, ...state]);

    setCreatePostModalVisible(false);

    setCreatePostFormState({ title: "", content: "", comments: [] });
  };

  const handleEditBlogFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFeed((feed) => {
      feed.splice(editPostFormState.id, 1, editPostFormState)
      return [...feed];
    });

    setEditPostModalVisible(false);

    setEditPostFormState({ id: -1, title: "", content: "", comments: [] });
  };

  const handleCreateCommentSubmit = (event: FormEvent<HTMLFormElement>, id: number) => {
    event.preventDefault();

    const commentContent = addCommentStates[id]!;

    setAddCommentStates((states) => {
      states[id] = "";

      return [...states]
    });

    setFeed((feed) => {
      const updatedPost = {
        ...feed[id]!, comments: [...feed[id]!.comments, {
          content: commentContent
        }]
      }

      feed.splice(id, 1, updatedPost)

      return [...feed];
    })
  };

  return (
    <>
      <Head>
        <title>Blog Application</title>
        <meta name="description" content="Blog Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="sticky z-20 top-0 h-10 border-b border-b-gray-200 bg-white flex flex-row justify-between items-center px-[2%]">
        <div className="font-bold cursor-default">Continuus</div>
        <button
          className="px-2 py-1 hover:text-emerald-400 transition-colors"
          onClick={() => setCreatePostModalVisible(true)}
        >
          Create a Post
        </button>
      </div>
      <div className="fixed z-10 top-0 left-0 h-full px-6 mt-10 w-96">
        <div className="flex flex-col w-full">
          <div className="border-l-4 border-solid border-l-emerald-400 pl-2 m-2 font-bold cursor-pointer">Blog Feed</div>
          <Link
            href="/admin"
            className="border-l-4 border-solid border-l-white pl-2 m-2 hover:border-l-emerald-400 hover:font-bold transition-all"
          >
            Admin Panel
          </Link>
        </div>
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={createPostModalVisible}
        onRequestClose={() => {
          setCreatePostModalVisible(false);
          setCreatePostFormState({ title: "", content: "", comments: [] });
        }}
        overlayClassName="fixed inset-0 z-30 bg-black/75"
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 rounded-md"
      >
        <div className="w-full h-12 flex flex-row justify-between items-center border-b border-b-gray-200 pl-4 pr-4">
          <div className="font-semibold">Create Post</div>
          <button
            className="rounded-full after:content-['\2715'] hover:text-emerald-400 transition-colors"
            onClick={() => {
              setCreatePostModalVisible(false);
              setCreatePostFormState({ title: "", content: "", comments: [] });
            }}
          />
        </div>
        <form onSubmit={handleCreateBlogFormSubmit}>
          <div className="border-b border-b-gray-200 pl-4 pr-4 py-6 flex flex-row items-start">
            <Link href={"/profile/1"} className="pr-4">
              <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
            </Link>
            <div className="flex flex-col w-full">
              <input
                className="w-full bg-gray-100 rounded-md p-2 mb-4"
                placeholder="Write title here"
                type="text"
                value={createPostFormState.title}
                onChange={(event) => setCreatePostFormState((state) => ({ ...state, title: event.target.value }))}
              />
              <textarea
                className="w-full resize-none bg-gray-100 rounded-md h-96 p-2"
                placeholder="Write your blog post here"
                value={createPostFormState.content}
                onChange={(event) => setCreatePostFormState((state) => ({ ...state, content: event.target.value }))}
              />
            </div>
          </div>
          <input type="submit" value="Create"
            className="relative left-full -translate-x-full px-6 py-2 rounded-md bg-emerald-400 my-2 -ml-4 hover:text-white transition-colors cursor-pointer"
          />
        </form>
      </Modal>

      <Modal
        ariaHideApp={false}
        isOpen={editPostModalVisible}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        overlayClassName="fixed inset-0 z-30 bg-black/75"
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 rounded-md"
      >
        <div className="w-full h-12 flex flex-row justify-between items-center border-b border-b-gray-200 pl-4 pr-4">
          <div className="font-semibold">Edit Post</div>
          <button
            className="rounded-full after:content-['\2715'] hover:text-emerald-400 transition-colors"
            onClick={() => {
              setEditPostModalVisible(false);
              setEditPostFormState({ id: -1, title: "", content: "", comments: [] });
            }}
          />
        </div>
        <form onSubmit={handleEditBlogFormSubmit}>
          <div className="border-b border-b-gray-200 pl-4 pr-4 py-6 flex flex-row items-start">
            <Link href={"/profile/1"} className="pr-4">
              <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
            </Link>
            <div className="flex flex-col w-full">
              <input
                className="w-full bg-gray-100 rounded-md p-2 mb-4"
                type="text"
                value={editPostFormState.title}
                onChange={(event) => setEditPostFormState((state) => ({ ...state, title: event.target.value }))}
              />
              <textarea
                className="w-full resize-none bg-gray-100 rounded-md h-96 p-2"
                value={editPostFormState.content}
                onChange={(event) => setEditPostFormState((state) => ({ ...state, content: event.target.value }))}
              />
            </div>
          </div>
          <input type="submit" value="Edit"
            className="relative left-full -translate-x-full px-6 py-2 rounded-md bg-emerald-400 my-2 -ml-4 hover:text-white transition-colors cursor-pointer"
          />
        </form>
      </Modal>


      <Modal
        ariaHideApp={false}
        isOpen={deletePostModalVisible}
        onRequestClose={() => {
          setDeletePostModalVisible(false);
          setDeletePostModalTargetPostId(-1);
        }}
        overlayClassName="fixed inset-0 z-30 bg-black/75"
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/12 rounded-md"
      >
        <div className="w-full h-12 flex flex-row justify-between items-center border-b border-b-gray-200 pl-4 pr-4">
          <div className="font-semibold">Delete Post</div>
          <button
            className="rounded-full after:content-['\2715'] hover:text-emerald-400 transition-colors"
            onClick={() => {
              setDeletePostModalVisible(false);
              setDeletePostModalTargetPostId(-1);
            }}
          />
        </div>
        <div className="border-b border-b-gray-200 pl-4 pr-2 h-24 pt-6">
          <div>Are you sure you want to delete this post?</div>
        </div>
        <button
          onClick={() => {
            setFeed((feed) => {
              feed.splice(deletePostModalTargetPostId, 1)

              return [...feed];
            });

            setAddCommentStates((state) => {
              state.splice(deletePostModalTargetPostId, 1);

              return [...state];
            })

            setShowCommentsStates((state) => {
              state.splice(deletePostModalTargetPostId, 1);

              return [...state];
            });

            setDeletePostModalVisible(false);
            setDeletePostModalTargetPostId(-1);
          }}
          className="relative left-full -translate-x-full px-6 py-2 rounded-md bg-emerald-400 my-2 -ml-4 hover:text-white transition-colors"
        >
          Delete
        </button>
      </Modal>

      <div className="flex flex-col items-center w-full">
        {feed.map((post, id) =>
          <div className="border p-6 border-solid border-gray-200 w-[720px] my-3 relative shadow-xl rounded-md" key={id}>
            <div className="flex flex-row justify-between mb-2">
              <div className="flex flex-row items-center w-11/12">
                <Link href={"/profile/1"}>
                  <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
                </Link>
                <div className="ml-4">
                  <div className="font-bold">William Brown</div>
                  <div className="text-sm text-gray-400">6 months ago</div>
                </div>
              </div>
              <div>
                <Menu
                  menuButton={<MenuButton className="after:content-['\2807'] hover:text-emerald-400 transition-colors text-lg pl-3 pr-2"></MenuButton>}
                  menuClassName="bg-white border-solid border-gray-200 drop-shadow-lg border cursor-pointer z-10 w-44"
                  align="end"
                  position="anchor"
                >
                  <MenuItem
                    onClick={() => {
                      setEditPostFormState({ id, title: post.title, content: post.content, comments: post.comments })
                      setEditPostModalVisible(true)
                    }}
                    className="py-1 px-4 hover:bg-emerald-400 transition-colors"
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setDeletePostModalVisible(true);
                      setDeletePostModalTargetPostId(id);
                    }}
                    className="py-1 px-4 hover:bg-emerald-400 transition-colors"
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <div className="text-3xl break-words w-full mb-3">{post.title}</div>
            <p className="text-base break-words whitespace-pre-line">{post.content}</p>
            <div className="flex flex-col">
              <button
                className="self-end text-gray-400 hover:text-emerald-400 transition-colors px-2 py-1"
                onClick={() => {
                  setShowCommentsStates((state) => {
                    state.splice(id, 1, !state[id])
                    return [...state];
                  });
                }}
              >
                {showCommentsStates[id] ? "Close Comments" : `${post.comments.length} Comment(s)`}
              </button>
              {showCommentsStates[id] && <hr />}
              <div className="max-h-80 overflow-y-auto">
                {showCommentsStates[id] && post.comments.map((comment, commentId) =>
                  <>
                    <div className="w-full flex flex-row items-start my-4" key={commentId}>
                      <Link href={"/profile/1"}>
                        <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
                      </Link>
                      <div className="ml-4 flex-1 min-w-0">
                        <div className="font-bold">William Brown</div>
                        <div className="text-sm text-gray-400">Several seconds ago</div>
                        <p className="text-base break-words whitespace-pre-line">{comment.content}</p>
                      </div>
                    </div>
                    {commentId !== post.comments.length - 1 && <hr />}
                  </>
                )}
              </div>
              {showCommentsStates[id] && <div className="w-full flex flex-row items-start py-4 border-t border-solid border-t-gray-200">
                <Link href={"/profile/1"}>
                  <img src="https://i.pravatar.cc/300?img=1" className="w-12 rounded-full" />
                </Link>
                <form
                  onSubmit={(event) => handleCreateCommentSubmit(event, id)}
                  className="flex-1 ml-4"
                >
                  <textarea
                    value={addCommentStates[id]}
                    onChange={(event) => setAddCommentStates((states) => {

                      states[id] = event.target.value;

                      return [...states];
                    })}
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
        )}
      </div>
    </>
  )
}

export default Home;
