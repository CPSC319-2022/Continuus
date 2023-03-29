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
                                role: "ADMIN", 
                                createdAt: new Date(), 
                                updatedAt: new Date()
                            },
                            isLoading: false
                        })
                    }
                }
            }
        })

        const { CreateBlogPostWidget } = await import('~/components/create-blog-post-widget');

        const body = render(<CreateBlogPostWidget />).baseElement;
        expect(body).toMatchSnapshot();
    });

    it("Authorized & Create Blog Post modal is open", async () => {
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
                                role: "ADMIN", 
                                createdAt: new Date(), 
                                updatedAt: new Date()
                            },
                            isLoading: false
                        })
                    }
                }
            }
        })

        const { CreateBlogPostWidget } = await import('~/components/create-blog-post-widget');

        const user = userEvent.setup()
        const body = render(<CreateBlogPostWidget />).baseElement;
        const actualButton = screen.getByRole("button");
        await user.click(actualButton)
        expect(body).toMatchSnapshot();
    });

    it("Authorized & Mutation is loading", async () => {
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
                                role: "ADMIN", 
                                createdAt: new Date(), 
                                updatedAt: new Date()
                            },
                            isLoading: false
                        })
                    }
                },
                blogPost: {
                    create: {
                        useMutation: () => ({
                            isSuccess: false,
                            isLoading: true,
                        }),
                    }
                },
            }
        })

        const { CreateBlogPostWidget } = await import('~/components/create-blog-post-widget');

        const user = userEvent.setup()
        const body = render(<CreateBlogPostWidget />).baseElement;
        const actualButton = screen.getByRole("button");
        await user.click(actualButton)
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
                  role: "ADMIN",
                  createdAt: new Date(),
                  updatedAt: new Date(),
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