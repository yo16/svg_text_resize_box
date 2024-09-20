// svgのtextとそれを包含するrect
// textをスペースの位置で改行して、maxWidth内に収める

import { useLayoutEffect, useRef, useState  } from "react";

interface RectContainText1Props {
    text: string;
    fontSize: number;
    x: number;
    y: number;
    minWidth: number;
    maxWidth: number;
    // サイズの確定後、フィードバックする
    onSetSize: (width: number, height: number) => void;
}
export const RectContainText1: React.FC<RectContainText1Props> = ({
    text,
    fontSize,
    x,
    y,
    minWidth,
    maxWidth,
    onSetSize,
}) => {
    const textRef = useRef<SVGTextElement>(null);
    const [textLines, setTextLines] = useState<string[]>([]);
    const [rectSize, setRectSize] = useState<{width: number; height: number}>({width: 0, height: 0});
    const [oneLineHeight, setOneLineHeight] = useState<number>(0);

    useLayoutEffect(
        () => {
            if (textRef.current) {
                // textをスペース区切りで配列にする
                const words: string[] = text.split(' ');
                let currentLine = '';
                const lines: string[] = [];

                // 折り返しの１行目（textの１つ目）にlineを入れてみたとき、
                // maxWidthを超えていなければTrue、超えている場合はFalse
                const testLine = (line: string) => {
                    if (textRef.current) {
                        textRef.current.textContent = line;
                        const bb = textRef.current.getBBox();
                        const lineWidth = bb.width;
                        if (oneLineHeight===0) {
                            setOneLineHeight(bb.height);
                        }
                        return lineWidth <= maxWidth;
                    }
                }

                // maxWidthに収まるlinesを作る
                words.forEach((word) => {
                    // wordを１つ追加
                    const testCurrentLine = currentLine ? `${currentLine} ${word}`: word;

                    if (testLine(testCurrentLine)) {
                        // 超えていない
                        currentLine = testCurrentLine;
                    } else {
                        // 超えている
                        // wordを加える前をlinesに入れ、
                        lines.push(currentLine);
                        // 次のcurrentLineにwordを入れる
                        currentLine = word;
                    }
                });
                lines.push(currentLine);

                // state値の textLines を更新
                setTextLines(lines);

                // rectSizeを計算
                const lineMaxSize: number = lines.reduce(
                    (curMaxSize, line) => {
                        if (!textRef.current) return curMaxSize;
                        textRef.current.textContent = line;
                        const curLineWidth = textRef.current.getBBox().width;
                        return Math.max(curMaxSize, curLineWidth);
                    },
                    0
                );
                const finalBbox = textRef.current.getBBox();
                const newWidth = lineMaxSize;
                const newHeight = finalBbox.height * lines.length;
                console.log(lines);
                setRectSize({
                    width: newWidth,
                    height: newHeight
                });

                // 変更されたので、フィードバック
                onSetSize(newWidth ,newHeight);

                // textRef.currentの文字列は使わないので初期化
                textRef.current.textContent = "";
            }

        },
        [text, fontSize, minWidth, maxWidth]
    );
    
    return (
        <g>
            <rect
                x={x}
                y={y}
                width={rectSize.width}
                height={rectSize.height}
                fill="#a2dff1"
                stroke="#709aa7"
                strokeWidth={1}
            />
            <text
                ref={textRef}
                x={x}
                y={y-9}
                fontSize={fontSize}
            >
            {textLines.map((line: string, line_i: number) => (
                <tspan
                    key={`tspan_line_${line_i}`}
                    x={x}
                    dx={0}
                    dy={oneLineHeight}
                >{line}</tspan>
            ))}
            </text>
        </g>
    );
}
