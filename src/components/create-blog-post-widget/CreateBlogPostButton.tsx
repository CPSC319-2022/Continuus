import { useRef, useState } from "react";
import { Spinner } from "../Spinner";

export const CreateBlogPostButton: React.FC<{ onClick?: () => void, unauthorized?: boolean, loading?: boolean}> = ({ onClick, unauthorized, loading }) => {
    const [hovered, setHovered] = useState(false);
    const disabledRoleClassNames = "bg-gray-200 cursor-not-allowed";
    const enabledRoleClassNames = "bg-highlight-green hover:bg-gray-700 hover:scale-110 bg-highlight-green cursor-pointer transition-all";
    const tooltipRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div
                aria-label="Create Blog Post Button"
                className="
                    fixed
                    bottom-24
                    left-1/2 
                    z-10
                    md:left-[95%] 
                    -translate-x-1/2
                    translate-y-1/2
                "
            >
                {loading ? <Spinner size={4} /> :
                    <>
                        <div
                            className="
                            absolute
                            w-64
                            min-h-0
                            h-12
                            -translate-y-full
                            -translate-x-1/2
                            left-1/2
                            md:-translate-x-full
                            md:left-full
                            overflow-hidden
                            -top-2
                        "
                            style={{ height: tooltipRef.current?.scrollHeight || '16rem' }}
                        >
                            <div
                                className={`
                            ${(!unauthorized || !hovered) ? 'top-full' : 'top-0'}
                            absolute
                            w-full  
                            border-black
                            bg-gray-400
                            rounded-md
                            p-2
                            transition-all
                            after:absolute first-letter:
                            after:left-0
                            md:after:left-auto
                            after:right-0
                            after:my-0
                            after:mx-auto
                            after:w-0
                            after:h-0
                            after:border-t-[1rem]
                            after:border-solid
                            after:border-t-gray-400
                            after:border-l-[2rem]
                            after:border-r-[2rem]
                            after:border-x-transparent
                            after:transition-all
                        `}
                                ref={tooltipRef}
                            >
                                <p className="text-center md:text-right">You do not have authorization to create posts</p>
                            </div>
                        </div>
                        <button
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            onClick={() => !unauthorized && onClick?.()}
                            className={`
                        ${!unauthorized ? enabledRoleClassNames : disabledRoleClassNames} 
                        aspect-square
                        w-16 
                        rounded-full 
                        after:block 
                        before:block 
                        after:bg-white 
                        before:bg-white
                        after:absolute 
                        before:absolute
                        after:top-1/2 
                        before:top-1/2 
                        after:left-1/2 
                        before:left-1/2 
                        after:-translate-x-1/2 
                        before:-translate-x-1/2 
                        after:-translate-y-1/2 
                        before:-translate-y-1/2 
                        after:h-8 
                        before:h-2 
                        after:w-2 
                        before:w-8 
                        after:transition-all 
                        before:transition-all 
                        `}
                        />
                    </>
                }
            </div>
        </>
    );
}