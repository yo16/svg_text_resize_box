// svgのtextとそれを包含するrect
// textをスペースの位置で改行して、maxWidth内に収める

import { useLayoutEffect, useRef } from "react";

export interface RectContainTextProps {
    text: string;
    fontSize: number;
    x: number;
    y: number;
    minWidth: number;
    maxWidth: number;
    // サイズの変更後、フィードバックする
    onSetSize: (width: number, height: number) => void;
}
export const RectContainText: React.FC<RectContainTextProps> = ({
    text,
    fontSize,
    x,
    y,
    minWidth,
    maxWidth,
    onSetSize,
}) => {
    const textRef = useRef<SVGTextElement>(null);
    const rectRef = useRef<SVGRectElement>(null);

    // 描画の直前にtextを解析して、<text>、<rect>を書き換える
    useLayoutEffect(
        () => {
            // text
            let rectSize: {width: number, height: number} = {width: 0, height: 0};
            if (textRef.current) {
                // textをスペース区切りで配列にする
                const words: string[] = text.split(' ');

                // 折り返しの１行目（textの１つ目）にlineを入れてみて、
                // maxWidthを超えていなければTrue、超えている場合はFalse
                const getLineBB = (line: string): DOMRect | null => {
                    if (textRef.current) {
                        textRef.current.textContent = line;
                        const bb = textRef.current.getBBox();
                        return bb;
                    }
                    return null;
                }

                // maxWidthに収まるlinesを作る
                const lines: string[] = [];
                let currentLine = '';
                let linesMaxWidth: number = 0;
                words.forEach((word) => {
                    // wordを１つ追加
                    const testCurrentLine: string
                        = currentLine ? `${currentLine} ${word}`: word;

                    // textを入れてみたBBを取得
                    const curBB: DOMRect | null = getLineBB(testCurrentLine);
                    if (!curBB) return;
                    if (curBB.width <= maxWidth) {
                        // 超えていない
                        currentLine = testCurrentLine;
                        linesMaxWidth = (linesMaxWidth < curBB.width)? curBB.width: linesMaxWidth;
                    } else {
                        // 超えている
                        // wordを加える前をlinesに入れ、
                        lines.push(currentLine);
                        // 次のcurrentLineにwordを入れる
                        currentLine = word;
                    }
                });
                lines.push(currentLine);
                const curBB: DOMRect | null = getLineBB(currentLine);
                if (!curBB) return;
                linesMaxWidth = (linesMaxWidth < curBB.width)? curBB.width: linesMaxWidth;
                const oneLineHeight = curBB.height;

                // textRefを直接変更
                // 一旦すべて削除
                textRef.current.textContent = "";
                textRef.current.innerHTML = "";
                // 子要素としてtspanを作成して追加
                const svgNS = "http://www.w3.org/2000/svg";
                lines.forEach((line) => {
                    const tspanElement = document.createElementNS(svgNS, "tspan");
                    tspanElement.setAttribute("x", `${x}`);
                    tspanElement.setAttribute("dx", "0");
                    tspanElement.setAttribute("dy", `${oneLineHeight}`);
                    tspanElement.textContent = line;
                    
                    textRef.current?.appendChild(tspanElement);
                });

                // rectのために情報を渡す
                rectSize = {
                    width: (linesMaxWidth < minWidth)? minWidth: linesMaxWidth,
                    height: oneLineHeight * lines.length,
                };
            }

            // rect
            if (rectRef.current) {
                const newWidth = rectSize.width;
                const newHeight = rectSize.height;

                rectRef.current.setAttribute("width", `${newWidth}`);
                rectRef.current.setAttribute("height", `${newHeight}`);

                onSetSize(newWidth, newHeight);
            }
        },
        [text, fontSize, minWidth, maxWidth]
    );

    return (
        <g>
            <rect
                ref={rectRef}
                x={x}
                y={y}
                width={10}
                height={10}
                fill="#f1dfa2"
                stroke="#a79a70"
                strokeWidth={1}
            />
            <text
                ref={textRef}
                x={x}
                y={y}
                dominantBaseline={"text-after-edge"}
                fontSize={fontSize}
            ></text>
        </g>
    );
}

