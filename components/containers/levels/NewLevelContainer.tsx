import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react'

function NewLevelContainer() {
    const [preview, setPreview] = useState<boolean>(false);
    const [needHelp, setNeedHelp] = useState<boolean>(false);
    const [changingImage, setChangingImage] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>("");
    const [correctAnswer, setCorrectAnswer] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<number>(0);
    const [picture, setPicture] = useState<string>("");
    const [tip, setTip] = useState<string>("");

    const router = useRouter();

    return (
        <div className="communityPage__newLevelContainer">
            {preview ? (
                <>
                    {needHelp && (
                        <div className="communityPage__newLevelContainer__needHelp">

                        </div>
                    )}

                    <header className="communityPage__newLevelContainer__previewHeader">
                        <button onClick={() => router.push("/community")}>Exit</button>
                        <button onClick={() => setNeedHelp(true)}>Help?</button>
                    </header>

                    <div className="communityPage__newLevelContainer__previewBody">
                        <div className="communityPage__newLevelContainer__previewBody__top">

                        </div>

                        <div className="communityPage__newLevelContainer__previewBody__bottom">
                            <div className="communityPage__newLevelContainer__previewBody__bottom__left">

                            </div>

                            <div className="communityPage__newLevelContainer__previewBody__bottom__right">
                                
                            </div>
                        </div>
                    </div>

                    <footer className="communityPage__newLevelContainer__previewFooter">
                        <button onClick={() => setPreview(false)}>Back</button>
                        <button onClick={() => setPreview(false)}>Create</button>
                    </footer>
                </>
            ) : (
                <>
                    <header className="communityPage__newLevelContainer__header">
                        <h2>Create new level</h2>
                    </header>

                    <div className="communityPage__newLevelContainer__body">
                        <div className="communityPage__newLevelContainer__body__top">
                            <textarea placeholder="Enter task question"></textarea>
                        </div>

                        <div className="communityPage__newLevelContainer__body__bottom">
                            <div className="communityPage__newLevelContainer__body__bottom__left">
                                <textarea placeholder="Enter a tip, that can help others answer Your question"></textarea>
                                <input 
                                    type="range" 
                                    placeholder="correct value" 
                                />
                                <div className="communityPage__newLevelContainer__body__bottom__left__difficultyContainer">
                                    <div className="communityPage__newLevelContainer__body__bottom__left__difficultyContainer__top">
                                        <p>Choose task difficulty</p>
                                    </div>
                                    <div className="communityPage__newLevelContainer__body__bottom__left__difficultyContainer__bottom">
                                        <img className={difficulty === 0 ? "active" : ""} src="/svg/happyFace.svg" alt="drawing of yellow, happy face" onClick={() => setDifficulty(0)} />
                                        <img className={difficulty === 1 ? "active" : ""} src="/svg/confusedFace.svg" alt="drawing of yellow, confused face" onClick={() => setDifficulty(1)} />
                                        <img className={difficulty === 2 ? "active" : ""} src="/svg/angryFace.svg" alt="drawing of red, angry face" onClick={() => setDifficulty(2)} />
                                    </div>
                                </div>
                            </div>

                            <div className="communityPage__newLevelContainer__body__bottom__right">
                                {changingImage ? (
                                    <input type="url" placeholder="Enter image URL" />
                                ) : (
                                    <div className="communityPage__newLevelContainer__body__bottom__right__picture">
                                        <img src="/png/pictureIcon.png" alt="painting of mountains and a sun" />
                                        <div className="communityPage__newLevelContainer__body__bottom__right__picture__overlay" onClick={() => setChangingImage(true)}></div>
                                    </div>
                                )}
                            </div>
                        </div>
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
