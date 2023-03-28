import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from "@testing-library/react";
import { CreateBlogPostForm } from '~/components/create-blog-post-widget/CreateBlogPostForm';

vi.mock("~/utils/api", () => ({
    api: {
        user: {
            currentUser: {
                useQuery: () => ({
                    data: null
                })
            }
        }
    },
}));

describe("Snapshot: CreateBlogPostForm", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Empty Form Snapshot", () => {
        render(<CreateBlogPostForm onSubmit={() => {}}/>);
        const form = within(screen.getByRole("form"));
        expect(form).toMatchSnapshot();
    });
})