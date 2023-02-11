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
  content: "Source: https://techcrunch.com/2023/02/09/github-lays-off-10-and-goes-fully-remote/ The tech layoffs keep on coming. Microsoft-owned GitHub today announced that it is laying off 10% of its staff through the end of the company’s fiscal year. Before this announcement, which was first reported by Fortune, GitHub had about 3,000 employees. The company will also shutter all of its offices as their leases end, in part because of their low utilization, and move to a remote-first culture. GitHub will also continue its hiring freeze, which it first announced in January, and also make a number of other internal changes to “protect the short-term health” of its business. “We announced a number of difficult but necessary decisions and budgetary realignments to both protect the health of our business in the short term and grant us the capacity to invest in our long-term strategy moving forward. You can view our CEO’s full message to employees with additional details on these changes below,” a company spokesperson told us. In a move that’s a bit unorthodox for a company that has prided itself on remaining independent of its corporate owner, GitHub is also moving to Teams for its video conferencing needs. And as another sign of cost cutting, it’s moving its laptop refresh cycle from three to four years. “Although our entire leadership team has carefully deliberated this step and come to agreement, ultimately, as CEO the decision is mine. I recognize this will be difficult on you all, and we will approach this period with the utmost respect for every Hubber,” GitHub CEO Thomas Dohmke wrote in an email to the company’s staff today. He notes that he wants the company to become the “developer-first engineering system for the world of tomorrow,” with a strong focus on AI. Given GitHub’s recent focus on its Copilot and the overall shift at Microsoft toward AI-everything, that’s maybe not unexpected.",
  comments: [
    {
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit deserunt eos minus. Adipisci dolor aperiam exercitationem corporis reprehenderit vitae repellat blanditiis quibusdam recusandae numquam. Perferendis nam totam excepturi veritatis modi!"
    }
  ]
}

const Home: NextPage = () => {
  const [feed, setFeed] = useState<Post[]>([examplePost])
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
        overlayClassName="fixed inset-0 z-30 bg-white/75"
        className="bg-cyan-500 absolute w-4/5 h-4/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <button
          className="bg-gray-300 absolute right-2 top-2 w-12 h-12 rounded-full font-bold"
          onClick={() => {
            setCreatePostModalVisible(false);
            setCreatePostFormState({ title: "", content: "", comments: [] });
          }}
        >X</button>
        <div className="p-12 bg-gray-400 w-5/6 h-5/6 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-5xl">Create Blog Post</h1>
          <form onSubmit={handleCreateBlogFormSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={createPostFormState.title}
                onChange={(event) => setCreatePostFormState((state) => ({ ...state, title: event.target.value }))}
              />
            </label>
            <label>
              Content:
              <textarea
                value={createPostFormState.content}
                onChange={(event) => setCreatePostFormState((state) => ({ ...state, content: event.target.value }))}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </Modal>

      <Modal
        ariaHideApp={false}
        isOpen={editPostModalVisible}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        className="bg-cyan-500 absolute w-4/5 h-4/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <button
          className="bg-gray-300 absolute right-2 top-2 w-12 h-12 rounded-full font-bold"
          onClick={() => {
            setEditPostModalVisible(false);
            setEditPostFormState({ id: -1, title: "", content: "", comments: [] });
          }}
        >X</button>
        <div className="p-12 bg-gray-400 w-5/6 h-5/6 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-5xl">Edit Blog Post</h1>
          <form onSubmit={handleEditBlogFormSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={editPostFormState.title}
                onChange={(event) => setEditPostFormState((state) => ({ ...state, title: event.target.value }))}
              />
            </label>
            <label>
              Content:
              <textarea
                value={editPostFormState.content}
                onChange={(event) => setEditPostFormState((state) => ({ ...state, content: event.target.value }))}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
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
                  <div className="font-bold">Altay Batuhan</div>
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
                      setFeed((feed) => {
                        feed.splice(id, 1)

                        return [...feed];
                      });

                      setAddCommentStates((state) => {
                        state.splice(id, 1);

                        return [...state];
                      })

                      setShowCommentsStates((state) => {
                        state.splice(id, 1);

                        return [...state];
                      });
                    }}
                    className="py-1 px-4 hover:bg-emerald-400 transition-colors"
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <div className="text-3xl break-words w-full mb-3">{post.title}</div>
            <p className="text-base break-words">{post.content}</p>
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
                        <div className="font-bold">Altay Batuhan</div>
                        <div className="text-sm text-gray-400">Several seconds ago</div>
                        <p className="text-base break-words">{comment.content}</p>
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
