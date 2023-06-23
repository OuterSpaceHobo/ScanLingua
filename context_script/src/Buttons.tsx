import styled from 'styled-components'

  export const CloseButton = styled.button`
  padding: 0;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  background: #319795;
  border: 0px;
  color: black;
  border-style: outset;
  border-width: 0px;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 'auto', 
  justify-content: 'center', 
  align-items: 'center', 
  display: 'flex',
  `

  export const AnkiButton = styled.button`
  padding: 0;
  width: 35px;
  height: 42px;
  border-radius: 5px;
  margin-top: 5px;
  background: #319795;
  border: 0px;
  color: black;
  border-style: outset;
  border-width: 0px;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 'auto', 
  justify-content: 'center', 
  align-items: 'center', 
  text-align: 'center;,

  animation: fadeInAnimation ease 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  @keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
  }
  `

  export const EditButton = styled.button`
  padding: 0;
  width: fit-content;
  height: fit-content;
  border-radius: 5px;
  background: none;
  border: 0px;
  color: black;
  text-decoration: solid underline black 1px;
  border-style: outset;
  border-width: 0px;
  padding: 0;
  cursor: pointer;
  vertical-align: text-top;
  `

  export const AudioButton = styled.button`
  padding: 0;
  width: 23px;
  height: 23px;
  border-radius: 0px;
  background: none;
  border: 0px;
  color: tomato;
  border-style: outset;
  border-width: 0px;
  padding: 0;
  cursor: pointer;
  vertical-align: text-top;
  `

  export const TileButton = styled.button<{ dropdown: any, index: any }>`
  color: ${(props) => props.dropdown === props.index ? 'tomato' : 'black'};
  padding: 0;
  width: 60px;
  height: 60px;
  border-radius: 0px;
  background: none;
  border: 0px;
  border-style: outset;
  border-width: 0px;
  padding: 0;
  cursor: pointer;
  vertical-align: text-top;

  animation: fadeInAnimation ease 0.3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  @keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
  }
  `

  export const Spinner = styled.div`
  border: 2px solid white;
  border-top: 2px rgb(49, 151, 149) solid;

  border-radius: 50%;
  height: 30px;
  width: 30px;
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  `

  export function Loader() {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6L12 3" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 21L12 19" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 12L21 12" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 12L6 12" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.6569 6.34314L18.364 5.63603" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.63605 18.364L7.05026 16.9497" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.9498 16.9498L18.364 18.364" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.63605 5.63605L7.75737 7.75737" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  export function Close() {
    return (
      <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" strokeWidth="1" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6L18 18" strokeWidth="1" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  export function Anki() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="35px" height="42px" fillRule="nonzero">
        <g fill="#FFFFFF" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
          <g transform="scale(5.12,5.12)">
            <path d="M12.84375,2c-3.188,0 -5.84375,2.852 -5.84375,6v34c0,1.863 0.92175,3.39125 2.09375,4.40625c1.172,1.015 2.58625,1.59375 3.90625,1.59375h24.375c3.09,0 5.625,-2.535 5.625,-5.625v-34.75c0,-3.09 -2.535,-5.625 -5.625,-5.625zM12.84375,4h24.53125c2.008,0 3.625,1.617 3.625,3.625v20.40234c-8.708,-6.771 -19.7,-11.16216 -32,-12.78516v-7.24219c0,-1.949 1.93775,-4 3.84375,-4zM35.03125,6.71094c-0.18263,0.01262 -0.36258,0.076 -0.51758,0.1875l-2.5332,1.83008l-2.94531,-1.04883c-0.358,-0.129 -0.75825,-0.04239 -1.03125,0.22461c-0.273,0.265 -0.37286,0.66144 -0.25586,1.02344l0.95703,2.97656l-1.90625,2.47656c-0.232,0.302 -0.27347,0.70878 -0.10547,1.05078c0.168,0.341 0.51548,0.55759 0.89648,0.55859l3.125,0.00781l1.76563,2.58008c0.188,0.275 0.49917,0.43555 0.82617,0.43555c0.047,0 0.09363,-0.00277 0.14063,-0.00977c0.377,-0.054 0.68959,-0.31769 0.80859,-0.67969l0.97461,-2.9707l2.99805,-0.88281c0.365,-0.107 0.63813,-0.41211 0.70313,-0.78711c0.065,-0.375 -0.08848,-0.75452 -0.39648,-0.97852l-2.52344,-1.84375l0.08789,-3.125c0.011,-0.381 -0.19425,-0.73411 -0.53125,-0.91211c-0.1685,-0.089 -0.35448,-0.12591 -0.53711,-0.11328zM34.04297,9.70508l-0.04687,1.625c-0.009,0.329 0.14416,0.64389 0.41016,0.83789l1.3125,0.95703l-1.55859,0.45898c-0.316,0.093 -0.56497,0.33449 -0.66797,0.64649l-0.50586,1.54492l-0.91797,-1.33984c-0.186,-0.272 -0.49522,-0.4365 -0.82422,-0.4375l-1.625,-0.00391l0.99219,-1.28711c0.201,-0.26 0.26216,-0.60302 0.16016,-0.91601l-0.49805,-1.54687l1.53125,0.54492c0.31,0.109 0.65392,0.06314 0.91992,-0.13086zM9,17.25977c12.43,1.684 23.45,6.2768 32,13.3418v11.77344c0,2.012 -1.613,3.625 -3.625,3.625h-24.375c-0.68,0 -1.76575,-0.37875 -2.59375,-1.09375c-0.828,-0.715 -1.40625,-1.69125 -1.40625,-2.90625zM20.95313,22.90625c-0.565,0.068 -1.03366,0.44347 -1.22266,0.98047l-1.76562,5.01367l-5.13477,1.38867c-0.549,0.149 -0.95741,0.58848 -1.06641,1.14648c-0.11,0.558 0.10269,1.11884 0.55469,1.46484l4.22461,3.23047l-0.26758,5.30859c-0.029,0.569 0.26372,1.09509 0.76172,1.37109c0.227,0.127 0.47466,0.18945 0.72266,0.18945c0.295,0 0.5878,-0.08962 0.8418,-0.26562l4.37695,-3.01758l4.96484,1.89258c0.531,0.205 1.12206,0.09112 1.53906,-0.29687c0.418,-0.387 0.57606,-0.96672 0.41406,-1.51172l-1.51758,-5.09766l3.33594,-4.13672c0.357,-0.443 0.43141,-1.03964 0.19141,-1.55664c-0.241,-0.514 -0.7435,-0.84538 -1.3125,-0.85937l-5.31445,-0.12891l-2.9043,-4.45117c-0.311,-0.479 -0.85387,-0.72706 -1.42187,-0.66406zM21.26953,25.53711l2.48242,3.80469c0.268,0.409 0.71903,0.66083 1.20703,0.67383l4.54297,0.11133l-2.85156,3.53516c-0.308,0.382 -0.40758,0.89047 -0.26758,1.35547l1.29688,4.35352l-4.24414,-1.61719c-0.457,-0.174 -0.97009,-0.11194 -1.37109,0.16406l-3.74023,2.57813l0.22852,-4.5332c0.026,-0.489 -0.19303,-0.95986 -0.58203,-1.25586l-3.60937,-2.75977l4.38281,-1.18555c0.472,-0.126 0.85358,-0.47841 1.01758,-0.94141z">
            </path>
          </g>
        </g>
      </svg>
    );
  }

  export function PlayAudio() {
    return (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M625.9 115c-5.9 0-11.9 1.6-17.4 5.3L254 352H90c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h164l354.5 231.7c5.5 3.6 11.6 5.3 17.4 5.3 16.7 0 32.1-13.3 32.1-32.1V147.1c0-18.8-15.4-32.1-32.1-32.1zM586 803L293.4 611.7l-18-11.7H146V424h129.4l17.9-11.7L586 221v582zm348-327H806c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16h128c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16zm-41.9 261.8l-110.3-63.7a15.9 15.9 0 0 0-21.7 5.9l-19.9 34.5c-4.4 7.6-1.8 17.4 5.8 21.8L856.3 800a15.9 15.9 0 0 0 21.7-5.9l19.9-34.5c4.4-7.6 1.7-17.4-5.8-21.8zM760 344a15.9 15.9 0 0 0 21.7 5.9L892 286.2c7.6-4.4 10.2-14.2 5.8-21.8L878 230a15.9 15.9 0 0 0-21.7-5.9L746 287.8a15.99 15.99 0 0 0-5.8 21.8L760 344z"></path>
      </svg>
    )
  }

  export function PauseAudio() {
    return (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M892.1 737.8l-110.3-63.7a15.9 15.9 0 0 0-21.7 5.9l-19.9 34.5c-4.4 7.6-1.8 17.4 5.8 21.8L856.3 800a15.9 15.9 0 0 0 21.7-5.9l19.9-34.5c4.4-7.6 1.7-17.4-5.8-21.8zM760 344a15.9 15.9 0 0 0 21.7 5.9L892 286.2c7.6-4.4 10.2-14.2 5.8-21.8L878 230a15.9 15.9 0 0 0-21.7-5.9L746 287.8a15.99 15.99 0 0 0-5.8 21.8L760 344zm174 132H806c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16h128c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16zM625.9 115c-5.9 0-11.9 1.6-17.4 5.3L254 352H90c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h164l354.5 231.7c5.5 3.6 11.6 5.3 17.4 5.3 16.7 0 32.1-13.3 32.1-32.1V147.1c0-18.8-15.4-32.1-32.1-32.1z"></path>
      </svg>
    )
  }