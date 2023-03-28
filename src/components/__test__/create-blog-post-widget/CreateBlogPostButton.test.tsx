import { describe, it, expect, beforeEach, vi } from 'vitest'
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { CreateBlogPostButton } from '~/components/create-blog-post-widget/CreateBlogPostButton';


describe("Snapshot: CreateBlogPostButton", () => {

    beforeEach(() => {
        // this cleans up the 'screen'
        cleanup()
    })

    it("Loading Button", () => {
        render(<CreateBlogPostButton loading={true}/>);
        const createBlogPostButton = screen.getByLabelText("Create Blog Post Button");
        expect(createBlogPostButton).toMatchSnapshot();
    });

    it("Unauthorized Button", () => {
        // another way to take the snapshot of the UI component is to directly use the return value of 'render'
        // beware that this includes the container in the snapshot
        const createBlogPostButton = render(<CreateBlogPostButton unauthorized={true}/>).container;
        expect(createBlogPostButton).toMatchSnapshot();
    });

    it("Authorized Button", () => {
        render(<CreateBlogPostButton unauthorized={false}/>);
        const createBlogPostButton = screen.getByLabelText("Create Blog Post Button");
        expect(createBlogPostButton).toMatchSnapshot();
    });

    it("Hovering Unauthorized Button", async () => {
        const user = userEvent.setup()
        render(<CreateBlogPostButton unauthorized={true}/>);
        const createBlogPostButton = screen.getByLabelText("Create Blog Post Button");
        const actualButton = screen.getByRole("button");
        await user.hover(actualButton)
        expect(createBlogPostButton).toMatchSnapshot();
    });

    it("Hovering Authorized Button", async () => {
        const user = userEvent.setup()
        render(<CreateBlogPostButton unauthorized={false}/>);
        const createBlogPostButton = screen.getByLabelText("Create Blog Post Button");
        const actualButton = screen.getByRole("button");
        await user.hover(actualButton)
        expect(createBlogPostButton).toMatchSnapshot();
    });
    
    it("Clicking Authorized Button", async () => {
        const user = userEvent.setup()
        const onClick = vi.fn(() => {})
        render(<CreateBlogPostButton onClick={onClick} unauthorized={false}/>);
        const actualButton = screen.getByRole("button");
        await user.click(actualButton)

        expect(onClick).toHaveBeenCalledOnce();
    });
})