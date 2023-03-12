interface BlogPostProps {
  name: string;
  lastUpdated: string;
  content: string;
  imageUrl: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({
  name,
  lastUpdated,
  content,
  imageUrl,
}) => {
  return (
    <div className="bg-base-150 card w-full rounded-md bg-slate-200 shadow-xl">
      <div className="card-body m-[-10px]">
        <div className="mb-3 flex">
          <div className="avatar self-center">
            <div className="h-10 w-10 rounded-full">
              <img src={imageUrl} />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-lg font-bold">{name}</p>
            <p className="text-sm">{lastUpdated}</p>
          </div>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
};
