'use client';
import Typewriter from 'typewriter-effect';

export default function TypewriterComp() {
  return (
    <div className="text-[#00B8D8] text-[0.65em] md:text-[1.75em] font-medium font-[kongtext] leading-tight">
      <Typewriter
        options={{
          delay: 30,
          deleteSpeed: 50,
          autoStart: true,
          loop: false,
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString("I'm a Programmer/Gamer! B)")
            .start();
        }}
      />
    </div>
  );
}
