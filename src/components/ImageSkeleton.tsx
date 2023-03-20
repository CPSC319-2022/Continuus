/**
 * @prop size: Width/Height of the Skeleton in REM 
 * @returns 
 */
export const ImageSkeleton: React.FC<{ size: number }> = ({ size }) => {
    return (
        <div className="aspect-square rounded-full bg-gray-300 animate-pulse inline-block" style={{ width: `${size}rem` }} />
    );
}