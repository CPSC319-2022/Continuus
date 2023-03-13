export interface CommentProps {
    commenterName: string;
    commenterAvatarUrl: string; 
    dateAdded: string;
    comment: string;
}

export const Comment: React.FC<CommentProps> = ({
    commenterName,
    commenterAvatarUrl,
    dateAdded,
    comment,
}) => {
    return (
      <><div>
        <hr className="h-px my-4 border-gray-500" />
      </div><div>
          <div className="flex">
            <div className="avatar self-center">
              <div className="h-10 w-10 rounded-full">
                <img src={commenterAvatarUrl} alt="avatar" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-lg font-bold">{commenterName}</p>
              <p className="text-sm">{dateAdded}</p>
            </div>
          </div>
          <p>{comment}</p>
        </div></>
    );
}
