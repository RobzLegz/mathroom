import React, { useState } from 'react'

function NewLevelContainer() {
    const [preview, setPreview] = useState(false);

    return (
        <div className="communityPage__newLevelContainer">
            <header className="communityPage__newLevelContainer__header">
                <h2>Create new level</h2>
            </header>

            {preview ? (
                <>
                    <div className="communityPage__newLevelContainer__preview">

                    </div>

                    <footer className="communityPage__newLevelContainer__previewFooter">

                    </footer>
                </>
            ) : (
                <>
                    <div className="communityPage__newLevelContainer__body">

                    </div>

                    <footer className="communityPage__newLevelContainer__footer">
                        <button onClick={() => setPreview(true)}>Preview</button>
                    </footer>
                </>
            )}
        </div>
    )
}

export default NewLevelContainer
