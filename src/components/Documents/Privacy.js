import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from "../Footer/Footer";

const Privacy = (props) => {
  let data;
  if (__isBrowser__) {
    data = window.__INITIAL_DATA__;
  } else {
    data = props.data
  }

  return (
  <div>
    <Navbar data={data}/>
      <div style={{width: "80%", margin: "auto", padding: "30px 15px", background: "white"}} className="content">
        <h1>PRIVACY POLICY</h1>
        <pre>Last updated May 23, 2018</pre>
        <hr/>
        <p>Vuzuk (“we” or “us” or “our”) respects the privacy of our users (“user” or “you”). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website http://vuzuk.com/ and our mobile application including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the “Site”). Please read this Privacy Policy carefully. IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT ACCESS THE SITE.</p>
        <p>We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the “Revised” date of this Privacy Policy. Any changes or modifications will be effective immediately upon posting the updated Privacy Policy on the Site, and you waive the right to receive specific notice of each such change or modification. You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Site after the date such revised Privacy Policy is posted.</p>
        <h3>COLLECTION OF YOUR INFORMATION</h3>
        <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
        <h4>Personal Data</h4>
        <p>Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or our mobile application, or  when you choose to participate in various activities related to the Site and our mobile application, such as online chat and message boards. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the Site and our mobile application.</p>
        <h4>Derivative Data</h4>
        <p>Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site. If you are using our mobile application, this information may also include your device name and type, your operating system, your phone number, your country, your likes and replies to a post, and other interactions with the application and other users via server log files, as well as any other information you choose to provide.</p>
        <h4>Financial Data</h4>
        <p>Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site or our mobile application.</p>
        <h4>Data From Social Networks</h4>
        <p>User information from social networking sites, such as Twitter, Pinterest, Instagram, Google+, Facebook, including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks. If you are using our mobile application, this information may also include the contact information of anyone you invite to use and/or join our mobile application.</p>
        <h4>Mobile Device Data</h4>
        <p>Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the Site from a mobile device.</p>
        <h4>Data From Contests, Giveaways, and Surveys</h4>
        <p>Personal and other information you may provide when entering contests or giveaways and/or responding to surveys.</p>
        <h4>Mobile Application Information</h4>
        <p>If you connect using our mobile application:</p>
        <ul>
          <li>Geo-Location Information. We may request access or permission to and track location-based information from your mobile device, either continuously or while you are using our mobile application, to provide location-based services. If you wish to change our access or permissions, you may do so in your device’s settings.</li>
          <li>Mobile Device Access. We may request access or permission to certain features from your mobile device, including your mobile device’s camera, contacts, SMS messages, social media accounts, and other features. If you wish to change our access or permissions, you may do so in your device’s settings.</li>
          <li>Mobile Device Data. We may collect device information (such as your mobile device ID, model and manufacturer), operating system, version information and IP address.</li>
          <li>Push Notifications. We may request to send you push notifications regarding your account or our Services. If you wish to opt-out from receiving these types of communications, you may turn them off in your device’s settings.</li>
        </ul>
        <h3>USE OF YOUR INFORMATION</h3>
        <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site or our mobile application to:</p>
        <ul>
          <li>Administer sweepstakes, promotions, and contests.</li>
          <li>Assist law enforcement and respond to subpoenas.</li>
          <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
          <li>Create and manage your account.</li>
          <li>Deliver targeted advertising, coupons, newsletters, and promotions, and other information regarding our website and mobile application to you.</li>
          <li>Email you regarding your account or order.</li>
          <li>Enable user-to-user communications.</li>
          <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site and our mobile application.</li>
          <li>Generate a personal profile about you to make future visits to the Site and our mobile application more personalized.</li>
          <li>Increase the efficiency and operation of the Site and our mobile application.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the Site and our mobile application.</li>
          <li>Solicit support for the Site and our mobile application.</li>
          <li>Send you a newsletter.</li>
          <li>Respond to product and customer service requests.</li>
          <li>Request feedback and contact you about your use of the Site and our mobile application.</li>
          <li>Process payments and refunds.</li>
          <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
          <li>Offer new products, services, mobile applications, and/or recommendations to you.</li>
          <li>Notify you of updates to the Site and our mobile application.</li>
          <li>Perform other business activities as needed.</li>
        </ul>
        <h3>DISCLOSURE OF YOUR INFORMATION</h3>
        <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
        <h4>By Law or to Protect Rights</h4>
        <p>If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.  This includes exchanging information with other entities for fraud protection and credit risk reduction.</p>
        <h4>Third-Party Service Providers</h4>
        <p>We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</p>
        <h4>Marketing Communications</h4>
        <p>With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law. </p>
        <h4>Interactions with Other Users</h4>
        <p>If you interact with other users of the Site  and our mobile application, those users may see your name, profile photo, and descriptions of your activity, including sending invitations to other users, chatting with other users, liking posts, following blogs.</p>
        <h4>Online Postings</h4>
        <p>When you post comments, contributions or other content to the Site or our mobile application, your posts may be viewed by all users and may be publicly distributed outside the Site and our mobile application in perpetuity.</p>
        <h4>Third-Party Advertisers</h4>
        <p>We may use third-party advertising companies to serve ads when you visit the Site or our mobile application. These companies may use information about your visits to the Site and our mobile application and other websites that are contained in web cookies in order to provide advertisements about goods and services of interest to you.</p>
        <h4>Affiliates</h4>
        <p>We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</p>
        <h4>Business Partners</h4>
        <p>We may share your information with our business partners to offer you certain products, services or promotions.</p>
        <h4>Offer Wall</h4>
        <p>Our mobile application may display a third-party hosted “offer wall.” Such an offer wall allows third-party advertisers to offer virtual currency, gifts, or other items to users in return for acceptance and completion of an advertisement offer. Such an offer wall may appear in our mobile application and be displayed to you based on certain data, such as your geographic area or demographic information. When you click on an offer wall, you will leave our mobile application. A unique identifier, such as your user ID, will be shared with the offer wall provider in order to prevent fraud and properly credit your account.</p>
        <h4>Social Media Contacts</h4>
        <p>If you connect to the Site or our mobile application through a social network, your contacts on the social network will see your name, profile photo, and descriptions of your activity.</p>
        <h4>Other Third Parties</h4>
        <p>We may share your information with advertisers and investors for the purpose of conducting general business analysis. We may also share your information with such third parties for marketing purposes, as permitted by law.</p>
        <h4>Sale or Bankruptcy</h4>
        <p>If we reorganize or sell all or a portion of our assets, undergo a merger, or are acquired by another entity, we may transfer your information to the successor entity.  If we go out of business or enter bankruptcy, your information would be an asset transferred or acquired by a third party. You acknowledge that such transfers may occur and that the transferee may decline honor commitments we made in this Privacy Policy.</p>
        <p>We are not responsible for the actions of third parties with whom you share personal or sensitive data, and we have no authority to manage or control third-party solicitations. If you no longer wish to receive correspondence, emails or other communications from third parties, you are responsible for contacting the third party directly.</p>
        <h3>TRACKING TECHNOLOGIES</h3>
        <h4>Cookies and Web Beacons</h4>
        <p>We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site and our mobile application to help customize the Site and our mobile application and improve your experience. For more information on how we use cookies, please refer to our Cookie Policy posted on the Site, which is incorporated into this Privacy Policy. By using the Site, you agree to be bound by our Cookie Policy.</p>
        <h4>Internet-Based Advertising</h4>
        <p>Additionally, we may use third-party software to serve ads on the Site and our mobile application, implement email marketing campaigns, and manage other interactive marketing initiatives. This third-party software may use cookies or similar tracking technology to help manage and optimize your online experience with us. For more information about opting-out of interest-based ads, visit the<a href="https://developers.facebook.com/docs/facebook-login/permissions/v3.0" target="_blank">Network Advertising Initiative Opt-Out Tool</a> or <a href="//www.aboutads.info/choices/" target="_blank">Digital Advertising Alliance Opt-Out Tool</a>.</p>
        <h3>THIRD-PARTY WEBSITES</h3>
        <p>The Site and our mobile application may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Site or our mobile application, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. Before visiting and providing any information to any third-party websites, you should inform yourself of the privacy policies and practices (if any) of the third party responsible for that website, and should take those steps necessary to, in your discretion, protect the privacy of your information. We are not responsible for the content or privacy and security practices and policies of any third parties, including other sites, services or applications that may be linked to or from the Site or our mobile application.</p>
        <h3>GOOGLE MAPS</h3>
        <p>This website uses Google Maps APIs. You may find the Google Maps APIs Terms of Service <a href="https://developers.google.com/maps/terms" target="_blank">here</a>. To better understand Google’s Privacy Policy, please refer to this <a href="https://www.google.com/policies/privacy/" target="_blank">link</a>. By using our Maps API Implementation, you agree to be bound by Google’s Terms of Service. By using our implementation of the Google Maps APIs, you agree to allow us to gain access to information about you including personally identifiable information (such as usernames) and non-personally identifiable information (such as location). We will be collecting the following information.</p>
        <h3>SECURITY OF YOUR INFORMATION</h3>
        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.</p>
        <h3>POLICY FOR CHILDREN</h3>
        <p>We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>
        <h3>CONTROLS FOR DO-NOT-TRACK FEATURES</h3>
        <p>Most web browsers and some mobile operating systems and our mobile applications include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected.  No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Policy.</p>
        <h3>OPTIONS REGARDING YOUR INFORMATION</h3>
        <h4>Account Information</h4>
        <p>You may at any time review or change the information in your account or terminate your account by:</p>
        <ul>
          <li>Logging into user account settings and updating the user account.</li>
          <li>Contacting us using the contact information provided.</li>
        </ul>
        <p>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.</p>
        <h4>Emails and Communications</h4>
        <p>If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by:</p>
        <ul>
          <li>Noting your preferences at the time you register your account with the Site.</li>
          <li>Logging into your account settings and updating your preferences.</li>
          <li>Contacting us using the contact information provided.</li>
        </ul>
        <p>If you no longer wish to receive correspondence, emails, or other communications from third parties, you are responsible for contacting the third party directly.</p>
        <h3>CALIFORNIA PRIVACY RIGHTS</h3>
        <p>California Civil Code Section 1798.83, also known as the “Shine The Light” law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.</p>
        <p>If you are under 18 years of age, reside in California, and have a registered account with the Site or our mobile application, you have the right to request removal of unwanted data that you publicly post on the Site or our mobile application. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California.  We will make sure the data is not publicly displayed on the Site or our mobile application, but please be aware that the data may not be completely or comprehensively removed from our systems.</p>
        <h3>CONTACT US</h3>
        <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
        <strong>Vuzuk</strong><br/>
        <strong>Delhi</strong><br/>
        <strong>vuzukindia@gmail.com</strong>
      </div>
    <Footer/> 
  </div>
)}

export default Privacy;