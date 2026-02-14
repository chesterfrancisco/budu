import React, { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import Swal from "sweetalert2";
import { BsVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";

import MouseStealing from './MouseStealer.jsx';
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import Lovegif from "./assets/GifData/main_temp.gif";
import heartGif from "./assets/GifData/happy.gif";
import sadGif from "./assets/GifData/sad.gif";
import WordMareque from './MarqueeProposal.jsx';
import swalbg from './assets/Lovingbg2_main.jpg';

//! yes - Gifs Importing
import yesgif0 from "./assets/GifData/Yes/lovecutie0.gif";
import yesgif1 from "./assets/GifData/Yes/love2.gif";
import yesgif2 from "./assets/GifData/Yes/love3.gif";
import yesgif3 from "./assets/GifData/Yes/love1.gif";
import yesgif4 from "./assets/GifData/Yes/lovecutie1.gif";
import yesgif5 from "./assets/GifData/Yes/lovecutie5.gif";
import yesgif6 from "./assets/GifData/Yes/lovecutie7.gif";
import yesgif7 from "./assets/GifData/Yes/lovecutie8.gif";
import yesgif8 from "./assets/GifData/Yes/lovecutie3.gif";
import yesgif9 from "./assets/GifData/Yes/lovecutie9.gif";
import yesgif10 from "./assets/GifData/Yes/lovecutie6.gif";
import yesgif11 from "./assets/GifData/Yes/lovecutie4.gif";
//! no - Gifs Importing
import nogif0 from "./assets/GifData/No/breakRej0.gif";
import nogif0_1 from "./assets/GifData/No/breakRej0_1.gif";
import nogif1 from "./assets/GifData/No/breakRej1.gif";
import nogif2 from "./assets/GifData/No/breakRej2.gif";
import nogif3 from "./assets/GifData/No/breakRej3.gif";
import nogif4 from "./assets/GifData/No/breakRej4.gif";
import nogif5 from "./assets/GifData/No/breakRej5.gif";
import nogif6 from "./assets/GifData/No/breakRej6.gif";
import nogif7 from "./assets/GifData/No/RejectNo.gif";
import nogif8 from "./assets/GifData/No/breakRej7.gif";

//! yes - Music Importing
import yesmusic1 from "./assets/AudioTracks/Love_nakauwi.mp3";
import yesmusic2 from "./assets/AudioTracks/Love_ale.mp3";
import yesmusic3 from "./assets/AudioTracks/Love_bawatdaan.mp3";
import yesmusic4 from "./assets/AudioTracks/Love_baliw.mp3";
//! no - Music Importing
import nomusic1 from "./assets/AudioTracks/Rejection_WeDontTalkAnyMore.mp3";
import nomusic2 from "./assets/AudioTracks/Rejection_LoseYouToLoveMe.mp3";
import nomusic3 from "./assets/AudioTracks/Reject_withoutMe.mp3";
import nomusic4 from "./assets/AudioTracks/Neutral_Base_IHateU.mp3";
import nomusic5 from "./assets/AudioTracks/Reject1_TooGood.mp3";
import palagiVideo from "./assets/VideoTracks/palagi.mp4";

const YesGifs = [yesgif0, yesgif1, yesgif2, yesgif3, yesgif4, yesgif5, yesgif6, yesgif7, yesgif8, yesgif9, yesgif10, yesgif11];
const NoGifs = [nogif0, nogif0_1, nogif1, nogif2, nogif3, nogif4, nogif5, nogif6, nogif7, nogif8];
const YesMusic = [yesmusic1, yesmusic3, yesmusic4, yesmusic2];
const NoMusic = [nomusic1, nomusic2, nomusic3, nomusic4, nomusic5];
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [currentGifIndex, setCurrentGifIndex] = useState(0); // Track the current gif index
  const [isMuted, setIsMuted] = useState(false);
  const [showPalagiPage, setShowPalagiPage] = useState(false);
  const [resumeAudioOnBack, setResumeAudioOnBack] = useState(false);
  const [isOpeningYesModal, setIsOpeningYesModal] = useState(false);

  const gifRef = useRef(null); // Ref to ensure gif plays infinitely
  const audioRef = useRef(null); // Persistent player so playlist transitions stay seamless
  const yesQueueRef = useRef([]);
  const yesButtonSize = noCount * 16 + 16;

  const [floatingGifs, setFloatingGifs] = useState([]); // Array to store active floating GIFs
  const generateRandomPositionWithSpacing = (existingPositions) => {
    let position;
    let tooClose;
    const minDistance = 15; // Minimum distance in 'vw' or 'vh'
  
    do {
      position = {
        top: `${Math.random() * 90}vh`, // Keep within 90% of viewport height
        left: `${Math.random() * 90}vw`, // Keep within 90% of viewport width
      };
  
      tooClose = existingPositions.some((p) => {
        const dx = Math.abs(parseFloat(p.left) - parseFloat(position.left));
        const dy = Math.abs(parseFloat(p.top) - parseFloat(position.top));
        return Math.sqrt(dx * dx + dy * dy) < minDistance;
      });
    } while (tooClose);
  
    return position;
  };
  
  const handleMouseEnterYes = () => {
    const gifs = [];
    const positions = [];
  
    for (let i = 0; i < 10; i++) {
      const newPosition = generateRandomPositionWithSpacing(positions);
      positions.push(newPosition);
  
      gifs.push({
        id: `heart-${i}`,
        src: heartGif,
        style: {
          ...newPosition,
          animationDuration: `${Math.random() * 2 + 1}s`,
        },
      });
    }
  
    setFloatingGifs(gifs);
  };
  
  const handleMouseEnterNo = () => {
    const gifs = [];
    const positions = [];
  
    for (let i = 0; i < 10; i++) {
      const newPosition = generateRandomPositionWithSpacing(positions);
      positions.push(newPosition);
  
      gifs.push({
        id: `sad-${i}`,
        src: sadGif,
        style: {
          ...newPosition,
          animationDuration: `${Math.random() * 2 + 1}s`,
        },
      });
    }
  
    setFloatingGifs(gifs);
  };
  
  const handleMouseLeave = () => {
    setFloatingGifs([]); // floating GIFs on mouse leave
  };

  // This ensures the "Yes" gif keeps restarting and playing infinitely
  useEffect(() => {
    if (gifRef.current && yesPressed) {
      gifRef.current.src = YesGifs[currentGifIndex];
    }
  }, [yesPressed, currentGifIndex]);

  // Use effect to change the Yes gif every 5 seconds
  useEffect(() => {
    if (yesPressed) {
      const intervalId = setInterval(() => {
        setCurrentGifIndex((prevIndex) => (prevIndex + 1) % YesGifs.length);
      }, 5000); // Change gif every 5 seconds

      // Clear the interval
      return () => clearInterval(intervalId);
    }
  }, [yesPressed]);

  useEffect(() => {
    if (gifRef.current) {
      gifRef.current.src = gifRef.current.src; // Reset gif to ensure it loops infinitely
    }
  }, [noCount]);

  const handleNoClick = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    if (nextCount >= 4) {
      const nextGifIndex = (nextCount - 4) % NoGifs.length; // Start cycling through NoGifs
      if (gifRef.current) {
        gifRef.current.src = NoGifs[nextGifIndex];
      }
    }

    // Play song on first press or every 7th press after
    if (nextCount === 1 || (nextCount - 1) % 7 === 0) {
      const nextSongIndex = Math.floor(nextCount / 7) % NoMusic.length;
      playMusic(NoMusic[nextSongIndex], NoMusic);
    }
  };
  
  const handleYesClick = async () => {
    if (yesPressed || isOpeningYesModal) return;

    setIsOpeningYesModal(true);
    await Swal.fire({
      title: "Special message just for you",
      html: "I love you so much. You are my joy, my peace, and my forever.<br/>Ready ka na ba sa next page, mahal?",
      width: 700,
      padding: "2em",
      color: "#1f2937",
      background: `#fff url(${swalbg})`,
      confirmButtonText: "Open my love page",
      confirmButtonColor: "#e11d48",
      allowOutsideClick: false,
    });

    setYesPressed(true);
    playYesPlaylist();
    setIsOpeningYesModal(false);
  };
  
  const buildYesQueue = () => [yesmusic1, ...shuffle([yesmusic2, yesmusic3, yesmusic4])];

  const playMusicAtIndex = (index, musicArray) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    audio.onended = () => {
      const nextIndex = (index + 1) % musicArray.length;
      playMusicAtIndex(nextIndex, musicArray);
    };
    audio.muted = isMuted;
    audio.src = musicArray[index];
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const playMusic = (url, musicArray) => {
    const startIndex = Math.max(0, musicArray.indexOf(url));
    playMusicAtIndex(startIndex, musicArray);
  };

  const playYesPlaylist = () => {
    yesQueueRef.current = buildYesQueue();
    const playQueueAt = (index) => {
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }
      const audio = audioRef.current;
      const queue = yesQueueRef.current;

      audio.onended = () => {
        let nextIndex = index + 1;
        if (nextIndex >= queue.length) {
          yesQueueRef.current = buildYesQueue();
          nextIndex = 0;
        }
        playQueueAt(nextIndex);
      };

      audio.muted = isMuted;
      audio.src = queue[index];
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    playQueueAt(0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleNextToPalagi = () => {
    if (audioRef.current) {
      setResumeAudioOnBack(!audioRef.current.paused);
      audioRef.current.pause();
    } else {
      setResumeAudioOnBack(false);
    }
    setShowPalagiPage(true);
  };

  const handleBackFromPalagi = () => {
    if (resumeAudioOnBack && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    setShowPalagiPage(false);
  };

  const getNoButtonText = () => {

    const phrases = [
      "No",
      "Sure ka ba?",
      "Really sure?",
      "Think again, love.",
      "Last chance, bebe.",
      "Wag naman no agad?",
      "Baka pwede yes na?",
      "Give it another thought, please.",
      "Are you absolutely sure?",
      "Parang ang sakit naman.",
      "May soft side ka naman, diba?",
      "Don't be too cold, please.",
      "Reconsider mo na please?",
      "Final answer mo na ba talaga?",
      "You're breaking my heart a little.",
      "But why, love?",
      "Pretty please with lambing?",
      "I can't take this, ang sakit.",
      "Are you sure you want to do this to me?",
      "You're gonna hurt my feelings.",
      "Please reconsider, kahit konti lang.",
      "I still believe in us.",
      "My heart says yes, what about yours?",
      "Don't leave me hanging, mahal.",
      "Please? You're breaking my heart.",
    ];
    
    return phrases[Math.min(noCount, phrases.length - 1)];
  };
  useEffect(() => {
    if (noCount == 25) {
      Swal.fire({
        title: "My love for you is endless, like stars that keep shining every night. I will wait patiently and keep proving that you are my everything. Please press 'Yes' and let us make this a forever story.<br/>'True love never gives up; it grows stronger with time.'",
        width: 850,
        padding: "2em",
        color: "#716add",
        background: `#fff url(${swalbg})`,
        backdrop: `
          rgba(0, 104, 123, 0.7)
          url(${nogif1})
          right
          no-repeat
        `,
      });
    }
  }, [noCount]);

  if (showPalagiPage) {
    return (
      <div className="min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_10%_20%,_#9f7aea_0%,_#6ee7f9_25%,_#ec4899_50%,_#a78bfa_75%,_#93c5fd_100%)]">
        <div className="min-h-screen w-full backdrop-blur-[1px] bg-white/15 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-5xl rounded-3xl bg-black/45 border border-white/40 shadow-2xl p-4 md:p-8">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-white text-2xl md:text-4xl font-bold">Happy Valentines and Monthsary Love</h2>
              <button
                onClick={handleBackFromPalagi}
                className="bg-white/90 hover:bg-white text-black font-semibold px-4 py-2 rounded-lg"
              >
                Back
              </button>
            </div>

            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/40 shadow-xl bg-black">
              <video className="h-full w-full" controls autoPlay loop>
                <source src={palagiVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-white/90 text-sm md:text-base mt-4">
              For you, always and in all ways. Mahal kita, palagi.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen -z-10">
        <Spline scene="https://prod.spline.design/oSxVDduGPlsuUIvT/scene.splinecode" />
        {/* <Spline scene="https://prod.spline.design/ZU2qkrU9Eyt1PHBx/scene.splinecode" /> */}
      </div>

      {noCount > 16 && noCount < 25 && yesPressed == false && <MouseStealing />}

      <div className="overflow-hidden flex flex-col items-center justify-center pt-4 h-screen -mt-16 selection:bg-rose-600 selection:text-white text-zinc-900">
        {yesPressed ? (
          <>
            <img
              ref={gifRef}
              className="h-[230px] rounded-lg"
              src={YesGifs[currentGifIndex]}
              alt="Yes Response"
            />
            <div className="text-4xl md:text-6xl font-bold my-2" style={{ fontFamily: "Charm, serif", fontWeight: "700", fontStyle: "normal" }}>I Love You !!!</div>
            <div  className="text-4xl md:text-4xl font-bold my-1" style={{ fontFamily: "Beau Rivage, serif", fontWeight: "500", fontStyle: "normal" }}> You are the love of my life. </div> 
            <WordMareque />
            <button
              onClick={handleNextToPalagi}
              className="mt-4 bg-white/90 hover:bg-white text-black font-semibold px-6 py-3 rounded-xl border border-white shadow-md"
            >
              Next: Play Palagi
            </button>
          </>
        ) : (
          <>
            <img
              src={lovesvg}
              className="fixed animate-pulse top-10 md:left-15 left-6 md:w-40 w-28"
              alt="Love SVG"
            />
            <img
              ref={gifRef}
              className="h-[230px] rounded-lg"
              src={Lovegif}
              alt="Love Animation"
            />
            <h1 className="text-4xl md:text-6xl my-4 text-center">
              Will you be my Valentine?
            </h1>
            <div className="flex flex-wrap justify-center gap-2 items-center">
              <button
                onMouseEnter={handleMouseEnterYes}
                onMouseLeave={handleMouseLeave}
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4`}
                style={{ fontSize: yesButtonSize }}
                onClick={handleYesClick}
              >
                Yes
              </button>
              <button
                onMouseEnter={handleMouseEnterNo}
                onMouseLeave={handleMouseLeave}
                onClick={handleNoClick}
                className="bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-bold py-2 px-4"
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>
            {floatingGifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.src}
                alt="Floating Animation"
                className="absolute w-12 h-12 animate-bounce"
                style={gif.style}
              />
            ))}
          </>
        )}
        <button
          className="fixed bottom-10 right-10 bg-gray-200 p-1 mb-2 rounded-full hover:bg-gray-300"
          onClick={toggleMute}
        >
          {isMuted ? <BsVolumeMuteFill size={26} /> : <BsVolumeUpFill size={26} />}
        </button>
      </div>
    </>
  );
}







// ! Pathways-
// https://app.spline.design/file/48a9d880-40c9-4239-bd97-973aae012ee0
// https://app.spline.design/file/72e6aee2-57ed-4698-afa7-430f8ed7bd87
