import { useRouter } from 'next/dist/client/router';
import React from 'react'

function PrivacyPolicy() {
    const router = useRouter();

    return (
        <div className="privacyPolicy__container">
            <h1>Privacy Policy</h1>

            <div className="privacyPolicy__container__button">
                <button onClick={() => router.back()}>Back</button>
            </div>

            <p>Last Updated: 08.11.2021</p>
            <p>This Privacy Policy (“Policy”) explains the information collection, use, and sharing practices of mathroom.</p>
            <p>Unless otherwise stated, this Policy describes and governs the information collection, use, and sharing practices of mathroom with respect to your use of our website mathroom.vercel.app/ and the services (“education”) we provide.</p>
            <p>Before you use or submit any information through or in connection with the Services, please carefully review this Privacy Policy. By using any part of the Services, you understand that your information will be collected, used, and disclosed as outlined in this Privacy Policy.</p>

            <h3>Our Principles</h3>

            <p>Mathroom has designed this policy to be consistent with the following principles:</p>

            <ul>
                <li>Privacy policies should be human readable and easy to find.</li>
                <li>Data collection, storage, and processing should be simplified as much as possible to enhance security, ensure consistency, and make the practices easy for users to understand.</li>
                <li>Data practices should meet the reasonable expectations of users.</li>
            </ul>

            <h3>Information We Collect</h3>

            <p>The only information we collect is the user's name and email, even passwords are not stored in the database.We don't collect any cookies and don’t pass the information on to third parties.</p>
        
            <h3>How We Use Your Information</h3>

            <p>We can use the information collected to improve our service,  including to develop new features or services, and take steps to secure the Services.</p>
        
            <h3>When We Disclose Your Information</h3>
        
            <p>Legal Compliance and Protection of Creative Commons and Others. We may disclose your information if required to do so by law or on a good faith belief that such disclosure is permitted by this Privacy Policy or reasonably necessary or appropriate for any of the following reasons:  to comply with legal process;</p>
        
            <h3>Your Choices and Data Subject Rights</h3>

            <p>Account Preferences</p>

            <p>If you create an account at the current stage of the game, you will not be able to change the username or email. You won't be able to sign out of the account, but you can leave the game by closing the browser tab.</p>
        
            <h3>Data Retention</h3>
        
            <p>We retain the information we collect for as long as necessary to fulfill the purposes set forth in this Privacy Policy or as long as we are legally required or permitted to do so. Information may persist in copies made for backup and business continuity purposes for additional time.</p>
        
            <h3>Changes to this Privacy Policy</h3>

            <p>We will continue to evaluate this Privacy Policy as we update and expand our Services, and we may make changes to the Privacy Policy accordingly. We will post any changes here and revise the date last updated above. We encourage you to check this page periodically for updates to stay informed on how we collect, use and share your information. If we make material changes to this Privacy Policy, we will provide you with notice.</p>
        
            <h3>Questions About this Privacy Policy</h3>

            <p>If you have any questions about this Privacy Policy or our privacy practices, you can contact us at: robzlegz@gmail.com</p>
        </div>
    )
}

export default PrivacyPolicy
