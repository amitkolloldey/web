import React from 'react';
import DocViewer, {DocViewerRenderers} from "react-doc-viewer";
import withUnmounted from "@ishawnwang/withunmounted/src/withUnmounted";

function StitchDocViewer(props) {
    return (
        <DocViewer pluginRenderers={DocViewerRenderers} documents={
            [
                {uri: 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf'}
            ]
        }/>
    );
}

export default withUnmounted(StitchDocViewer);