export const userPathToProfile = (profile: string): string => {

    return '/profile/' + encodeURIComponent(profile);
}
