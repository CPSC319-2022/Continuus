import { describe, it, expect, beforeEach, vi } from 'vitest'
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { User } from '.prisma/client';

describe("Snapshot: CreateBlogPostWidget", () => {
    beforeEach(() => {
        cleanup()
        vi.resetModules();
    })

    const setup = (overrides?: {
        api: {
            blogPost?: {
                create: {
                    useMutation: (data: any) => ({
                        isSuccess: boolean,
                        isLoading: boolean,
                    })
                }
            },
            user?: {
                currentUser: {
                    useQuery: () => ({
                        data: User | null,
                        isLoading: boolean,
                    })
                }
            },
            useContext?: () => ({
                blogPost: {
                    get: {
                        invalidate: () => void
                    },
                    count: {
                        invalidate: () => void
                    }
                },
            })
        }
    }) => {
        vi.doMock("~/utils/time", () => ({
            timeAgo: () => "0 seconds ago"
        }))
        vi.doMock("~/utils/api", () => ({
            api: {
                blogPost: {
                    create: {
                        useMutation: () => ({
                            isSuccess: false,
                            isLoading: false,
                        }),
                    }
                },
                user: {
                    currentUser: {
                        useQuery: () => ({
                            data: null,
                            isLoading: false,
                        }),
                    }
                },
                useContext: () => ({
                    blogPost: {
                        get: {
                            invalidate: vi.fn(),
                        },
                        count: {
                            invalidate: vi.fn()
                        }
                    },
                }),
                ...(overrides?.api)
            },
        }));
    }

    it("Unauthorized Plain CreateBlogPostWidget", async () => {
        setup();

        const { CreateBlogPostWidget } = await import('~/components/create-blog-post-widget');

        const body = render(<CreateBlogPostWidget />).baseElement;
        expect(body).toMatchSnapshot();
    });

    it("Loading CreateBlogPostWidget", async () => {
        setup({
            api: {
                user: {
                    currentUser: {
                        useQuery: () => ({
                            data: null,
                            isLoading: true
                        })
                    }
                }
            }
        })

        const { CreateBlogPostWidget } = await import('~/components/create-blog-post-widget');

        const body = render(<CreateBlogPostWidget />).baseElement;
        expect(body).toMatchSnapshot();
    });

    it("Authorized CreateBlogPostWidget", async () => {
      const date = new Date();
      setup({
        api: {
          user: {
            currentUser: {
              useQuery: () => ({
                data: {
                  id: "1",
                  email: "a",
                  name: "hi mom",
                  image: "c",
                  emailVerified: null,
                  password: null,
                  role: "ADMIN",
                  createdAt: date,
                  updatedAt: date,
                },
                isLoading: false,
              }),
            },
          },
        },
      });

      const { CreateBlogPostWidget } = await import(
        "~/components/create-blog-post-widget"
      );

      const body = render(<CreateBlogPostWidget />).baseElement;
      expect(body).toMatchSnapshot();
    });

    it("Authorized & Create Blog Post modal is open", async () => {
      const date = new Date();
      setup({
        api: {
          user: {
            currentUser: {
              useQuery: () => ({
                data: {
                  id: "1",
                  email: "a",
                  name: "hi mom",
                  image: "c",
                  emailVerified: null,
                  password: null,
                  role: "ADMIN",
                  createdAt: date,
                  updatedAt: date,
                },
                isLoading: false,
              }),
            },
          },
        },
      });

      const { CreateBlogPostWidget } = await import(
        "~/components/create-blog-post-widget"
      );

      const user = userEvent.setup();
      const body = render(<CreateBlogPostWidget />).baseElement;
      const actualButton = screen.getByRole("button");
      await user.click(actualButton);
      expect(body).toMatchSnapshot();
    });

    it("Authorized & Mutation is loading", async () => {
        const date = new Date();
        setup({
          api: {
            user: {
              currentUser: {
                useQuery: () => ({
                  data: {
                    id: "1",
                    email: "a",
                    name: "hi mom",
                    image: "c",
                    emailVerified: null,
                    password: null,
                    role: "ADMIN",
                    createdAt: date,
                    updatedAt: date,
                  },
                  isLoading: false,
                }),
              },
            },
            blogPost: {
              create: {
                useMutation: () => ({
                  isSuccess: false,
                  isLoading: true,
                }),
              },
            },
          },
        });

        const { CreateBlogPostWidget } = await import('~/components/create-blog-post-widget');

        const user = userEvent.setup()
        const body = render(<CreateBlogPostWidget />).baseElement;
        const actualButton = screen.getByRole("button");
        await user.click(actualButton)

        await new Promise ((resolve) => setTimeout(() => resolve(true), 500));
        expect(body).toMatchSnapshot();
    });

    it.skip("Authorized & Mutation is done", async () => {
      const blogPostCreateMutation = vi.fn(
        ({ onSuccess }: { onSuccess: () => void }) => {
          onSuccess();

          return {
            isSuccess: true,
            isLoading: false,
          };
        }
      );
      const invalidateBlogPostCount = vi.fn();
      const invalidateBlogPostGet = vi.fn();

      const date = new Date();

      setup({
        api: {
          user: {
            currentUser: {
              useQuery: () => ({
                data: {
                  id: "1",
                  email: "a",
                  name: "hi mom",
                  image: "c",
                  emailVerified: null,
                  password: null,
                  role: "ADMIN",
                  createdAt: date,
                  updatedAt: date,
                },
                isLoading: false,
              }),
            },
          },
          blogPost: {
            create: {
              useMutation: blogPostCreateMutation,
            },
          },
          useContext: () => ({
            blogPost: {
              count: {
                invalidate: invalidateBlogPostCount,
              },
              get: {
                invalidate: invalidateBlogPostGet,
              },
            },
          }),
        },
      });

      const { CreateBlogPostWidget } = await import(
        "~/components/create-blog-post-widget"
      );

      const user = userEvent.setup();
      const body = render(<CreateBlogPostWidget />).baseElement;
      const actualButton = screen.getByRole("button");
      await user.click(actualButton);
      expect(body).toMatchSnapshot();
      expect(invalidateBlogPostCount).toBeCalled();
      expect(invalidateBlogPostGet).toBeCalled();
    });
})