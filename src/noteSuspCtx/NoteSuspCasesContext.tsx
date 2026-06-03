import React, {createContext, useContext, useMemo, useState} from 'react';

export type NoteSuspVerdict = 'suspicious' | 'not_suspicious';

export type NoteSuspCase = {
  caseId: string; // e.g. "C1"
  caseNumber: number; // e.g. 1
  tag: string;
  title: string;
  mainQuestion: string;
  situationDescription: string;
  clues: string[];
  statements: {speaker: string; text: string}[];
  verdict: NoteSuspVerdict;
  realOutcome: string;
};

export type NoteSuspCaseProgress = {
  caseId: string;
  isSaved: boolean;
  isSolved: boolean;
  yourVerdict?: NoteSuspVerdict;
  yourNote?: string;
};

type NoteSuspCasesState = {
  cases: NoteSuspCase[];
  progressById: Record<string, NoteSuspCaseProgress>;
  toggleSaved: (caseId: string) => void;
  submitVerdict: (args: {
    caseId: string;
    yourVerdict: NoteSuspVerdict;
    note?: string;
  }) => void;
};

const noteSuspCasesContext =
  createContext<NoteSuspCasesState | null>(null);

function noteSuspBuildDefaultProgress(
  cases: NoteSuspCase[],
): Record<string, NoteSuspCaseProgress> {
  const progress: Record<string, NoteSuspCaseProgress> =
    {};
  for (const item of cases) {
    progress[item.caseId] = {
      caseId: item.caseId,
      isSaved: false,
      isSolved: false,
    };
  }
  return progress;
}

export function NoteSuspCasesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cases = useMemo<NoteSuspCase[]>(
    () => [
      {
        caseId: 'C1',
        caseNumber: 1,
        tag: 'Workplace Mystery',
        title: 'The Vanishing Office Donut',
        mainQuestion:
          'Was the missing donut stolen, or did someone make an honest mistake?',
        situationDescription:
          'A box of donuts was placed in the office kitchen at 9:00 AM for the whole team. By 9:20 AM, the last chocolate donut was gone. The strange part: it had a sticky note on it saying “Saved for Mia.” Three coworkers were seen near the kitchen before the donut disappeared, and each of them has a different explanation.',
        clues: [
          'The sticky note was found folded under the empty donut box.',
          'A chocolate smear was seen on the coffee machine handle.',
          'One coworker had powdered sugar on their sleeve, but the missing donut was chocolate.',
          'The security camera near the kitchen was “accidentally” blocked by a delivery cart.',
          'Mia says she never gave permission for anyone to take it.',
        ],
        statements: [
          {speaker: 'Leo', text: 'I only went in to make coffee. I didn’t even notice the donut box.'},
          {speaker: 'Nora', text: 'I took a plain donut earlier, not the chocolate one.'},
          {speaker: 'Ethan', text: 'I moved the delivery cart because it was blocking the hallway.'},
          {speaker: 'Mia', text: 'Everyone knew I saved that donut. The note was very clear.'},
        ],
        verdict: 'suspicious',
        realOutcome:
          'Ethan took the donut, then moved the cart to block the camera after realizing the note had Mia’s name on it. His mistake was the chocolate smear on the coffee machine handle, because he touched it right after eating the donut. The folded sticky note under the box also suggested someone tried to hide the evidence quickly.',
      },
      {
        caseId: 'C2',
        caseNumber: 2,
        tag: 'Strange Timing',
        title: 'The Perfectly Timed Text',
        mainQuestion:
          'Was the message a coincidence, or did someone know more than they admitted?',
        situationDescription:
          'A friend group was planning a surprise birthday dinner for Sam. Only four people knew the location. One hour before the event, Sam sent a message saying, “Should I dress fancy tonight, or is this casual?” Everyone panicked because nobody had told Sam about the dinner. One friend claimed it was just a lucky guess.',
        clues: [
          'Sam had not been invited to any visible event online.',
          'The restaurant reservation was made under a nickname, not Sam’s real name.',
          'One friend posted a vague story showing a table with candles.',
          'Sam’s message came five minutes after that story was posted.',
          'The story did not show the restaurant name.',
        ],
        statements: [
          {speaker: 'Ava', text: 'I posted the candle photo, but it could have been anywhere.'},
          {speaker: 'Mason', text: 'Sam always suspects surprises near his birthday.'},
          {speaker: 'Lily', text: 'I didn’t tell him anything. I only asked what color shirt he likes.'},
          {speaker: 'Sam', text: 'I just had a feeling something was happening.'},
        ],
        verdict: 'not_suspicious',
        realOutcome:
          'Sam guessed because of the timing and the vague candle photo, not because someone directly told him. The story gave just enough mood to make him suspicious, but no one revealed the actual plan. It was a smart guess, not a leak.',
      },
      {
        caseId: 'C3',
        caseNumber: 3,
        tag: 'School Case',
        title: 'The Backpack That Changed Seats',
        mainQuestion:
          'Did someone move the backpack on purpose?',
        situationDescription:
          'During a class break, Emma left her backpack beside her chair. When she returned, it was under a different desk across the room. Nothing was missing, but her notebook was slightly open. Two classmates said they did not touch it, while another claimed it was moved because someone almost tripped over it.',
        clues: [
          'The backpack zipper was still closed.',
          'The notebook inside was open to a page with test notes.',
          'The desk where the bag was found belonged to a student who had missed the previous lesson.',
          'A chair near Emma’s desk was pushed back awkwardly.',
          'No personal items were missing.',
        ],
        statements: [
          {speaker: 'Emma', text: 'I’m sure I left it beside my own chair.'},
          {speaker: 'Ryan', text: 'I moved it because it was in the way.'},
          {speaker: 'Olivia', text: 'I saw someone near the bag, but I didn’t pay attention.'},
          {speaker: 'Noah', text: 'I didn’t need her notes. I already studied.'},
        ],
        verdict: 'suspicious',
        realOutcome:
          'Ryan moved the backpack after noticing the notebook inside. He did not steal anything, but he opened the bag slightly to check the test notes. The biggest clue was that the notebook was open to exactly the useful page, even though the zipper was later closed again.',
      },
      {
        caseId: 'C4',
        caseNumber: 4,
        tag: 'Neighborhood Oddity',
        title: 'The Neighbor’s Fake Vacation',
        mainQuestion:
          'Was the neighbor actually away, or pretending to be?',
        situationDescription:
          'A neighbor told everyone he was leaving for a week-long vacation. However, lights were seen turning on and off in his apartment every evening. His curtains moved several times, and someone collected a food delivery from his door. When asked later, he said he had installed smart lights and the delivery was for a friend.',
        clues: [
          'The same hallway camera showed someone entering with a cap and hoodie.',
          'The person used the neighbor’s exact key code.',
          'The food delivery was ordered under the neighbor’s first name.',
          'His social media showed beach photos, but all were posted without live location.',
          'The apartment lights followed a normal evening routine.',
        ],
        statements: [
          {speaker: 'Neighbor', text: 'I was away. The lights are automatic.'},
          {speaker: 'Delivery Worker', text: 'Someone opened the door and took the food.'},
          {speaker: 'Building Manager', text: 'Only the resident should know that key code.'},
          {speaker: 'Friend', text: 'He asked me to check on the apartment once.'},
        ],
        verdict: 'suspicious',
        realOutcome:
          'The neighbor was not on vacation. He stayed home quietly because he wanted to avoid visitors and social plans. The beach photos were old. The key clue was the food delivery under his own name and the regular light routine, which did not match a simple automatic timer.',
      },
      {
        caseId: 'C5',
        caseNumber: 5,
        tag: 'Social Suspicion',
        title: 'The Broken Phone Excuse',
        mainQuestion:
          'Was the phone really broken, or was it an excuse?',
        situationDescription:
          'During a group project, Daniel stopped replying to messages for two days. He later said his phone had broken and he could not access the chat. But during those same two days, someone noticed that he had liked several posts online. Daniel said he used his tablet, but forgot to check the project group.',
        clues: [
          'Daniel liked six posts during the time he claimed he was unreachable.',
          'He did not reply to direct messages either.',
          'The project deadline was close.',
          'He uploaded a short video during the same period.',
          'He returned to the group chat only after the hardest part of the work was finished.',
        ],
        statements: [
          {speaker: 'Daniel', text: 'My phone was broken, but I used my tablet for a few minutes.'},
          {speaker: 'Sophie', text: 'He ignored the group until the work was basically done.'},
          {speaker: 'Max', text: 'Maybe he just didn’t get notifications.'},
          {speaker: 'Lena', text: 'He always replies fast when it is something fun.'},
        ],
        verdict: 'suspicious',
        realOutcome:
          'Daniel was avoiding the project. His phone may have had issues, but he clearly had internet access and enough time to use social media. The excuse was partly true but used to avoid responsibility.',
      },
      {
        caseId: 'C6',
        caseNumber: 6,
        tag: 'Money Mystery',
        title: 'The Overexplained Receipt',
        mainQuestion:
          'Was the strange receipt explanation believable?',
        situationDescription:
          'A group of friends split the bill after dinner. Later, one person noticed that the receipt total did not match the amount everyone had paid. Chris, who handled the payment, explained that the difference came from service fees, taxes, and a “rounding issue.” But the receipt already included taxes and service.',
        clues: [
          'The receipt total was $86.',
          'Five friends each paid $20, making the collected total $100.',
          'Chris said the extra $14 covered “hidden fees.”',
          'The receipt clearly showed “service included.”',
          'Chris avoided showing the payment confirmation screen.',
        ],
        statements: [
          {speaker: 'Chris', text: 'I just rounded it so nobody had to calculate.'},
          {speaker: 'Maya', text: 'Rounding is fine, but $14 extra is too much.'},
          {speaker: 'Ben', text: 'Maybe he planned to leave a bigger tip.'},
          {speaker: 'Ella', text: 'He changed the subject when I asked for the receipt.'},
        ],
        verdict: 'suspicious',
        realOutcome:
          'Chris intentionally overcollected money and hoped nobody would check. There were no hidden fees. The strongest clue was that the receipt already included service, yet he still used service as part of his explanation.',
      },
      {
        caseId: 'C7',
        caseNumber: 7,
        tag: 'Home Oddity',
        title: 'The Cat Camera Mystery',
        mainQuestion:
          'Did the cat cause the mess, or was someone else involved?',
        situationDescription:
          'A family returned home and found a plant knocked over, a drawer open, and snacks missing from the kitchen. The younger brother blamed the cat. However, the cat camera showed the cat sleeping for most of the afternoon. The younger brother said the camera “probably missed the important moment.”',
        clues: [
          'The cat was recorded sleeping on the couch for 47 minutes.',
          'The snack cabinet was too high for the cat to reach.',
          'The drawer contained console controller batteries.',
          'The younger brother had been asking to use the console earlier.',
          'Soil from the plant was found near the gaming chair.',
        ],
        statements: [
          {speaker: 'Younger Brother', text: 'The cat is sneaky. It could still be her.'},
          {speaker: 'Older Sister', text: 'The cat can’t open the snack cabinet.'},
          {speaker: 'Parent', text: 'Someone clearly searched for batteries.'},
          {speaker: 'Camera Footage', text: 'The cat did not enter the kitchen during the key time period.'},
        ],
        verdict: 'suspicious',
        realOutcome:
          'The younger brother caused the mess while searching for batteries and snacks. He knocked over the plant on the way to the gaming chair, then blamed the cat because the mess looked chaotic enough to seem believable.',
      },
      {
        caseId: 'C8',
        caseNumber: 8,
        tag: 'Academic Suspicion',
        title: 'The Too-Helpful Classmate',
        mainQuestion:
          'Was the classmate being kind, or trying to hide something?',
        situationDescription:
          'Before a quiz, a classmate named Grace suddenly offered to help everyone study. She gave out a “summary sheet” with only five topics, saying she was sure the quiz would focus on them. The next day, the quiz covered exactly those five topics. Grace said she simply guessed well.',
        clues: [
          'The summary sheet matched the quiz topics almost perfectly.',
          'Grace had stayed after class the previous day.',
          'The teacher’s desk had printed quiz papers on it.',
          'Grace usually did not organize study help.',
          'She looked nervous when someone joked that she had “inside information.”',
        ],
        statements: [
          {speaker: 'Grace', text: 'I just studied the most important parts.'},
          {speaker: 'Teacher', text: 'The quiz papers were on my desk, but covered.'},
          {speaker: 'Classmate', text: 'She never makes study sheets.'},
          {speaker: 'Another Student', text: 'Maybe she just understood the lesson better than us.'},
        ],
        verdict: 'suspicious',
        realOutcome:
          'Grace accidentally saw part of the quiz sheet while staying after class. She did not steal the quiz, but she used what she saw to create the summary. Her help was useful, but not completely honest.',
      },
      {
        caseId: 'C9',
        caseNumber: 9,
        tag: 'Public Place Mystery',
        title: 'The Elevator Button Trick',
        mainQuestion:
          'Was someone pulling a prank in the elevator?',
        situationDescription:
          'In an apartment building, residents noticed that the elevator kept stopping on the seventh floor even when nobody was there. Some thought the elevator was broken. Others suspected someone kept pressing the button and leaving. A resident on the seventh floor insisted they had nothing to do with it.',
        clues: [
          'The issue happened mostly between 6:00 PM and 7:00 PM.',
          'A child’s scooter was often parked near the seventh-floor elevator.',
          'The button panel had small sticky fingerprints.',
          'The elevator worked normally in the morning.',
          'One resident heard giggling near the stairs.',
        ],
        statements: [
          {speaker: 'Seventh-Floor Resident', text: 'I’m tired of the elevator stopping here too.'},
          {speaker: 'Building Manager', text: 'The system shows the button was pressed manually.'},
          {speaker: 'Parent', text: 'My kid waits near the elevator after school.'},
          {speaker: 'Neighbor', text: 'I heard someone run away after the doors opened.'},
        ],
        verdict: 'suspicious',
        realOutcome:
          'A child was pressing the button as a prank and running down the stairs before the elevator arrived. The elevator was not broken. The pattern, fingerprints, and timing all pointed to lighthearted mischief rather than a technical issue.',
      },
      {
        caseId: 'C10',
        caseNumber: 10,
        tag: 'Friendship Case',
        title: 'The Quiet Group Chat',
        mainQuestion:
          'Did the group ignore one friend on purpose?',
        situationDescription:
          'A friend sent a message asking if anyone wanted to meet on Saturday. Nobody replied for six hours. Later, the same friends posted a photo together from a café. They claimed the meeting was spontaneous and that nobody saw the message until later.',
        clues: [
          'The message was marked as seen by three people.',
          'The café photo was posted four hours after the message.',
          'One friend reacted to a meme in the same group chat during the silence.',
          'The group said it was “not planned,” but they were all at the same café.',
          'The friend who asked to meet was not invited.',
        ],
        statements: [
          {speaker: 'Alex', text: 'I thought someone else replied.'},
          {speaker: 'Jade', text: 'The café thing just happened out of nowhere.'},
          {speaker: 'Milo', text: 'I didn’t see the message, I only saw the meme.'},
          {speaker: 'Friend Who Asked', text: 'It felt like everyone avoided answering me.'},
        ],
        verdict: 'suspicious',
        realOutcome:
          'The group intentionally avoided replying because they had already planned a smaller meetup. They did not want to directly exclude the friend, so they stayed silent. The biggest clue was that the chat was active for other messages while the invitation was ignored.',
      },
      {
        caseId: 'C11',
        caseNumber: 11,
        tag: 'Delivery Mystery',
        title: 'The Mysterious Package',
        mainQuestion:
          'Was the package delivered to the wrong person, or did someone take it?',
        situationDescription:
          'A package was marked as delivered at 2:14 PM, but the recipient could not find it near the door. The delivery photo showed the correct hallway, but the package was not visible when the recipient checked ten minutes later. A neighbor said they saw “someone picking something up,” but they were not sure who it was.',
        clues: [
          'The delivery photo showed the package beside the correct door.',
          'The building entrance was locked.',
          'Only residents could access the hallway.',
          'A neighbor across the hall received a package the same day.',
          'The missing package had a bright yellow label.',
        ],
        statements: [
          {speaker: 'Recipient', text: 'I checked almost immediately, and it was gone.'},
          {speaker: 'Neighbor', text: 'I thought the person was picking up their own package.'},
          {speaker: 'Delivery Worker', text: 'I left it at the correct door.'},
          {speaker: 'Across-Hall Neighbor', text: 'I grabbed my package quickly and didn’t notice another one.'},
        ],
        verdict: 'suspicious',
        realOutcome:
          'The across-hall neighbor accidentally took the package along with their own because both were delivered close together. It was not intentional theft, but it was still suspicious until the package was returned. The bright yellow label helped identify it later.',
      },
      {
        caseId: 'C12',
        caseNumber: 12,
        tag: 'Memory Excuse',
        title: 'The Fake “I Forgot” Moment',
        mainQuestion:
          'Did the person really forget, or pretend to forget?',
        situationDescription:
          'During a board night, one person forgot to mention a rule that would have stopped them from winning. After winning, they suddenly remembered the rule and laughed it off. Other guests felt the timing was too convenient.',
        clues: [
          'They had explained the same rule earlier in the evening.',
          'The forgotten rule directly affected their winning move.',
          'They hesitated before making the move.',
          'Another guest asked, “Is that allowed?” and they quickly said yes.',
          'They remembered the rule immediately after the outcome was confirmed.',
        ],
        statements: [
          {speaker: 'Guest', text: 'I honestly forgot in the moment.'},
          {speaker: 'Friend 1', text: 'You explained that rule twenty minutes ago.'},
          {speaker: 'Friend 2', text: 'The hesitation made it suspicious.'},
          {speaker: 'Friend 3', text: 'Maybe they were just focused on winning.'},
        ],
        verdict: 'suspicious',
        realOutcome:
          'They knew the rule but ignored it because it helped them succeed. They only admitted it after the result was secured. The hesitation and earlier explanation made the “forgot” excuse weak.',
      },
      {
        caseId: 'C13',
        caseNumber: 13,
        tag: 'Small Favor Mystery',
        title: 'The Borrowed Charger',
        mainQuestion:
          'Was the charger borrowed by accident, or quietly kept on purpose?',
        situationDescription:
          'At a study meetup, Oliver asked to borrow a phone charger for “just ten minutes.” At the end of the evening, the charger was missing. Oliver said he gave it back by placing it on the table, but nobody remembered seeing it there. The next day, another friend noticed a charger that looked exactly the same in Oliver’s backpack.',
        clues: [
          'The charger had a tiny blue sticker near the cable end.',
          'Oliver’s charger at home was supposedly broken.',
          'He left the meetup earlier than everyone else.',
          'The table was cleared by three people, and none of them saw the charger.',
          'The charger in Oliver’s backpack had a small blue sticker in the same place.',
        ],
        statements: [
          {speaker: 'Oliver', text: 'I put it back on the table before I left.'},
          {speaker: 'Mia', text: 'I cleaned the table. There was no charger there.'},
          {speaker: 'Leo', text: 'He did mention his own charger stopped working.'},
          {speaker: 'Sasha', text: 'The sticker looked exactly like the one on the missing charger.'},
        ],
        verdict: 'suspicious',
        realOutcome:
          'Oliver kept the charger and hoped nobody would notice. He probably planned to return it later, but his claim that he left it on the table was false. The blue sticker and his broken charger gave away the truth.',
      },
      {
        caseId: 'C14',
        caseNumber: 14,
        tag: 'Dinner Confusion',
        title: 'The Restaurant Reservation Mix-Up',
        mainQuestion:
          'Was the reservation mistake real, or did someone change the plan?',
        situationDescription:
          'A group planned dinner at a casual burger place. When they arrived, one friend, Chloe, said the reservation had somehow been moved to an expensive rooftop restaurant nearby. She claimed the booking app must have glitched. Strangely, she was dressed much more formally than everyone else and already knew the rooftop restaurant’s menu.',
        clues: [
          'The original chat clearly mentioned the burger place.',
          'Chloe had sent a screenshot of the rooftop restaurant earlier, saying it “looked cute someday.”',
          'She arrived wearing formal clothes.',
          'The rooftop restaurant had a reservation under Chloe’s name.',
          'The burger place said no reservation had ever been made for that group.',
        ],
        statements: [
          {speaker: 'Chloe', text: 'The app must have switched the place somehow.'},
          {speaker: 'Ryan', text: 'Apps do not usually create rooftop reservations by themselves.'},
          {speaker: 'Ella', text: 'She was the only one dressed for that place.'},
          {speaker: 'Restaurant Host', text: 'The reservation was made yesterday afternoon.'},
        ],
        verdict: 'suspicious',
        realOutcome:
          'Chloe intentionally booked the rooftop restaurant and pretended it was a mistake because she wanted a fancier dinner. The strongest clue was that the burger place never had a reservation at all, while the rooftop booking was made under her name.',
      },
      {
        caseId: 'C15',
        caseNumber: 15,
        tag: 'Online Meeting Case',
        title: 'The Muted Microphone Excuse',
        mainQuestion:
          'Was the microphone issue real, or was someone avoiding a question?',
        situationDescription:
          'During an online team meeting, Ava was asked to explain her part of the project. Her microphone suddenly “stopped working.” She typed that she could not speak, but minutes later, when the topic changed to weekend plans, her microphone worked perfectly. She said she restarted the audio settings.',
        clues: [
          'The microphone stopped working exactly when Ava was asked about unfinished work.',
          'She replied quickly in chat, so she was still present.',
          'She had not uploaded her project section yet.',
          'Her microphone worked again without anyone seeing her leave the call.',
          'She joined the weekend conversation immediately.',
        ],
        statements: [
          {speaker: 'Ava', text: 'My audio just suddenly failed.'},
          {speaker: 'Team Lead', text: 'It was strange timing, but technical issues happen.'},
          {speaker: 'Nora', text: 'She had nothing prepared and avoided answering.'},
          {speaker: 'Ben', text: 'Maybe she fixed it while we moved on.'},
        ],
        verdict: 'suspicious',
        realOutcome:
          'Ava muted herself and pretended the microphone failed to avoid explaining unfinished work. The timing was too convenient, and the microphone “recovered” only after the difficult question was no longer being discussed.',
      },
      {
        caseId: 'C16',
        caseNumber: 16,
        tag: 'Locker Room Mystery',
        title: 'The Gym Locker Note',
        mainQuestion:
          'Was the note a prank, or a real warning?',
        situationDescription:
          'At a gym, someone found a note taped to a locker that said, “Stop using what is not yours.” The locker owner was confused and claimed they had never taken anything. Later, another gym member said their towel and water bottle had gone missing several times from the same area.',
        clues: [
          'The note was written with block letters, probably to hide handwriting.',
          'The locker owner used the same corner area every day.',
          'The missing towel was once seen hanging near that locker.',
          'Several people used identical black water bottles.',
          'The locker owner had accidentally taken the wrong bottle before.',
        ],
        statements: [
          {speaker: 'Locker Owner', text: 'I never stole anything. I may have grabbed the wrong bottle once.'},
          {speaker: 'Gym Member', text: 'My towel disappeared more than once.'},
          {speaker: 'Trainer', text: 'People mix up items here all the time.'},
          {speaker: 'Receptionist', text: 'No formal complaint was filed.'},
        ],
        verdict: 'not_suspicious',
        realOutcome:
          'The situation was mostly a misunderstanding. The locker owner had once taken the wrong bottle by accident, and someone assumed they were stealing. The note was dramatic, but there was no strong evidence of intentional theft. The repeated missing items were likely caused by several people mixing up similar belongings.',
      },
      {
        caseId: 'C17',
        caseNumber: 17,
        tag: 'Friend Group Mystery',
        title: 'The Birthday Gift Secret',
        mainQuestion:
          'Was the hidden purchase a surprise, or something suspicious?',
        situationDescription:
          'Before a friend’s birthday, Jamie noticed that two friends were whispering, closing laptop tabs, and avoiding questions about a recent purchase. Jamie became suspicious because the same friends had recently complained about money. When asked directly, they said it was “nothing important.”',
        clues: [
          'The friends quickly closed a shopping page when Jamie entered.',
          'A delivery notification appeared on one friend’s phone.',
          'They had asked Jamie’s favorite color the week before.',
          'They avoided talking about money after the purchase.',
          'The package was hidden in a closet.',
        ],
        statements: [
          {speaker: 'Jamie', text: 'They were acting too secretive.'},
          {speaker: 'Friend 1', text: 'We could not tell you because it would ruin everything.'},
          {speaker: 'Friend 2', text: 'It was not suspicious, just badly hidden.'},
          {speaker: 'Roommate', text: 'I saw gift wrapping paper near the closet.'},
        ],
        verdict: 'not_suspicious',
        realOutcome:
          'The hidden purchase was a birthday gift for Jamie. The secrecy looked suspicious because the friends were terrible at hiding it, but there was no negative intent. The favorite color question and gift wrapping paper were the key clues.',
      },
    ],
    [],
  );

  const [progressById, setProgressById] =
    useState<Record<string, NoteSuspCaseProgress>>(() =>
      noteSuspBuildDefaultProgress(cases),
    );

  const toggleSaved = (caseId: string) => {
    setProgressById(prev => {
      const current = prev[caseId];
      if (!current) {
        return prev;
      }
      return {
        ...prev,
        [caseId]: {
          ...current,
          isSaved: !current.isSaved,
        },
      };
    });
  };

  const submitVerdict: NoteSuspCasesState['submitVerdict'] =
    ({caseId, yourVerdict, note}) => {
      setProgressById(prev => {
        const current = prev[caseId];
        if (!current) {
          return prev;
        }
        return {
          ...prev,
          [caseId]: {
            ...current,
            isSolved: true,
            yourVerdict: yourVerdict,
            yourNote: note ?? '',
          },
        };
      });
    };

  const value = useMemo<NoteSuspCasesState>(
    () => ({
      cases,
      progressById,
      toggleSaved,
      submitVerdict,
    }),
    [cases, progressById],
  );

  return (
    <noteSuspCasesContext.Provider value={value}>
      {children}
    </noteSuspCasesContext.Provider>
  );
}

export function useNoteSuspCases() {
  const ctx = useContext(noteSuspCasesContext);
  if (!ctx) {
    throw new Error(
      'useNoteSuspCases must be used inside NoteSuspCasesProvider',
    );
  }
  return ctx;
}

