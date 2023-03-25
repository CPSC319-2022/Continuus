import { useMemo } from "react";
import { api } from "~/utils/api";

export const RequestAccessButton: React.FC = () => {
  const user = api.user.currentUser.useQuery();
  const utils = api.useContext();

  const createRequest = api.contributorRequest.create.useMutation({
    onSuccess: async () => {
      await utils.user.invalidate();
    },
  });

  const isDisabled = useMemo(() => {
    return !user.isLoading && user.data?.contributorRequest.length;
  }, [user]);

  return user.data?.role === "READER" ? (
    <div>
      {isDisabled ? (
        <p className="rounded-md bg-slate-300 py-1 px-2 text-xs hover:cursor-not-allowed">
          Contributor Request Pending
        </p>
      ) : (
        <p
          className="rounded-md bg-highlight-green py-1 px-2 text-xs hover:cursor-pointer"
          onClick={() => {
            createRequest.mutate({
              data: {
                userId: user.data?.id ?? "",
              },
            });
          }}
        >
          Request Contributor Access
        </p>
      )}
    </div>
  ) : (
    <></>
  );
};
