'use client';
import React, { useEffect, useRef, useState } from 'react';
import SlotCounter, { SlotCounterRef } from 'react-slot-counter';
import { getRandomValueFromArray } from '../../util';
import { cn } from '@/lib/utils';
import { generateImage } from '@/lib/generateImage';
import { Button } from './ui/button';
import useCreateIpAsset from '../../hooks/useCreateIpAsset';

const charactersList = {
  '🧞‍♂️': 'Sherlock Holmes',
  '🥷': 'Dr. John Watson',
  '👹': 'Dracula',
  '👩‍🦰': "Frankenstein's Monster",
  '👸': 'The Invisible Man',
  '🤡': 'Robin Hood',
  '🕵️‍♂️': 'King Arthur',
  '🥸': 'The Three Musketeers',
  '🧙‍♂️': 'Alice (from Alice in Wonderland)',
  '🧟': 'Dorothy Gale (from The Wizard of Oz)',
};

const storyList = {
  '🚀': 'A Tale of Two Cities by Charles Dickens',
  '🛸': 'Dracula by Bram Stoker',
  '🛩': 'Frankenstein by Mary Shelley',
  '⛵️': 'The Adventures of Sherlock Holmes by Arthur Conan Doyle',
  '⚔️': "Alice's Adventures in Wonderland by Lewis Carroll",
  '🗺': 'The Great Gatsby by F. Scott Fitzgerald',
  '🎎': 'The Picture of Dorian Gray by Oscar Wilde',
  '🗝': 'Moby Dick by Herman Melville',
  '🧭': 'A Tale of Two Cities by Charles Dickens',
  '🪦': 'Dracula by Bram Stoker',
  '📖': 'Wuthering Heights by Emily Brontë',
};

const twistList = {
  '🪄': 'twist 1',
  '🪅': 'tw 2',
  '💣': 't3',
  '💥': 't4',
  '⚡️': 't5',
  '🐉': 't6',
  '🦪': 't7',
  '🎲': 't8',
  '🍀': 't9',
  '💘': 't11',
  '🔓': 't111',
};

export default function Slots() {
  const charRef = useRef<SlotCounterRef>(null);
  const storyRef = useRef<SlotCounterRef>(null);
  const twistRef = useRef<SlotCounterRef>(null);
  const [isCharLocked, setIsCharLocked] = React.useState<boolean>(false);
  const [isStoryLocked, setIsStoryLocked] = React.useState<boolean>(false);
  const [isTwistLocked, setIsTwistLocked] = React.useState<boolean>(false);

  const twistListArray = Object.keys(twistList);
  const charListArray = Object.keys(charactersList);
  const storyListArray = Object.keys(storyList);
  const [twistValue, setTwistValue] = React.useState<string[]>(
    getRandomValueFromArray(twistListArray)
  );
  const [charValue, setCharValue] = React.useState<string[]>(
    getRandomValueFromArray(charListArray)
  );
  const [storyValue, setStoryValue] = React.useState<string[]>(
    getRandomValueFromArray(storyListArray)
  );

  const prompt = `${charValue} ${storyValue} ${twistValue}`;
  console.log('prompt', prompt);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingSuccess, setIsGeneratingSuccess] = useState(false);
  const [createReq, setCreateReq] = useState<any>();

  async function onSubmit(prompt: string) {
    setIsGeneratingImage(true);
    setIsGeneratingSuccess(false);
    const response = await generateImage(prompt);
    setIsGeneratingImage(false);
    console.log('res', response);
    setIsGeneratingSuccess(true);
    setImageUrl(response.output[0]);

    const createReq = {
      name: prompt,
      typeIndex: 0,
      ipOrgId: process.env.NEXT_PUBLIC_ISM_IP_ORG_ID,
      mediaUrl: imageUrl,
    };

    await setCreateReq(createReq);
  }

  const { execute } = useCreateIpAsset(createReq);
  useEffect(() => {
    if (createReq) {
      execute();
    }
  }, [createReq]);

  const RollButton = () => {
    return (
      <button
        className="rounded-lg p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-40 mx-auto border-2 shadow-xl text-black"
        onClick={() => {
          if (!isCharLocked) {
            setCharValue(getRandomValueFromArray(charListArray));
            charRef.current?.startAnimation({
              duration: 2,
              dummyCharacterCount: charListArray.length,
              direction: 'top-down',
            });
          }
          if (!isStoryLocked) {
            setStoryValue(getRandomValueFromArray(storyListArray));
            storyRef.current?.startAnimation({
              duration: 3,
              dummyCharacterCount: storyListArray.length,
              direction: 'top-down',
            });
          }
          if (!isTwistLocked) {
            setTwistValue(getRandomValueFromArray(twistListArray));
            twistRef.current?.startAnimation({
              duration: 4,
              dummyCharacterCount: twistListArray.length,
              direction: 'top-down',
            });
          }
        }}
      >
        {isGeneratingSuccess ? 'Roll again?' : 'Roll'}
      </button>
    );
  };

  return (
    <>
      <div className="flex flex-col my-4 mx-[500px]">
        <div className="flex flex-row justify-between">
          <p className="flex mx-auto font-bold text-2xl my-2 bg-white p-2 rounded-lg border-2 border-black">
            Character
          </p>
          <p className="flex mx-auto font-bold text-2xl my-2 bg-white p-2 rounded-lg border-2 border-black">
            Plot
          </p>
          <p className="flex mx-auto font-bold text-2xl my-2 bg-white p-2 rounded-lg border-2 border-black">
            Twist
          </p>
        </div>
        <div className="flex flex-row border-2 border-black bg-white justify-between">
          <div
            onClick={() => setIsCharLocked((bool) => !bool)}
            className={cn({
              'text-5xl h-50 flex flex-col items-center border-2 border-transparent p-10 mx-auto':
                true,
              'border-red-500': isCharLocked,
            })}
          >
            <SlotCounter
              ref={charRef}
              key={'characterSlots'}
              value={[<>{charValue}</>]}
              dummyCharacters={charListArray}
              dummyCharacterCount={charListArray.length}
              duration={2}
              className="text-3xl scale-150"
            />
          </div>
          <div
            onClick={() => setIsStoryLocked((bool) => !bool)}
            className={cn({
              'text-5xl h-50 flex flex-col items-center border-2 border-transparent p-10 mx-auto':
                true,
              'border-red-500': isStoryLocked,
            })}
          >
            <SlotCounter
              ref={storyRef}
              key={'storySlots'}
              value={[<>{storyValue}</>]}
              dummyCharacters={storyListArray}
              dummyCharacterCount={storyListArray.length}
              duration={2}
            />
          </div>
          <div
            onClick={() => setIsTwistLocked((bool) => !bool)}
            className={cn({
              'text-5xl h-50 flex flex-col items-center border-2 border-transparent p-10 mx-auto':
                true,
              'border-red-500': isTwistLocked,
            })}
          >
            <SlotCounter
              ref={twistRef}
              key={'twistSlots'}
              value={[<>{twistValue}</>]}
              dummyCharacters={storyListArray}
              dummyCharacterCount={storyListArray.length}
              duration={2}
            />
          </div>
        </div>
      </div>
      <RollButton />
      <div className="w-full flex mx-auto">
        <Button onClick={() => onSubmit(prompt)}>
          {isGeneratingImage ? 'Generating' : 'Generate Image'}
        </Button>
      </div>
      <section className="flex flex-row justify-between mx-24">
        <div className="bg-white">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={'Generated image'}
              className="w-[500px] h-[500px]"
            />
          )}
        </div>
        <div className="bg-white h-80 w-[800px] rounded-xl border-2 border-black shadow-lg text-sm my-auto flex">
          {twistList[twistRef]} {charactersList[charRef]}
        </div>
      </section>
    </>
  );
}
