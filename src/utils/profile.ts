/**
 * Returns a path to the profile page for the given profile. If the argument is undefined, redirect to the home page.
 *
 * @param profile the user id of the account
 *
 * @return the profile path if the profile is a string, otherwise the home path
 */
export const userPathToProfile = (profile: string | undefined): string => {
    if (profile === undefined) {
        return '/';
    }

    return '/profile/' + encodeURIComponent(profile);
}
