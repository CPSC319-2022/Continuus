import {api} from "./api";

export const currentUserPathToProfile = (): string => {
    const currUser = api.user.currentUser.useQuery();
    if (!!!currUser.data) {
        return "/";
    }
    const id = currUser.data.id;

    return '/profile/' + encodeURIComponent(id);
}
