import React, { useRef } from 'react'
import Link from "next/link";
import { useRouter } from 'next/dist/client/router';

function InstructionContainer() {
    const authorizationRef = useRef<null | HTMLDivElement>(null);
    const singlePlayerRef = useRef<null | HTMLDivElement>(null);
    const multiplayerRef = useRef<null | HTMLDivElement>(null);

    const router = useRouter();

    return (
        <div className="instructionPage__container">
            <div className="instructionPage__container__contentContainer instructionContainer">
                <header className="instructionPage__container__contentContainer__header">
                    <h1>Mathroom</h1>
                    <h2>Instruction</h2>
                </header>
                <ul className="instructionPage__container__contentContainer__body">
                    <li onClick={() => router.push("/menu")}>Main menu</li>
                    <li onClick={() => authorizationRef.current?.scrollIntoView({behavior: "smooth"})}>Authorization</li>
                    <li onClick={() => singlePlayerRef.current?.scrollIntoView({behavior: "smooth"})}>Single player</li>
                    <li onClick={() => multiplayerRef.current?.scrollIntoView({behavior: "smooth"})}>Multiplayer</li>
                </ul>
            </div>

            <div className="instructionPage__container__authorization instructionContainer" ref={authorizationRef}>
                <h3>Register</h3>
                <img src="/instructions/registerTutorial.png" alt="mathroom registration form tutorial" />
                <ul className="instructionPage__container__authorization__instructions">
                    <li>[2] Enter Your username (it must be unique)</li>
                    <li>[3] Enter Your email (You can hav)</li>
                    <li>[4] Enter Your password</li>
                    <li>[5] Confirm Your password (Passwords must match!)</li>
                    <li>If You want to create account, You must accept our privacy policy <Link href="/privacy-policy">privacy policy</Link>!</li>
                    <li>If You already have an account You can login!</li>
                </ul>
                <h3>Login</h3>
                <img src="/instructions/loginTutorial.png" alt="mathroom login form tutorial" />
                <ul className="instructionPage__container__authorization__instructions">
                    <li>[12] Enter Your e-mail and password. When enter e-mail don't forget @gmail.com.</li>
                    <li>[13] Enter Your password</li>
                    <li>If something goes wrong or you forget your email or password, try to Register again.</li>
                </ul>
            </div>

            <div className="instructionPage__container__singlePlayer instructionContainer" ref={singlePlayerRef}>
                <h3>Single player</h3>
                <img src="/instructions/levelInfo.png" alt="mathroom single player level options" />
                <ul className="instructionPage__container__singlePlayer__instructions">
                    <li>[18] Exit to main menu</li>
                    <li>[19] By clicking this You will be redirected to a page where You can create Your own level that appear on community levels page.</li>
                    <li>[20] First level. You have to start with the first level, completing it will open the next one for you.</li>
                </ul>

                <img src="/instructions/activeLevel.png" alt="mathroom single player active level screen with buttons and a picture of boy" />
                <ul className="instructionPage__container__singlePlayer__instructions">
                    <li>[21] Exit to level page</li>
                    <li>[22] If You need some help with task, click this button to receive tips.</li>
                    <li>[22] By dragging input You can change answer on the right. By clicking number next to input You can write the answer with keyboard</li>
                    <li>[23] When answer entered, You can submit it.</li>
                    <li>[24] Just an ilustration for task.</li>
                </ul>

                <img src="/instructions/levelOptions.png" alt="mathroom single player level options" />
                <ul className="instructionPage__container__singlePlayer__instructions">
                    <li>[25] If You have completed a level there will be "next" button. By clicking it You can skip the current level.</li>
                </ul>
            </div>

            <div className="instructionPage__container__singlePlayer instructionContainer" ref={multiplayerRef}>
                <h3>Multiplayer</h3>
                <img src="/instructions/roomPageOptions.png" alt="mathroom single player level options" />
                <ul className="instructionPage__container__multiplayer__instructions">
                    <li>[26] Go to main menu.</li>
                    <li>[27] Create a new room that other people can join and play together.</li>
                    <li>[28] Room name</li>
                    <li>[29] Join room</li>
                    <li>[30] Number of tasks this room has.</li>
                    <li>[31] Number of players that have joined the room.</li>
                </ul>

                <img src="/instructions/newRoomTutorial.png" alt="mathroom single player active level screen with buttons and a picture of boy" />
                <ul className="instructionPage__container__multiplayer__instructions">
                    <li>[32] Name of the room</li>
                    <li>[33] Amount of stages/tasks Your room will have</li>
                    <li>[34] Maximum amount of people that can join Your room</li>
                    <li>[35] Make Your room private (only players with room name or link will be able to join Your room)</li>
                    <li>[36] Make Your room public (everyone will be able to see Your room and join it)</li>
                    <li>[37] Go back to room screen</li>
                    <li>[38] Create room (final step)</li>
                </ul>

                <img src="/instructions/waitingRoomOptions.png" alt="mathroom single player level options" />
                <ul className="instructionPage__container__multiplayer__instructions">
                    <li>[39] Name of the room You have joined</li>
                    <li>[40] Amount of players in Your room</li>
                    <li>[41] List of all players in Your room</li>
                    <li>[42] Send a message to public chat</li>
                    <li>[43] Disband/delete room (this button is visible only to room creators)</li>
                    <li>[44] Start game (this button is visible only to room creators)</li>
                </ul>
            </div>
        </div>
    )
}

export default InstructionContainer
