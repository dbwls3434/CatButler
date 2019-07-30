import React, { Fragment } from 'react';

const About = () => {
  return (
    <Fragment>
      <h1 className='large text-primary'>한국어 인사</h1>
      <p className='lead'>
        <i className='fas fa-user' /> 소개 합니다.
      </p>
      <div className='about'>
        <div className='about-image' />
        <div className='about-inner'>
          안녕하세요. 최유진 입니다. 저의 공간에 찾아주신 걸 감사드립니다. 본
          사이트의 취지에 대해선 Landing 페이지 스크롤을 내리시면 알 수
          있겠지만, 영어로 써놓아서 와닿지 않으실 것같아 이렇게 한국어 소개
          페이지를 마련하였습니다.
        </div>
        <div className='about-inner'>
          이곳은 저의 Portfolio 이자, 제가 새로이 도전하는 MERN Stack (Node.js,
          Express, React.js, MongoDB), Front-End 개발, Publishing 등을 연습하고,
          이에 따라 어떤 기능 구현이 가능한지 소개하는 곳입니다.
        </div>
        <div className='about-inner'>
          회원가입/로그인은 JWT 를 이용하였고, 전체적으로 Redux 로 데이터 흐름이
          통제됩니다. Babel 로 브라우저 호환성에 대비하였고, 반응형 웹사이트를
          지향하여 SASS 로 스타일 관리를 하고 있습니다. 이러한 Front 단 자원들은
          Webpack 으로 조합 관리 합니다. DB는 mongoDB Atlas 클라우드를
          이용하였고, 웹서비스는 AWS EC2, static 파일은 AWS S3 서비스를
          이용하였습니다.
        </div>
        <div className='about-inner'>
          사이트 구성이 다소 짜임새 없어보일지 모르지만, 특정한 컨셉을 가지고
          유기적으로 연결된 사이트가 아니라, "제가 이런 기능을 코딩할 수
          있습니다." 라는 것을 선보이려는 취지로 본 사이트를 만들었다는 점을
          고려해 살펴봐 주십시오.
        </div>
        <div className='about-inner'>
          참고로 저는 오랫동안 JAVA/JSP/ORACLE 로 개발을 해왔고, 상당히 난이도
          있는 작업에도 "JAVA만 사용한다면" 문제가 없습니다. 하지만, 저의 궁극적
          목적은 Full-Stack 으로 가는 길입니다. JAVA 에 머물지 않은, 다른 언어,
          다른 환경, 그러나, 트랜디한 것에서 그 꿈을 이루고 싶습니다. 이
          웹사이트는 제가 진입장벽을 허물어 가는 과정을 보여줄 수 있는 공간이 될
          것입니다.
        </div>
        <div className='about-inner'>
          사이드바 메뉴는 점점 채워질 것입니다. 기초적인 게시판을 시작으로, 구현
          기능 별로 메뉴가 하나씩 추가될 것입니다. 메뉴가 늘어날 수록 제 능력도
          성장할 것이라는 것에 기대감이 큽니다. 그럼 저의 열정과 도전을 지켜봐
          주세요.
        </div>
      </div>
    </Fragment>
  );
};

export default About;
