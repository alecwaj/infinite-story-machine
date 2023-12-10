'use client';
import React, { useRef } from 'react';
import SlotCounter, { SlotCounterRef } from 'react-slot-counter';
import { getRandomValueFromArray } from '../../util';
import { cn } from '@/lib/utils';
import { GenerateButton } from './GenerateButton';

const charactersList = [
  'Sherlock Holmes',
  'Dr. John Watson',
  'Dracula',
  "Frankenstein's Monster",
  'The Invisible Man',
  'Robin Hood',
  'King Arthur',
  'The Three Musketeers',
  'Alice (from Alice in Wonderland)',
  'Dorothy Gale (from The Wizard of Oz)',
  'Scarecrow (from The Wizard of Oz)',
  'Tin Woodman (from The Wizard of Oz)',
  'Cowardly Lion (from The Wizard of Oz)',
  'Peter Pan',
  'Captain Hook',
  'Moby Dick',
  'Tom Sawyer',
  'Huckleberry Finn',
  'Ebenezer Scrooge',
  'Hamlet',
];
const storyList = [
  'Pride and Prejudice by Jane Austen',
  'Moby Dick by Herman Melville',
  'A Tale of Two Cities by Charles Dickens',
  'Dracula by Bram Stoker',
  'Frankenstein by Mary Shelley',
  'The Adventures of Sherlock Holmes by Arthur Conan Doyle',
  "Alice's Adventures in Wonderland by Lewis Carroll",
  'The Great Gatsby by F. Scott Fitzgerald',
  'The Picture of Dorian Gray by Oscar Wilde',
  'Wuthering Heights by Emily Brontë',
  'The Adventures of Huckleberry Finn by Mark Twain',
  'Jane Eyre by Charlotte Brontë',
  'War and Peace by Leo Tolstoy',
  'The Call of the Wild by Jack London',
  'The Wonderful Wizard of Oz by L. Frank Baum',
  'Crime and Punishment by Fyodor Dostoevsky',
  'The Brothers Karamazov by Fyodor Dostoevsky',
  'Heart of Darkness by Joseph Conrad',
  "Gulliver's Travels by Jonathan Swift",
  'Don Quixote by Miguel de Cervantes',
];
const twistList = [
  'twist 1',
  'twist 2',
  'twist 3',
  'twist 4',
  'twist 5',
  'twist 6',
  'twist 7',
];

export default function Slots() {
  const charRef = useRef<SlotCounterRef>(null);
  const storyRef = useRef<SlotCounterRef>(null);
  const twistRef = useRef<SlotCounterRef>(null);

  const [isCharLocked, setIsCharLocked] = React.useState<boolean>(false);
  const [isStoryLocked, setIsStoryLocked] = React.useState<boolean>(false);
  const [isTwistLocked, setIsTwistLocked] = React.useState<boolean>(false);
  const [charValue, setCharValue] = React.useState<string[]>(
    getRandomValueFromArray(charactersList)
  );
  const [storyValue, setStoryValue] = React.useState<string[]>(
    getRandomValueFromArray(charactersList)
  );
  const [twistValue, setTwistValue] = React.useState<string[]>(
    getRandomValueFromArray(charactersList)
  );

  const prompt = `${charValue} ${storyValue} ${twistValue}`;

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl text-red-600">Slots</h1>
        <button
          onClick={() => {
            if (!isCharLocked) {
              setCharValue(getRandomValueFromArray(charactersList));
              charRef.current?.startAnimation({
                duration: 2,
                dummyCharacterCount: 10,
                direction: 'top-down',
              });
            }
            if (!isStoryLocked) {
              setStoryValue(getRandomValueFromArray(storyList));
              storyRef.current?.startAnimation({
                duration: 3,
                dummyCharacterCount: 10,
                direction: 'top-down',
              });
            }
            if (!isTwistLocked) {
              setTwistValue(getRandomValueFromArray(twistList));
              twistRef.current?.startAnimation({
                duration: 4,
                dummyCharacterCount: 20,
                direction: 'top-down',
              });
            }
          }}
        >
          Generate
        </button>
        <div className="flex flex-row gap-10">
          <div
            className={cn({
              'text-2xl h-50 flex flex-col items-center border-2 border-transparent p-10':
                true,
              'border-red-500': isCharLocked,
            })}
          >
            <button
              onClick={() => setIsCharLocked((bool) => !bool)}
              className="text-xs"
            >
              {isCharLocked ? '🔒 Locked' : 'Lock Selection'}
            </button>
            <SlotCounter
              ref={charRef}
              key={'characterSlots'}
              value={[<>{charValue}</>]}
              dummyCharacters={charactersList}
              dummyCharacterCount={20}
              duration={2}
            />
          </div>
          <div
            className={cn({
              'text-2xl h-50 flex flex-col items-center border-2 border-transparent p-10':
                true,
              'border-red-500': isStoryLocked,
            })}
          >
            <button
              onClick={() => setIsStoryLocked((bool) => !bool)}
              className="text-xs"
            >
              {isStoryLocked ? '🔒 Locked' : 'Lock Selection'}
            </button>
            <SlotCounter
              ref={storyRef}
              key={'storySlots'}
              value={[<>{storyValue}</>]}
              dummyCharacters={storyList}
              dummyCharacterCount={20}
              duration={2}
            />
          </div>
          <div
            className={cn({
              'text-2xl h-50 flex flex-col items-center border-2 border-transparent p-10':
                true,
              'border-red-500': isTwistLocked,
            })}
          >
            <button
              onClick={() => setIsTwistLocked((bool) => !bool)}
              className="text-xs"
            >
              {isTwistLocked ? '🔒 Locked' : 'Lock Selection'}
            </button>
            <SlotCounter
              ref={twistRef}
              key={'twistSlots'}
              value={[<>{twistValue}</>]}
              dummyCharacters={twistList}
              dummyCharacterCount={20}
              duration={2}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex mx-auto">
        <GenerateButton prompt={prompt} />
      </div>
    </>
  );
}
