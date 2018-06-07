import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const About = (props) => {
  let data = props.data;
  return (
    <div>
      <Navbar data={data}/>
      <div style={{width: "80%", margin: "auto", padding: "30px 15px", background: "white"}} className="content">
        <h1>About Us</h1>
        <hr/>
        <div>
          <h3>Who we are!</h3>
          <p>A friend who always tells you what suits you the most according to your personality and habit, because these 2 aspects defines you as a person, whether what to wear, where to eat and what to buy? From your shopping companion to your fashion mentor, by knowing you better, Vuzuk will make your life effortless.</p>
          <h3>What we do!</h3>
          <p>Vuzuk brings all the blogs and bloggers under one roof through which it becomes a lifestyle guidebook where reading enthusiasts can unveil the blogs, articles and reviews by a variety of bloggers around the world. Mainly in Food, Fashion, Tech & Travel.</p>
          <p>Vuzuk is here to make your life easier, and when we say lifestyle, we believe in covering every aspect of it and what's new in the market. All in an effort so you don't have to.</p>
          <p>As a reader, a person always loves to read variety. Hence, here at Vuzuk, it will provide the maximum number of variations of writing, which helps you to make strong opinion about your personality and make you feel confident and only confident person will stand out in the society.</p>
          <h3>Why Vuzuk?</h3>
          <p>Vuzuk helps you to make your personality better day by day and we also helps you to make your life easier, and when we say lifestyle, we believe in covering every aspect of it.</p>
          <h3>Vuzuk for bloggers!</h3>
          <p>And if you're a blogger, and thinking - 'sigh, this applies more to my audience than me'. Well, don't fret, we are here to help you too. We will help you take the right path, give you right audience, according to your preferences, brand collaborations blogger photoshoot, 1 article or photo for bloggers of the month/week, will boost bloggers making a video or behind the scenes efforts and more. Now isn't that something that every blogger wants? In the end, you're here for your audience.</p>
          <p>Being a blogger takes a lot from being taken risks to hanging out with youngsters to understand their generation to take risks and the most important part is to be reliable. Understanding all the aspects Vuzuk will help you to give you your correct path and connect you to the audience</p>
          <p>As we said, Vuzuk is ‘Your lifestyle guidebook’, so come aboard and join us and see how your life's going to get so much better with this beautiful ride.</p>
          <p>Vuzuk act as a bridge that fills in the gaps between the bloggers and the readers. It is a blogging platform which will cover the Food, Tech, Fashion, Travel and many more aspects of lifestyle. Vuzuk is a reliable friend and a reliable platform to connect to the readers.</p>
          <p>So what you are waiting for, <b>DIMAG KHARCH MAT KAR, VUZUK KAR</b>.</p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default About;