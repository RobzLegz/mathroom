import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../../redux/slices/notificationSlice';
import { selectUser } from '../../../redux/slices/userSlice';
import { checkForLogin } from '../../../requests/auth/requests';
import { createNewLevel } from '../../../requests/community/levels/requests';

function NewLevelContainer() {
    const userInfo = useSelector(selectUser);

    const dispatch = useDispatch();
    const router = useRouter();

    const [preview, setPreview] = useState<boolean>(false);
    const [needHelp, setNeedHelp] = useState<boolean>(false);
    const [writing, setWriting] = useState<boolean>(false);
    const [changingImage, setChangingImage] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>("");
    const [correctAnswer, setCorrectAnswer] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<number>(0);
    const [enteredValue, setEnteredValue] = useState<number>(0);
    const [picture, setPicture] = useState<string>("/png/pictureIcon.png");
    const [tip, setTip] = useState<string>("");

    useEffect(() => {
        if(!userInfo.loggedIn || !userInfo.token){
            const token = window.localStorage.getItem("refreshtoken");

            if(token){
                checkForLogin(dispatch, router);
            }
        }
    }, [userInfo.loggedIn, dispatch, userInfo.token]);

    const goToPreview = () => {
        if(!question){
            return dispatch(setNotification({type: "error", message: "Please enter task question."}))
        }

        if(!correctAnswer){
            return dispatch(setNotification({type: "error", message: "Please enter correct answer to Your question."}))
        }

        if(!tip){
            return dispatch(setNotification({type: "error", message: "Please enter helpful tips that can help solving the task."}))
        }

        if(picture === "/png/pictureIcon.png" || picture === ""){
            return dispatch(setNotification({type: "error", message: "To change ilustraion URL, click the picture box"}))
        }

        let urlCheckRegex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i;
    
        let urlCheck = picture.match(urlCheckRegex);

        if(!urlCheck){
            return dispatch(setNotification({type: "error", message: "Please enter a valid image url"}))
        }
        
        setPreview(true);
    }

    const testSubmit = () => {
        if(correctAnswer === enteredValue){
            return dispatch(setNotification({type: "success", message: "Congrats, You answered correctly!"}))
        }
        dispatch(setNotification({type: "error", message: "Sorry, wrong answer!"}))
    }

    return (
        <div className="communityPage__newLevelContainer">
            {preview ? (
                <>
                    {needHelp && (
                        <div className="communityPage__newLevelContainer__tip">
                            <div className="communityPage__newLevelContainer__tip__inner">
                                <div className="communityPage__newLevelContainer__tip__inner__close" onClick={() => setNeedHelp(false)}>
                                    <div className="line1"></div>
                                    <div className="line2"></div>
                                </div>
                                <div className="communityPage__newLevelContainer__tip__inner__text">
                                    <p>{tip}</p>
                                </div>
                                <div className="buttonContainer">
                                    <button onClick={() => setNeedHelp(false)}>Okay</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <header className="communityPage__newLevelContainer__previewHeader">
                        <button onClick={() => router.push("/community")}>Exit</button>
                        <button onClick={() => setNeedHelp(true)}>Help?</button>
                    </header>

                    <div className="communityPage__newLevelContainer__previewBody">
                        <div className="communityPage__newLevelContainer__previewBody__top">
                            <strong>{question}</strong>
                        </div>

                        <div className="communityPage__newLevelContainer__previewBody__bottom">
                            <div className="communityPage__newLevelContainer__previewBody__bottom__left">
                                <div className="inputContainer">
                                    {writing ? (
                                        <input
                                            type="number"
                                            value={enteredValue.toString()}
                                            onChange={(e) => {if(e.target.value.length > 3){return}setEnteredValue(Number(e.target.value))}}
                                        />
                                    ) : (
                                        <input
                                            type="range"
                                            value={enteredValue}
                                            onChange={(e) => setEnteredValue(Number(e.target.value))}
                                            min={0}
                                            max={Math.floor(correctAnswer) + 20}
                                        />
                                    )}
                                    <strong onClick={() => setWriting(!writing)}>{enteredValue}</strong>
                                </div>
                                <div className="instruction">
                                    <small>Slide from left to right to change value or click the number next to it to write result</small>
                                </div>
                                <button onClick={() => testSubmit()}>Submit</button>
                            </div>

                            <div className="communityPage__newLevelContainer__previewBody__bottom__right">
                                <img src={picture} alt="Mathroom task ilustraion" />
                            </div>
                        </div>
                    </div>

                    <footer className="communityPage__newLevelContainer__previewFooter">
                        <button onClick={() => setPreview(false)}>Back</button>
                        <button onClick={() => createNewLevel(difficulty, question, tip, correctAnswer, picture, userInfo.token, dispatch, router)}>Create</button>
                    </footer>
                </>
            ) : (
                <>
                    <header className="communityPage__newLevelContainer__header">
                        <h2>Create new level</h2>
                    </header>

                    <div className="communityPage__newLevelContainer__body">
                        <div className="communityPage__newLevelContainer__body__top">
                            <textarea 
                                placeholder="Enter task question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="communityPage__newLevelContainer__body__bottom">
                            <div className="communityPage__newLevelContainer__body__bottom__left">
                                <div className="inpContainer">
                                    <label htmlFor="tip">Help others answer Your question</label>
                                    <textarea 
                                        placeholder="Tip"
                                        name="tip"
                                        id="tip"
                                        onChange={(e) => setTip(e.target.value)}
                                        value={tip}
                                    ></textarea>
                                </div>
                                <div className="inpContainer">
                                    <label htmlFor="correct_answer">Correct answer (number)</label>
                                    <input 
                                        type="number" 
                                        value={correctAnswer.toString()}
                                        onChange={(e) => {if(e.target.value.length > 3){return}setCorrectAnswer(Number(e.target.value))}}
                                        name="correct_answer"
                                        id="correct_answer"
                                    />
                                </div>
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
                                    <div className="inpContainer">
                                        <label htmlFor="image_url">Enter task ilustration URL</label>
                                        <input 
                                            name="image_url"
                                            id="image_url"
                                            type="url" 
                                            placeholder="Enter image URL" 
                                            value={picture}
                                            onChange={(e) => setPicture(e.target.value)}
                                        />
                                        <button onClick={() => setChangingImage(false)}>OK</button>
                                    </div>
                                ) : (
                                    <div className="communityPage__newLevelContainer__body__bottom__right__picture">
                                        <img src={picture === "" ? "/png/pictureIcon.png" : picture} alt="Mathroom task ilustraion" />
                                        <div className="communityPage__newLevelContainer__body__bottom__right__picture__overlay" onClick={() => {setChangingImage(true);setPicture("")}}></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <footer className="communityPage__newLevelContainer__footer">
                        <button onClick={() => router.push("/community")}>Back</button>
                        <button onClick={() => goToPreview()}>Preview</button>
                    </footer>
                </>
            )}
        </div>
    )
}

export default NewLevelContainer