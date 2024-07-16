import React from 'react'
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'New Board',
    Board: () => <div>
        <button>Button</button>
        <a>LINK TO CLICK</a>
    </div>,
    environmentProps: {
        windowWidth: 1024,
        canvasHeight: 5,
        windowHeight: 768
    }
});
