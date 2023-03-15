/**
 * Spinner
 * @prop size (default: 12): Width/Height in REM 
 */
export const Spinner: React.FC<{ size?: number }> = ({ size = 1 }) => {
    return (
        <div
            className="inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] text-highlight-green motion-reduce:animate-[spin_1.5s_linear_infinite]"
            style={{ width: `${size}rem`, height: `${size}rem`, borderWidth: `${size/12}rem` }}
            role="status"
        >
            <span
                className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
            />
        </div>
    );
}
