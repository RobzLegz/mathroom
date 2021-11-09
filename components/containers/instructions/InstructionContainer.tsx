import React, { useRef } from 'react'
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
                    <li onClick={() => router.push("/menu")}><h3>Main menu</h3></li>
                    <li onClick={() => authorizationRef.current?.scrollIntoView({behavior: "smooth"})}>Authorization</li>
                    <li onClick={() => singlePlayerRef.current?.scrollIntoView({behavior: "smooth"})}>Single player</li>
                    <li onClick={() => multiplayerRef.current?.scrollIntoView({behavior: "smooth"})}>Multiplayer</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={authorizationRef}>
                <h3>Authorization</h3>
                <img src="/instructions/1.png" alt="" />
                <ul>
                    <li>1. Clicking this button will redirect You to login page</li>
                    <li>2. Clicking this button will redirect You to register page</li>
                    <li>3. This button redirects You to this page</li>
                </ul>
                <h3>Register</h3>
                <img src="/instructions/2.png" alt="" />
                <ul>
                    <li>4. Enter Your username</li>
                    <li>5. Enter Your email</li>
                    <li>6. Choose a secure password at least 6 characters long</li>
                    <li>7. Enter Your password again</li>
                    <li>8. </li>
                    <li>9. </li>
                </ul>
            </div>

            <div className="instructionContainer" ref={singlePlayerRef}>
                <h3>Single player</h3>
                <img src="/instructions/3.png" alt="mathroom single player level options" />
                <ul>
                    <li>10.</li>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={singlePlayerRef}>
                <h3>Single player</h3>
                <img src="/instructions/4.png" alt="mathroom single player level options" />
                <ul>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={singlePlayerRef}>
                <h3>Single player</h3>
                <img src="/instructions/5.png" alt="mathroom single player level options" />
                <ul>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={singlePlayerRef}>
                <h3>Single player</h3>
                <img src="/instructions/6.png" alt="mathroom single player level options" />
                <ul>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={singlePlayerRef}>
                <h3>Single player</h3>
                <img src="/instructions/7.png" alt="mathroom single player level options" />
                <ul>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={singlePlayerRef}>
                <h3>Single player</h3>
                <img src="/instructions/8.png" alt="mathroom single player level options" />
                <ul>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={singlePlayerRef}>
                <h3>Single player</h3>
                <img src="/instructions/9.png" alt="mathroom single player level options" />
                <ul>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={singlePlayerRef}>
                <h3>Single player</h3>
                <img src="/instructions/10.png" alt="mathroom single player level options" />
                <ul>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={singlePlayerRef}>
                <h3>Single player</h3>
                <img src="/instructions/11.png" alt="mathroom single player level options" />
                <ul>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={singlePlayerRef}>
                <h3>Single player</h3>
                <img src="/instructions/12.png" alt="mathroom single player level options" />
                <ul>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={singlePlayerRef}>
                <h3>Single player</h3>
                <img src="/instructions/13.png" alt="mathroom single player level options" />
                <ul>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={singlePlayerRef}>
                <h3>Single player</h3>
                <img src="/instructions/14.png" alt="mathroom single player level options" />
                <ul>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={singlePlayerRef}>
                <h3>Single player</h3>
                <img src="/instructions/15.png" alt="mathroom single player level options" />
                <ul>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                </ul>
            </div>
        </div>
    )
}

export default InstructionContainer
