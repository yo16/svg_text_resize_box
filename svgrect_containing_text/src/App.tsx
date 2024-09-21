import { useState } from 'react';

import { RectContainText } from './components/RectContainText';

function App() {
    const [fontSize, setFontSize] = useState<number>(24);
    const [minWidth, setMinWidth] = useState<number>(100);
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

    // 最小幅を20ずつ上げたり下げたりする
    function handleMinWidthButton(sizeUp: Boolean): void {
        const nextMinWidth = minWidth + (sizeUp? 20: -20);
        if ((nextMinWidth > 0) && (nextMinWidth < 500) && (nextMinWidth < maxWidth)) {
            setMinWidth(nextMinWidth);
        }
    }

    // 最大幅を20ずつ上げたり下げたりする
    function handleMaxWidthButton(sizeUp: Boolean): void {
        const nextMaxWidth = maxWidth + (sizeUp? 20: -20);
        if ((nextMaxWidth > 0) && (nextMaxWidth < 500)) {
            setMaxWidth(nextMaxWidth);
        }
    }

    // テキスト変更
    function handleChangedText(newText: string) {
        setUsingText(newText);
    }

    return (
        <>
            <svg
                width={500}
                height={500}
                style={{backgroundColor: "#ccc", border: "2px solid #999"}}
            >
                <RectContainText
                    text={usingText}
                    fontSize={fontSize}
                    x={10}
                    y={10}
                    minWidth={minWidth}
                    maxWidth={maxWidth}
                    onSetSize={handleOnSetSize}
                />


                <text
                    x={10}
                    y={400}
                    stroke={"#333"}
                    fontSize={fontSize}
                >fontSize={fontSize}</text>

                <text
                    x={15}
                    y={435}
                    stroke={"#333"}
                >
                    minWidth: {minWidth}
                </text>
                <line
                    x1={10}
                    y1={440}
                    x2={10+minWidth}
                    y2={440}
                    stroke={"#333"}
                    strokeWidth={1}
                />
                <line
                    x1={10}
                    y1={435}
                    x2={10}
                    y2={445}
                    stroke={"#333"}
                    strokeWidth={1}
                />
                <line
                    x1={10+minWidth}
                    y1={435}
                    x2={10+minWidth}
                    y2={445}
                    stroke={"#333"}
                    strokeWidth={1}
                />
                <line
                    x1={10+minWidth}
                    y1={0}
                    x2={10+minWidth}
                    y2={500}
                    stroke={"#999"}
                    strokeWidth={1}
                    strokeDasharray={4}
                />

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
            text <input
                type="text"
                value={usingText}
                size={50}
                onChange={(e) => handleChangedText(e.target.value)}
            /><br />
            fontSize <button onClick={() => handleFontSizeButton(true)}>UP</button> <button onClick={() => handleFontSizeButton(false)}>DOWN</button><br />
            minWidth <button onClick={() => handleMinWidthButton(true)}>UP</button> <button onClick={() => handleMinWidthButton(false)}>DOWN</button><br />
            maxWidth <button onClick={() => handleMaxWidthButton(true)}>UP</button> <button onClick={() => handleMaxWidthButton(false)}>DOWN</button><br />
        </>
    )
}

export default App
