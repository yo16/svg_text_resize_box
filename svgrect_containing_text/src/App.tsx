import { useState } from 'react';

import { RectContainText } from './components/RectContainText';

function App() {
    const [fontSize, setFontSize] = useState<number>(24);
    const [maxWidth, setMaxWidth] = useState<number>(400);
    const [usingText, setUsingText] = useState<string>("test1 test2 test3 test4 test5 test6 test7 test8 test9 test10");

    function handleOnSetSize(width: number, height: number): void {
        console.log(`w:${width}, h:${height}`);
    }

    // フォントサイズを2ずつ上げたり下げたりする
    function handleFontSizeButton(sizeUp: Boolean): void {
        const nextFontSize = fontSize + (sizeUp? 2: -2);
        if ((nextFontSize > 0) && (nextFontSize < 60)) {
            setFontSize(nextFontSize);
        }
    }

    // 最大幅を20ずつ上げたり下げたりする
    function handleMaxWidthButton(sizeUp: Boolean): void {
        const nextMaxWidth = maxWidth + (sizeUp? 20: -20);
        if ((nextMaxWidth > 0) && (nextMaxWidth < 500)) {
            setMaxWidth(nextMaxWidth);
        }
    }

    return (
        <>
            <svg
                width={500}
                height={500}
                style={{backgroundColor: "#ccc"}}
            >
                <RectContainText
                    text={usingText}
                    fontSize={fontSize}
                    x={10}
                    y={10}
                    minWidth={50}
                    maxWidth={maxWidth}
                    onSetSize={handleOnSetSize}
                />


                <text
                    x={10}
                    y={440}
                    stroke={"#333"}
                    fontSize={fontSize}
                >fontSize={fontSize}</text>

                <text
                    x={15}
                    y={475}
                    stroke={"#333"}
                >
                    maxWidth: {maxWidth}
                </text>
                <line
                    x1={10}
                    y1={480}
                    x2={10+maxWidth}
                    y2={480}
                    stroke={"#333"}
                    strokeWidth={1}
                />
                <line
                    x1={10}
                    y1={475}
                    x2={10}
                    y2={485}
                    stroke={"#333"}
                    strokeWidth={1}
                />
                <line
                    x1={10}
                    y1={0}
                    x2={10}
                    y2={500}
                    stroke={"#999"}
                    strokeWidth={1}
                    strokeDasharray={4}
                />
                <line
                    x1={10+maxWidth}
                    y1={475}
                    x2={10+maxWidth}
                    y2={485}
                    stroke={"#333"}
                    strokeWidth={1}
                />
                <line
                    x1={10+maxWidth}
                    y1={0}
                    x2={10+maxWidth}
                    y2={500}
                    stroke={"#999"}
                    strokeWidth={1}
                    strokeDasharray={4}
                />
            </svg><br />
            fontSize <button onClick={() => handleFontSizeButton(true)}>UP</button> <button onClick={() => handleFontSizeButton(false)}>DOWN</button><br />
            maxWidth <button onClick={() => handleMaxWidthButton(true)}>UP</button> <button onClick={() => handleMaxWidthButton(false)}>DOWN</button><br />
        </>
    )
}

export default App
