

import { RectContainText1 } from './components/RectContainText1';

function App() {
    function handleOnSetSize(width: number, height: number): void {
        console.log(`w:${width}, h:${height}`);
    }

    return (
        <>
            <svg
                width={500}
                height={500}
                style={{backgroundColor: "#ccc"}}
            >
                <RectContainText1
                    text="test1 test2 test3 test4 test5 test6 test7 test8 test9 test10"
                    fontSize={30}
                    x={10}
                    y={10}
                    minWidth={50}
                    maxWidth={400}
                    onSetSize={handleOnSetSize}
                />
            </svg>
        </>
    )
}

export default App
