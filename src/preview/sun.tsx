import sunImage from '/public/assets/icons/sun.png';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { levelState } from '@/lib/state';
import { useRef, useState, useEffect } from 'react';

export function SunCounter() {
    const parentRef = useRef<HTMLDivElement>(null);
    const [fontSize, setFontSize] = useState('1rem'); // Default font size
    const { levelBuilder } = levelState();

    useEffect(() => {
        const handleResize = () => {
            if (parentRef.current) {
                const parentWidth = parentRef.current.offsetWidth;
                // Calculate font size based on parentWidth (e.g., a percentage or a formula)
                const newFontSize = `${parentWidth * 0.1}px`;
                setFontSize(newFontSize);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <AspectRatio ratio={16 / 9}>
            <div ref={parentRef} className="absolute w-1/4 h-1/8 flex items-center">
                <div className="w-full h-full text-white flex items-center ">
                    <div className="left-[30%] absolute w-[50%] bg-black/60 rounded-md justify-center">
                        <span style={{ fontSize }} className="pl-[40%] text-yellow-100 font-bold justify-center">
                            {levelBuilder.startingSun}
                        </span>
                    </div>
                    <img
                        src={sunImage}
                        alt="Sun"
                        className="absolute top-[0%] left-[15%] w-[30%] backdrop-blur-[1px] flex items-left justify-left"
                        draggable={false}
                    />
                </div>
            </div>
        </AspectRatio>
    );
}
