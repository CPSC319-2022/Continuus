/**
 * @prop width: Width of the Skeleton in REM 
 * @returns 
 */
export const TextSkeleton: React.FC<{ width: number }> = ({ width }) => {
    return (
        <div className="animate-pulse h-4 bg-gray-300 rounded-lg inline-block" style={{ width:`${width}rem`}}></div>
    );
}