import React, { Fragment } from 'react';

const Landing = () => {
  return (
    <Fragment>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Place of CatButler</h1>
            <p className='lead'>
              The place of the cat-butler who struggling to feed her owner -
              Yellow & Black
            </p>
          </div>
        </div>
      </section>
      <section className='guide'>
        <div className='guide-box'>
          <h1 className='large'>Who I am</h1>
          <p className='lead'>
            Hi, Everyone. I'm the developer of this web-site. My main job is
            working as a servant for my lord - Yellow & Black. To make money, I
            have been using JAVA to develop web-programs. Taking care of my lord
            is my pleasure. But! because they don't pay for the labor I do, so I
            take it granted - staying web-developer.
          </p>
        </div>
        <div className='guide-box'>
          <h1 className='large'>MERN stack</h1>
          <p className='lead'>
            My ultimate goal is escaping from JAVA to JAVASCRIPT. Haha. This
            web-site is made using by Mongodb, Nodejs(Express), React(Redux) and
            Webpack.... etc.... It took very long time to build the basic
            structure of this site. This is not the end. I'll use as many
            technologies as possible to make this site represent how good I am.
          </p>
        </div>
        <div className='guide-box'>
          <h1 className='large'>How scrutinize</h1>
          <p className='lead'>
            You can see the hamburger menu box on right top of your screen. If
            click it, you can see the projects menu I have made so far. Don't be
            disappointed. The menu are going to be many as time goes. Depend on
            wheather you logged in or not, the functions can be changed.
          </p>
        </div>
      </section>
      <section className='footer'>
        <div>
          <p>Yujin &copy; 2019</p>
        </div>
      </section>
    </Fragment>
  );
};

export default Landing;
