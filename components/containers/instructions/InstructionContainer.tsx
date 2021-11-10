import React, { useRef } from 'react'
import { useRouter } from 'next/dist/client/router';

function InstructionContainer() {
    const authorizationRef = useRef<null | HTMLDivElement>(null);
    const singlePlayerRef = useRef<null | HTMLDivElement>(null);
    const multiplayerRef = useRef<null | HTMLDivElement>(null);
    const communityRef = useRef<null | HTMLDivElement>(null);

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
                    <li onClick={() => communityRef.current?.scrollIntoView({behavior: "smooth"})}>Community</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={authorizationRef}>
                <h3>Authorization</h3>
                <img src="/instructions/1.png" alt="mathroom user manual description" />
                <ul>
                    <li>1. Clicking this button will redirect You to login page.</li>
                    <li>2. Clicking this button will redirect You to register page.</li>
                    <li>3. This button redirects You to this page.</li>
                </ul>
                <h3>Register</h3>
                <img src="/instructions/2.png" alt="mathroom user manual description" />
                <ul>
                    <li>4. Enter Your username.</li>
                    <li>5. Enter Your email.</li>
                    <li>6. Choose a secure password at least 6 characters long.</li>
                    <li>7. Enter Your password again.</li>
                    <li>8. If you change your mind and want to log in.</li>
                    <li>9. You need to agree with our privacy policy to create an account successfully.</li>
                </ul>
            </div>

            <div className="instructionContainer">
                <h3>Login</h3>
                <img src="/instructions/3.png" alt="mathroom user manual description" />
                <ul>
                    <li>10. Enter your account email.</li>
                    <li>11. Enter your account password.</li>
                    <li>12. If something went wrong, or you forgot your email or password, you can register again.</li>
                    <li>13. This button allows you to login into your account if the password and email are correct.</li>
                </ul>
            </div>
             
            <div className="instructionContainer">
                <h3>Main menu</h3>
                <img src="/instructions/4.png" alt="mathroom user manual description" />
              
                <ul>
                    <li>14. If you want to play singleplayer, click this button.</li>
                    <li>15. If you're going to multiplayer, click this button.</li>
                    <li>16. If you're going to the community, click this button.</li>
                    <li>17. If you want to read instruction.</li>
                    <li>18. If you want to see your profile.</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={singlePlayerRef}>
                <h3>Single player</h3>
                <img src="/instructions/5.png" alt="mathroom user manual description" />
                <ul>
                    <li>19. If you want to go back to the home page.</li>
                    <li>20. If you want to create a new exercise that will appear in the community.</li>
                    <li>21. Level to complete.</li>
                </ul>
            </div>

            <div className="instructionContainer">
                <h3>Single player</h3>
                <img src="/instructions/6.png" alt="mathroom user manual description" />
                <ul>
                    <li>22. If you want to exit, click this button.</li>
                    <li>23. If you need a hint to solve this level, click this button.</li>
                    <li>24. You need to slide the blue ball or click on the number and write it down to show the answer.</li>
                    <li>25. If you want to submit the answer, click on the button.</li>
                    <li>26. Image for the exercise.</li>
                </ul>
            </div>

            <div className="instructionContainer">
                <h3>Single player</h3>
                <img src="/instructions/7.png" alt="mathroom user manual description" />
                <ul>
                    <li>27. If you already have done this exercise, doing it again, you can skip it if you want.</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={multiplayerRef}>
                <h3>Multiplayer</h3>
                <img src="/instructions/8.png" alt="mathroom user manual description" />
                <ul>
                    <li>28. To go back.</li>
                    <li>29. Create a new room that other people can join and play together.</li>
                    <li>30. Room name.</li>
                    <li>31. Join room</li>
                    <li>32. Number of tasks this room has.</li>
                    <li>33. Number of players that have joined the room.</li>
                </ul>
            </div>

            <div className="instructionContainer">
                <h3>Multiplayer</h3>
                <img src="/instructions/9.png" alt="mathroom user manual description" />
                <ul>
                    <li>34. Name of the room.</li>
                    <li>35. Amount of stages/tasks Your room will have.</li>
                    <li>36. Maximum amount of people that can join Your room.</li>
                    <li>37. Make Your room private (only players with room name or link will be able to join Your room).</li>
                    <li>38. Make Your room public (everyone will be able to see Your room and join it).</li>
                    <li>39. Go back to room screen.</li>
                    <li>40. Create room (final step).</li>
                </ul>
            </div>

            <div className="instructionContainer">
                <h3>Multiplayer</h3>
                <img src="/instructions/10.png" alt="mathroom user manual description" />
                <ul>
                    <li>41. Name of the room You have joined.</li>
                    <li>42. Amount of players in Your room.</li>
                    <li>43. List of all players in Your room.</li>
                    <li>44. Send a message to public chat.</li>
                    <li>45. Disband/delete room (this button is visible only to room creators).</li>
                    <li>46. Start game (this button is visible only to room creators).</li>
                </ul>
            </div>

            <div className="instructionContainer" ref={communityRef}>
                <h3>Community</h3>
                <img src="/instructions/11.png" alt="mathroom user manual description" />
                <ul>
                    <li>47. Levels that are now acceptable.</li>
                    <li>48. A leader board shows players and how many points they have.</li>
                    <li>49. The menu lets you go back to the home page.</li>
                    <li>50. Search allows you to find a specific player.</li>
                    <li>51. Task difficulty type(medium).</li>
                    <li>52. Task difficulty type(hard).</li>
                    <li>53. Task difficulty type(easy).</li>
                    <li>54. You can create your exercise, and it will be on the page and your profile if the admin approves it.</li>
                    <li>55. You can see already accomplished exercises, for example, 27.</li>
                    <li>56. This button allows you to see exercises of all difficulties.</li>
                    <li>57. Exercise.</li>
                    <li>58. There are three emojis(three difficulties):</li>
                    <li>smiling face - easy,</li>
                    <li> expressionless emoji - medium,</li>
                    <li> mad emoji - hard difficulty levels.</li>
                </ul>
            </div>

            <div className="instructionContainer">
                <h3>Community</h3>
                <img src="/instructions/12.png" alt="mathroom user manual description" />
                <ul>
                    <li>59. If exercise has a green border around it, it means you already have accomplished it before.</li>
                </ul>
            </div>

            <div className="instructionContainer">
                <h3>Community</h3>
                <img src="/instructions/14.png" alt="mathroom user manual description" />
                <ul>
                    <li>62. Your place in the rating.</li>
                    <li>63. Number of your points.</li>
                    <li>64. Your plase in the ratting display.</li>
                </ul>
            </div>

            <div className="instructionContainer">
                <h3>Community</h3>
                <img src="/instructions/15.png" alt="mathroom user manual description" />
                <ul>
                    <li>65. This is the place where you can type the name of the user you want to find.</li>
                    <li>66. Button to start search.</li>
                    <li>67. Name of user.</li>
                    <li>68. Clicking this button, you can see the player profile.</li>
                </ul>
            </div>

            <div className="instructionContainer">
                <h3>Community</h3>
                <img src="/instructions/13.png" alt="mathroom user manual description" />
                <ul>
                    <li>69. If you want to exit.</li>
                    <li>70. Players name.</li>
                    <li>71. A number of player points.</li>
                    <li>72. David created the following tasks.</li>
                    <li>73. For example.</li>
                </ul>
            </div>

        </div>
    )
}

export default InstructionContainer