import type { PrismaClient, User } from '@prisma/client';
import type { Session } from 'next-auth';
import { describe, it, expect, beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'
import { appRouter } from '../../root';


describe("Creating Blog Post", () => {
    const prismaMock = mockDeep<PrismaClient>();
    const mockReaderUser: User = {
        id: 'reader',
        name: 'Reader User',
        role: 'READER',
        email: null,
        emailVerified: null,
        image: null,
    }
    const mockReaderSession: Session = {
        expires: new Date().toISOString(),
        user: mockReaderUser
    }
    const mockContributorUser: User = {
        id: 'contributor',
        name: 'Contributor User',
        role: 'CONTRIBUTOR',
        email: null,
        emailVerified: null,
        image: null,
    }
    const mockContributorSession: Session = {
        expires: new Date().toISOString(),
        user: mockContributorUser
    }
    const mockAdminUser: User = {
        id: 'admin',
        name: 'Admin User',
        role: 'ADMIN',
        email: null,
        emailVerified: null,
        image: null,
    }
    const mockAdminSession: Session = {
        expires: new Date().toISOString(),
        user: mockContributorUser
    }

    beforeEach(() => {
        mockReset(prismaMock);
    });

    it("throws an unauthorized exception when user is a visitor", async () => {
        const caller = appRouter.createCaller({ session: null, prisma: prismaMock })

        await expect(() => caller.blogPost.create({
            data: {
                userId: "XXX",
                title: "Test Title",
                content: "Test Content",
            }
        })).rejects.toThrowError('UNAUTHORIZED')
    })

    it("throws an unauthorized exception when user is a reader", async () => {
        const caller = appRouter.createCaller({ session: mockReaderSession, prisma: prismaMock })
        prismaMock.user.findUniqueOrThrow.mockResolvedValue(mockReaderUser);

        await expect(() => caller.blogPost.create({
            data: {
                userId: "XXX",
                title: "Test Title",
                content: "Test Content"
            }
        })).rejects.toThrowError('UNAUTHORIZED')
    })
 
    it("creates a new blog post when user is a contributor", async () => {
        const newBlogPostData = {
            userId: "XXX",
            title: "Test Title",
            content: "Test Content"
        }
        const caller = appRouter.createCaller({ session: mockContributorSession, prisma: prismaMock })
        prismaMock.user.findUniqueOrThrow.mockResolvedValue(mockContributorUser);
        prismaMock.blogPost.create.mockResolvedValue({ ...newBlogPostData, id: 'first_post' })
        

        const blogPost = await caller.blogPost.create({
            data: {
                userId: "XXX",
                title: "Test Title",
                content: "Test Content"
            }
        });

        expect(blogPost).toStrictEqual({ ...newBlogPostData, id: 'first_post' });
        expect(prismaMock.blogPost.create).toBeCalledTimes(1);
    })

    it("creates a new blog post when user is an admin", async () => {
        const newBlogPostData = {
            userId: "XXX",
            title: "Test Title",
            content: "Test Content"
        }
        const caller = appRouter.createCaller({ session: mockAdminSession, prisma: prismaMock })
        prismaMock.user.findUniqueOrThrow.mockResolvedValue(mockAdminUser);
        prismaMock.blogPost.create.mockResolvedValue({ ...newBlogPostData, id: 'first_post' })
        

        const blogPost = await caller.blogPost.create({
            data: {
                userId: "XXX",
                title: "Test Title",
                content: "Test Content"
            }
        });

        expect(blogPost).toStrictEqual({ ...newBlogPostData, id: 'first_post' });
        expect(prismaMock.blogPost.create).toBeCalledTimes(1);
    })
})