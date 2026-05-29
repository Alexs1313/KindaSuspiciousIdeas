import React, {createContext, useContext, useMemo, useState} from 'react';

export type SuspiciouskinddaIdeasVerdict = 'suspicious' | 'not_suspicious';

export type SuspiciouskinddaIdeasCase = {
  suspiciouskinddaCaseId: string; // e.g. "C1"
  suspiciouskinddaCaseNumber: number; // e.g. 1
  suspiciouskinddaCaseTag: string;
  suspiciouskinddaCaseTitle: string;
  suspiciouskinddaCaseMainQuestion: string;
  suspiciouskinddaCaseSituationDescription: string;
  suspiciouskinddaCaseClues: string[];
  suspiciouskinddaCaseStatements: {suspiciouskinddaSpeaker: string; suspiciouskinddaText: string}[];
  suspiciouskinddaCaseVerdict: SuspiciouskinddaIdeasVerdict;
  suspiciouskinddaCaseRealOutcome: string;
};

export type SuspiciouskinddaIdeasCaseProgress = {
  suspiciouskinddaCaseId: string;
  suspiciouskinddaCaseIsSaved: boolean;
  suspiciouskinddaCaseIsSolved: boolean;
  suspiciouskinddaCaseYourVerdict?: SuspiciouskinddaIdeasVerdict;
  suspiciouskinddaCaseYourNote?: string;
};

type SuspiciouskinddaIdeasCasesState = {
  suspiciouskinddaCases: SuspiciouskinddaIdeasCase[];
  suspiciouskinddaProgressById: Record<string, SuspiciouskinddaIdeasCaseProgress>;
  suspiciouskinddaToggleSaved: (suspiciouskinddaCaseId: string) => void;
  suspiciouskinddaSubmitVerdict: (args: {
    suspiciouskinddaCaseId: string;
    suspiciouskinddaYourVerdict: SuspiciouskinddaIdeasVerdict;
    suspiciouskinddaNote?: string;
  }) => void;
};

const SuspiciouskinddaIdeasCasesContext =
  createContext<SuspiciouskinddaIdeasCasesState | null>(null);

function suspiciouskinddaBuildDefaultProgress(
  suspiciouskinddaCases: SuspiciouskinddaIdeasCase[],
): Record<string, SuspiciouskinddaIdeasCaseProgress> {
  const suspiciouskinddaProgress: Record<string, SuspiciouskinddaIdeasCaseProgress> =
    {};
  for (const suspiciouskinddaItem of suspiciouskinddaCases) {
    suspiciouskinddaProgress[suspiciouskinddaItem.suspiciouskinddaCaseId] = {
      suspiciouskinddaCaseId: suspiciouskinddaItem.suspiciouskinddaCaseId,
      suspiciouskinddaCaseIsSaved: false,
      suspiciouskinddaCaseIsSolved: false,
    };
  }
  return suspiciouskinddaProgress;
}

export function SuspiciouskinddaIdeasCasesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const suspiciouskinddaCases = useMemo<SuspiciouskinddaIdeasCase[]>(
    () => [
      {
        suspiciouskinddaCaseId: 'C1',
        suspiciouskinddaCaseNumber: 1,
        suspiciouskinddaCaseTag: 'Workplace Mystery',
        suspiciouskinddaCaseTitle: 'The Vanishing Office Donut',
        suspiciouskinddaCaseMainQuestion:
          'Was the missing donut stolen, or did someone make an honest mistake?',
        suspiciouskinddaCaseSituationDescription:
          'A box of donuts was placed in the office kitchen at 9:00 AM for the whole team. By 9:20 AM, the last chocolate donut was gone. The strange part: it had a sticky note on it saying “Saved for Mia.” Three coworkers were seen near the kitchen before the donut disappeared, and each of them has a different explanation.',
        suspiciouskinddaCaseClues: [
          'The sticky note was found folded under the empty donut box.',
          'A chocolate smear was seen on the coffee machine handle.',
          'One coworker had powdered sugar on their sleeve, but the missing donut was chocolate.',
          'The security camera near the kitchen was “accidentally” blocked by a delivery cart.',
          'Mia says she never gave permission for anyone to take it.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Leo', suspiciouskinddaText: 'I only went in to make coffee. I didn’t even notice the donut box.'},
          {suspiciouskinddaSpeaker: 'Nora', suspiciouskinddaText: 'I took a plain donut earlier, not the chocolate one.'},
          {suspiciouskinddaSpeaker: 'Ethan', suspiciouskinddaText: 'I moved the delivery cart because it was blocking the hallway.'},
          {suspiciouskinddaSpeaker: 'Mia', suspiciouskinddaText: 'Everyone knew I saved that donut. The note was very clear.'},
        ],
        suspiciouskinddaCaseVerdict: 'suspicious',
        suspiciouskinddaCaseRealOutcome:
          'Ethan took the donut, then moved the cart to block the camera after realizing the note had Mia’s name on it. His mistake was the chocolate smear on the coffee machine handle, because he touched it right after eating the donut. The folded sticky note under the box also suggested someone tried to hide the evidence quickly.',
      },
      {
        suspiciouskinddaCaseId: 'C2',
        suspiciouskinddaCaseNumber: 2,
        suspiciouskinddaCaseTag: 'Strange Timing',
        suspiciouskinddaCaseTitle: 'The Perfectly Timed Text',
        suspiciouskinddaCaseMainQuestion:
          'Was the message a coincidence, or did someone know more than they admitted?',
        suspiciouskinddaCaseSituationDescription:
          'A friend group was planning a surprise birthday dinner for Sam. Only four people knew the location. One hour before the event, Sam sent a message saying, “Should I dress fancy tonight, or is this casual?” Everyone panicked because nobody had told Sam about the dinner. One friend claimed it was just a lucky guess.',
        suspiciouskinddaCaseClues: [
          'Sam had not been invited to any visible event online.',
          'The restaurant reservation was made under a nickname, not Sam’s real name.',
          'One friend posted a vague story showing a table with candles.',
          'Sam’s message came five minutes after that story was posted.',
          'The story did not show the restaurant name.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Ava', suspiciouskinddaText: 'I posted the candle photo, but it could have been anywhere.'},
          {suspiciouskinddaSpeaker: 'Mason', suspiciouskinddaText: 'Sam always suspects surprises near his birthday.'},
          {suspiciouskinddaSpeaker: 'Lily', suspiciouskinddaText: 'I didn’t tell him anything. I only asked what color shirt he likes.'},
          {suspiciouskinddaSpeaker: 'Sam', suspiciouskinddaText: 'I just had a feeling something was happening.'},
        ],
        suspiciouskinddaCaseVerdict: 'not_suspicious',
        suspiciouskinddaCaseRealOutcome:
          'Sam guessed because of the timing and the vague candle photo, not because someone directly told him. The story gave just enough mood to make him suspicious, but no one revealed the actual plan. It was a smart guess, not a leak.',
      },
      {
        suspiciouskinddaCaseId: 'C3',
        suspiciouskinddaCaseNumber: 3,
        suspiciouskinddaCaseTag: 'School Case',
        suspiciouskinddaCaseTitle: 'The Backpack That Changed Seats',
        suspiciouskinddaCaseMainQuestion:
          'Did someone move the backpack on purpose?',
        suspiciouskinddaCaseSituationDescription:
          'During a class break, Emma left her backpack beside her chair. When she returned, it was under a different desk across the room. Nothing was missing, but her notebook was slightly open. Two classmates said they did not touch it, while another claimed it was moved because someone almost tripped over it.',
        suspiciouskinddaCaseClues: [
          'The backpack zipper was still closed.',
          'The notebook inside was open to a page with test notes.',
          'The desk where the bag was found belonged to a student who had missed the previous lesson.',
          'A chair near Emma’s desk was pushed back awkwardly.',
          'No personal items were missing.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Emma', suspiciouskinddaText: 'I’m sure I left it beside my own chair.'},
          {suspiciouskinddaSpeaker: 'Ryan', suspiciouskinddaText: 'I moved it because it was in the way.'},
          {suspiciouskinddaSpeaker: 'Olivia', suspiciouskinddaText: 'I saw someone near the bag, but I didn’t pay attention.'},
          {suspiciouskinddaSpeaker: 'Noah', suspiciouskinddaText: 'I didn’t need her notes. I already studied.'},
        ],
        suspiciouskinddaCaseVerdict: 'suspicious',
        suspiciouskinddaCaseRealOutcome:
          'Ryan moved the backpack after noticing the notebook inside. He did not steal anything, but he opened the bag slightly to check the test notes. The biggest clue was that the notebook was open to exactly the useful page, even though the zipper was later closed again.',
      },
      {
        suspiciouskinddaCaseId: 'C4',
        suspiciouskinddaCaseNumber: 4,
        suspiciouskinddaCaseTag: 'Neighborhood Oddity',
        suspiciouskinddaCaseTitle: 'The Neighbor’s Fake Vacation',
        suspiciouskinddaCaseMainQuestion:
          'Was the neighbor actually away, or pretending to be?',
        suspiciouskinddaCaseSituationDescription:
          'A neighbor told everyone he was leaving for a week-long vacation. However, lights were seen turning on and off in his apartment every evening. His curtains moved several times, and someone collected a food delivery from his door. When asked later, he said he had installed smart lights and the delivery was for a friend.',
        suspiciouskinddaCaseClues: [
          'The same hallway camera showed someone entering with a cap and hoodie.',
          'The person used the neighbor’s exact key code.',
          'The food delivery was ordered under the neighbor’s first name.',
          'His social media showed beach photos, but all were posted without live location.',
          'The apartment lights followed a normal evening routine.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Neighbor', suspiciouskinddaText: 'I was away. The lights are automatic.'},
          {suspiciouskinddaSpeaker: 'Delivery Worker', suspiciouskinddaText: 'Someone opened the door and took the food.'},
          {suspiciouskinddaSpeaker: 'Building Manager', suspiciouskinddaText: 'Only the resident should know that key code.'},
          {suspiciouskinddaSpeaker: 'Friend', suspiciouskinddaText: 'He asked me to check on the apartment once.'},
        ],
        suspiciouskinddaCaseVerdict: 'suspicious',
        suspiciouskinddaCaseRealOutcome:
          'The neighbor was not on vacation. He stayed home quietly because he wanted to avoid visitors and social plans. The beach photos were old. The key clue was the food delivery under his own name and the regular light routine, which did not match a simple automatic timer.',
      },
      {
        suspiciouskinddaCaseId: 'C5',
        suspiciouskinddaCaseNumber: 5,
        suspiciouskinddaCaseTag: 'Social Suspicion',
        suspiciouskinddaCaseTitle: 'The Broken Phone Excuse',
        suspiciouskinddaCaseMainQuestion:
          'Was the phone really broken, or was it an excuse?',
        suspiciouskinddaCaseSituationDescription:
          'During a group project, Daniel stopped replying to messages for two days. He later said his phone had broken and he could not access the chat. But during those same two days, someone noticed that he had liked several posts online. Daniel said he used his tablet, but forgot to check the project group.',
        suspiciouskinddaCaseClues: [
          'Daniel liked six posts during the time he claimed he was unreachable.',
          'He did not reply to direct messages either.',
          'The project deadline was close.',
          'He uploaded a short video during the same period.',
          'He returned to the group chat only after the hardest part of the work was finished.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Daniel', suspiciouskinddaText: 'My phone was broken, but I used my tablet for a few minutes.'},
          {suspiciouskinddaSpeaker: 'Sophie', suspiciouskinddaText: 'He ignored the group until the work was basically done.'},
          {suspiciouskinddaSpeaker: 'Max', suspiciouskinddaText: 'Maybe he just didn’t get notifications.'},
          {suspiciouskinddaSpeaker: 'Lena', suspiciouskinddaText: 'He always replies fast when it is something fun.'},
        ],
        suspiciouskinddaCaseVerdict: 'suspicious',
        suspiciouskinddaCaseRealOutcome:
          'Daniel was avoiding the project. His phone may have had issues, but he clearly had internet access and enough time to use social media. The excuse was partly true but used to avoid responsibility.',
      },
      {
        suspiciouskinddaCaseId: 'C6',
        suspiciouskinddaCaseNumber: 6,
        suspiciouskinddaCaseTag: 'Money Mystery',
        suspiciouskinddaCaseTitle: 'The Overexplained Receipt',
        suspiciouskinddaCaseMainQuestion:
          'Was the strange receipt explanation believable?',
        suspiciouskinddaCaseSituationDescription:
          'A group of friends split the bill after dinner. Later, one person noticed that the receipt total did not match the amount everyone had paid. Chris, who handled the payment, explained that the difference came from service fees, taxes, and a “rounding issue.” But the receipt already included taxes and service.',
        suspiciouskinddaCaseClues: [
          'The receipt total was $86.',
          'Five friends each paid $20, making the collected total $100.',
          'Chris said the extra $14 covered “hidden fees.”',
          'The receipt clearly showed “service included.”',
          'Chris avoided showing the payment confirmation screen.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Chris', suspiciouskinddaText: 'I just rounded it so nobody had to calculate.'},
          {suspiciouskinddaSpeaker: 'Maya', suspiciouskinddaText: 'Rounding is fine, but $14 extra is too much.'},
          {suspiciouskinddaSpeaker: 'Ben', suspiciouskinddaText: 'Maybe he planned to leave a bigger tip.'},
          {suspiciouskinddaSpeaker: 'Ella', suspiciouskinddaText: 'He changed the subject when I asked for the receipt.'},
        ],
        suspiciouskinddaCaseVerdict: 'suspicious',
        suspiciouskinddaCaseRealOutcome:
          'Chris intentionally overcollected money and hoped nobody would check. There were no hidden fees. The strongest clue was that the receipt already included service, yet he still used service as part of his explanation.',
      },
      {
        suspiciouskinddaCaseId: 'C7',
        suspiciouskinddaCaseNumber: 7,
        suspiciouskinddaCaseTag: 'Home Oddity',
        suspiciouskinddaCaseTitle: 'The Cat Camera Mystery',
        suspiciouskinddaCaseMainQuestion:
          'Did the cat cause the mess, or was someone else involved?',
        suspiciouskinddaCaseSituationDescription:
          'A family returned home and found a plant knocked over, a drawer open, and snacks missing from the kitchen. The younger brother blamed the cat. However, the cat camera showed the cat sleeping for most of the afternoon. The younger brother said the camera “probably missed the important moment.”',
        suspiciouskinddaCaseClues: [
          'The cat was recorded sleeping on the couch for 47 minutes.',
          'The snack cabinet was too high for the cat to reach.',
          'The drawer contained console controller batteries.',
          'The younger brother had been asking to use the console earlier.',
          'Soil from the plant was found near the gaming chair.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Younger Brother', suspiciouskinddaText: 'The cat is sneaky. It could still be her.'},
          {suspiciouskinddaSpeaker: 'Older Sister', suspiciouskinddaText: 'The cat can’t open the snack cabinet.'},
          {suspiciouskinddaSpeaker: 'Parent', suspiciouskinddaText: 'Someone clearly searched for batteries.'},
          {suspiciouskinddaSpeaker: 'Camera Footage', suspiciouskinddaText: 'The cat did not enter the kitchen during the key time period.'},
        ],
        suspiciouskinddaCaseVerdict: 'suspicious',
        suspiciouskinddaCaseRealOutcome:
          'The younger brother caused the mess while searching for batteries and snacks. He knocked over the plant on the way to the gaming chair, then blamed the cat because the mess looked chaotic enough to seem believable.',
      },
      {
        suspiciouskinddaCaseId: 'C8',
        suspiciouskinddaCaseNumber: 8,
        suspiciouskinddaCaseTag: 'Academic Suspicion',
        suspiciouskinddaCaseTitle: 'The Too-Helpful Classmate',
        suspiciouskinddaCaseMainQuestion:
          'Was the classmate being kind, or trying to hide something?',
        suspiciouskinddaCaseSituationDescription:
          'Before a quiz, a classmate named Grace suddenly offered to help everyone study. She gave out a “summary sheet” with only five topics, saying she was sure the quiz would focus on them. The next day, the quiz covered exactly those five topics. Grace said she simply guessed well.',
        suspiciouskinddaCaseClues: [
          'The summary sheet matched the quiz topics almost perfectly.',
          'Grace had stayed after class the previous day.',
          'The teacher’s desk had printed quiz papers on it.',
          'Grace usually did not organize study help.',
          'She looked nervous when someone joked that she had “inside information.”',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Grace', suspiciouskinddaText: 'I just studied the most important parts.'},
          {suspiciouskinddaSpeaker: 'Teacher', suspiciouskinddaText: 'The quiz papers were on my desk, but covered.'},
          {suspiciouskinddaSpeaker: 'Classmate', suspiciouskinddaText: 'She never makes study sheets.'},
          {suspiciouskinddaSpeaker: 'Another Student', suspiciouskinddaText: 'Maybe she just understood the lesson better than us.'},
        ],
        suspiciouskinddaCaseVerdict: 'suspicious',
        suspiciouskinddaCaseRealOutcome:
          'Grace accidentally saw part of the quiz sheet while staying after class. She did not steal the quiz, but she used what she saw to create the summary. Her help was useful, but not completely honest.',
      },
      {
        suspiciouskinddaCaseId: 'C9',
        suspiciouskinddaCaseNumber: 9,
        suspiciouskinddaCaseTag: 'Public Place Mystery',
        suspiciouskinddaCaseTitle: 'The Elevator Button Trick',
        suspiciouskinddaCaseMainQuestion:
          'Was someone pulling a prank in the elevator?',
        suspiciouskinddaCaseSituationDescription:
          'In an apartment building, residents noticed that the elevator kept stopping on the seventh floor even when nobody was there. Some thought the elevator was broken. Others suspected someone kept pressing the button and leaving. A resident on the seventh floor insisted they had nothing to do with it.',
        suspiciouskinddaCaseClues: [
          'The issue happened mostly between 6:00 PM and 7:00 PM.',
          'A child’s scooter was often parked near the seventh-floor elevator.',
          'The button panel had small sticky fingerprints.',
          'The elevator worked normally in the morning.',
          'One resident heard giggling near the stairs.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Seventh-Floor Resident', suspiciouskinddaText: 'I’m tired of the elevator stopping here too.'},
          {suspiciouskinddaSpeaker: 'Building Manager', suspiciouskinddaText: 'The system shows the button was pressed manually.'},
          {suspiciouskinddaSpeaker: 'Parent', suspiciouskinddaText: 'My kid waits near the elevator after school.'},
          {suspiciouskinddaSpeaker: 'Neighbor', suspiciouskinddaText: 'I heard someone run away after the doors opened.'},
        ],
        suspiciouskinddaCaseVerdict: 'suspicious',
        suspiciouskinddaCaseRealOutcome:
          'A child was pressing the button as a prank and running down the stairs before the elevator arrived. The elevator was not broken. The pattern, fingerprints, and timing all pointed to playful mischief rather than a technical issue.',
      },
      {
        suspiciouskinddaCaseId: 'C10',
        suspiciouskinddaCaseNumber: 10,
        suspiciouskinddaCaseTag: 'Friendship Case',
        suspiciouskinddaCaseTitle: 'The Quiet Group Chat',
        suspiciouskinddaCaseMainQuestion:
          'Did the group ignore one friend on purpose?',
        suspiciouskinddaCaseSituationDescription:
          'A friend sent a message asking if anyone wanted to meet on Saturday. Nobody replied for six hours. Later, the same friends posted a photo together from a café. They claimed the meeting was spontaneous and that nobody saw the message until later.',
        suspiciouskinddaCaseClues: [
          'The message was marked as seen by three people.',
          'The café photo was posted four hours after the message.',
          'One friend reacted to a meme in the same group chat during the silence.',
          'The group said it was “not planned,” but they were all at the same café.',
          'The friend who asked to meet was not invited.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Alex', suspiciouskinddaText: 'I thought someone else replied.'},
          {suspiciouskinddaSpeaker: 'Jade', suspiciouskinddaText: 'The café thing just happened out of nowhere.'},
          {suspiciouskinddaSpeaker: 'Milo', suspiciouskinddaText: 'I didn’t see the message, I only saw the meme.'},
          {suspiciouskinddaSpeaker: 'Friend Who Asked', suspiciouskinddaText: 'It felt like everyone avoided answering me.'},
        ],
        suspiciouskinddaCaseVerdict: 'suspicious',
        suspiciouskinddaCaseRealOutcome:
          'The group intentionally avoided replying because they had already planned a smaller meetup. They did not want to directly exclude the friend, so they stayed silent. The biggest clue was that the chat was active for other messages while the invitation was ignored.',
      },
      {
        suspiciouskinddaCaseId: 'C11',
        suspiciouskinddaCaseNumber: 11,
        suspiciouskinddaCaseTag: 'Delivery Mystery',
        suspiciouskinddaCaseTitle: 'The Mysterious Package',
        suspiciouskinddaCaseMainQuestion:
          'Was the package delivered to the wrong person, or did someone take it?',
        suspiciouskinddaCaseSituationDescription:
          'A package was marked as delivered at 2:14 PM, but the recipient could not find it near the door. The delivery photo showed the correct hallway, but the package was not visible when the recipient checked ten minutes later. A neighbor said they saw “someone picking something up,” but they were not sure who it was.',
        suspiciouskinddaCaseClues: [
          'The delivery photo showed the package beside the correct door.',
          'The building entrance was locked.',
          'Only residents could access the hallway.',
          'A neighbor across the hall received a package the same day.',
          'The missing package had a bright yellow label.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Recipient', suspiciouskinddaText: 'I checked almost immediately, and it was gone.'},
          {suspiciouskinddaSpeaker: 'Neighbor', suspiciouskinddaText: 'I thought the person was picking up their own package.'},
          {suspiciouskinddaSpeaker: 'Delivery Worker', suspiciouskinddaText: 'I left it at the correct door.'},
          {suspiciouskinddaSpeaker: 'Across-Hall Neighbor', suspiciouskinddaText: 'I grabbed my package quickly and didn’t notice another one.'},
        ],
        suspiciouskinddaCaseVerdict: 'suspicious',
        suspiciouskinddaCaseRealOutcome:
          'The across-hall neighbor accidentally took the package along with their own because both were delivered close together. It was not intentional theft, but it was still suspicious until the package was returned. The bright yellow label helped identify it later.',
      },
      {
        suspiciouskinddaCaseId: 'C12',
        suspiciouskinddaCaseNumber: 12,
        suspiciouskinddaCaseTag: 'Memory Excuse',
        suspiciouskinddaCaseTitle: 'The Fake “I Forgot” Moment',
        suspiciouskinddaCaseMainQuestion:
          'Did the person really forget, or pretend to forget?',
        suspiciouskinddaCaseSituationDescription:
          'During a board night, one person forgot to mention a rule that would have stopped them from winning. After winning, they suddenly remembered the rule and laughed it off. Other guests felt the timing was too convenient.',
        suspiciouskinddaCaseClues: [
          'They had explained the same rule earlier in the evening.',
          'The forgotten rule directly affected their winning move.',
          'They hesitated before making the move.',
          'Another guest asked, “Is that allowed?” and they quickly said yes.',
          'They remembered the rule immediately after the win was confirmed.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Guest', suspiciouskinddaText: 'I honestly forgot in the moment.'},
          {suspiciouskinddaSpeaker: 'Friend 1', suspiciouskinddaText: 'You explained that rule twenty minutes ago.'},
          {suspiciouskinddaSpeaker: 'Friend 2', suspiciouskinddaText: 'The hesitation made it suspicious.'},
          {suspiciouskinddaSpeaker: 'Friend 3', suspiciouskinddaText: 'Maybe they were just focused on winning.'},
        ],
        suspiciouskinddaCaseVerdict: 'suspicious',
        suspiciouskinddaCaseRealOutcome:
          'They knew the rule but ignored it because it helped them win. They only admitted it after the result was secured. The hesitation and earlier explanation made the “forgot” excuse weak.',
      },
      {
        suspiciouskinddaCaseId: 'C13',
        suspiciouskinddaCaseNumber: 13,
        suspiciouskinddaCaseTag: 'Small Favor Mystery',
        suspiciouskinddaCaseTitle: 'The Borrowed Charger',
        suspiciouskinddaCaseMainQuestion:
          'Was the charger borrowed by accident, or quietly kept on purpose?',
        suspiciouskinddaCaseSituationDescription:
          'At a study meetup, Oliver asked to borrow a phone charger for “just ten minutes.” At the end of the evening, the charger was missing. Oliver said he gave it back by placing it on the table, but nobody remembered seeing it there. The next day, another friend noticed a charger that looked exactly the same in Oliver’s backpack.',
        suspiciouskinddaCaseClues: [
          'The charger had a tiny blue sticker near the cable end.',
          'Oliver’s charger at home was supposedly broken.',
          'He left the meetup earlier than everyone else.',
          'The table was cleared by three people, and none of them saw the charger.',
          'The charger in Oliver’s backpack had a small blue sticker in the same place.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Oliver', suspiciouskinddaText: 'I put it back on the table before I left.'},
          {suspiciouskinddaSpeaker: 'Mia', suspiciouskinddaText: 'I cleaned the table. There was no charger there.'},
          {suspiciouskinddaSpeaker: 'Leo', suspiciouskinddaText: 'He did mention his own charger stopped working.'},
          {suspiciouskinddaSpeaker: 'Sasha', suspiciouskinddaText: 'The sticker looked exactly like the one on the missing charger.'},
        ],
        suspiciouskinddaCaseVerdict: 'suspicious',
        suspiciouskinddaCaseRealOutcome:
          'Oliver kept the charger and hoped nobody would notice. He probably planned to return it later, but his claim that he left it on the table was false. The blue sticker and his broken charger gave away the truth.',
      },
      {
        suspiciouskinddaCaseId: 'C14',
        suspiciouskinddaCaseNumber: 14,
        suspiciouskinddaCaseTag: 'Dinner Confusion',
        suspiciouskinddaCaseTitle: 'The Restaurant Reservation Mix-Up',
        suspiciouskinddaCaseMainQuestion:
          'Was the reservation mistake real, or did someone change the plan?',
        suspiciouskinddaCaseSituationDescription:
          'A group planned dinner at a casual burger place. When they arrived, one friend, Chloe, said the reservation had somehow been moved to an expensive rooftop restaurant nearby. She claimed the booking app must have glitched. Strangely, she was dressed much more formally than everyone else and already knew the rooftop restaurant’s menu.',
        suspiciouskinddaCaseClues: [
          'The original chat clearly mentioned the burger place.',
          'Chloe had sent a screenshot of the rooftop restaurant earlier, saying it “looked cute someday.”',
          'She arrived wearing formal clothes.',
          'The rooftop restaurant had a reservation under Chloe’s name.',
          'The burger place said no reservation had ever been made for that group.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Chloe', suspiciouskinddaText: 'The app must have switched the place somehow.'},
          {suspiciouskinddaSpeaker: 'Ryan', suspiciouskinddaText: 'Apps do not usually create rooftop reservations by themselves.'},
          {suspiciouskinddaSpeaker: 'Ella', suspiciouskinddaText: 'She was the only one dressed for that place.'},
          {suspiciouskinddaSpeaker: 'Restaurant Host', suspiciouskinddaText: 'The reservation was made yesterday afternoon.'},
        ],
        suspiciouskinddaCaseVerdict: 'suspicious',
        suspiciouskinddaCaseRealOutcome:
          'Chloe intentionally booked the rooftop restaurant and pretended it was a mistake because she wanted a fancier dinner. The strongest clue was that the burger place never had a reservation at all, while the rooftop booking was made under her name.',
      },
      {
        suspiciouskinddaCaseId: 'C15',
        suspiciouskinddaCaseNumber: 15,
        suspiciouskinddaCaseTag: 'Online Meeting Case',
        suspiciouskinddaCaseTitle: 'The Muted Microphone Excuse',
        suspiciouskinddaCaseMainQuestion:
          'Was the microphone issue real, or was someone avoiding a question?',
        suspiciouskinddaCaseSituationDescription:
          'During an online team meeting, Ava was asked to explain her part of the project. Her microphone suddenly “stopped working.” She typed that she could not speak, but minutes later, when the topic changed to weekend plans, her microphone worked perfectly. She said she restarted the audio settings.',
        suspiciouskinddaCaseClues: [
          'The microphone stopped working exactly when Ava was asked about unfinished work.',
          'She replied quickly in chat, so she was still present.',
          'She had not uploaded her project section yet.',
          'Her microphone worked again without anyone seeing her leave the call.',
          'She joined the weekend conversation immediately.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Ava', suspiciouskinddaText: 'My audio just suddenly failed.'},
          {suspiciouskinddaSpeaker: 'Team Lead', suspiciouskinddaText: 'It was strange timing, but technical issues happen.'},
          {suspiciouskinddaSpeaker: 'Nora', suspiciouskinddaText: 'She had nothing prepared and avoided answering.'},
          {suspiciouskinddaSpeaker: 'Ben', suspiciouskinddaText: 'Maybe she fixed it while we moved on.'},
        ],
        suspiciouskinddaCaseVerdict: 'suspicious',
        suspiciouskinddaCaseRealOutcome:
          'Ava muted herself and pretended the microphone failed to avoid explaining unfinished work. The timing was too convenient, and the microphone “recovered” only after the difficult question was no longer being discussed.',
      },
      {
        suspiciouskinddaCaseId: 'C16',
        suspiciouskinddaCaseNumber: 16,
        suspiciouskinddaCaseTag: 'Locker Room Mystery',
        suspiciouskinddaCaseTitle: 'The Gym Locker Note',
        suspiciouskinddaCaseMainQuestion:
          'Was the note a prank, or a real warning?',
        suspiciouskinddaCaseSituationDescription:
          'At a gym, someone found a note taped to a locker that said, “Stop using what is not yours.” The locker owner was confused and claimed they had never taken anything. Later, another gym member said their towel and water bottle had gone missing several times from the same area.',
        suspiciouskinddaCaseClues: [
          'The note was written with block letters, probably to hide handwriting.',
          'The locker owner used the same corner area every day.',
          'The missing towel was once seen hanging near that locker.',
          'Several people used identical black water bottles.',
          'The locker owner had accidentally taken the wrong bottle before.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Locker Owner', suspiciouskinddaText: 'I never stole anything. I may have grabbed the wrong bottle once.'},
          {suspiciouskinddaSpeaker: 'Gym Member', suspiciouskinddaText: 'My towel disappeared more than once.'},
          {suspiciouskinddaSpeaker: 'Trainer', suspiciouskinddaText: 'People mix up items here all the time.'},
          {suspiciouskinddaSpeaker: 'Receptionist', suspiciouskinddaText: 'No formal complaint was filed.'},
        ],
        suspiciouskinddaCaseVerdict: 'not_suspicious',
        suspiciouskinddaCaseRealOutcome:
          'The situation was mostly a misunderstanding. The locker owner had once taken the wrong bottle by accident, and someone assumed they were stealing. The note was dramatic, but there was no strong evidence of intentional theft. The repeated missing items were likely caused by several people mixing up similar belongings.',
      },
      {
        suspiciouskinddaCaseId: 'C17',
        suspiciouskinddaCaseNumber: 17,
        suspiciouskinddaCaseTag: 'Friend Group Mystery',
        suspiciouskinddaCaseTitle: 'The Birthday Gift Secret',
        suspiciouskinddaCaseMainQuestion:
          'Was the hidden purchase a surprise, or something suspicious?',
        suspiciouskinddaCaseSituationDescription:
          'Before a friend’s birthday, Jamie noticed that two friends were whispering, closing laptop tabs, and avoiding questions about a recent purchase. Jamie became suspicious because the same friends had recently complained about money. When asked directly, they said it was “nothing important.”',
        suspiciouskinddaCaseClues: [
          'The friends quickly closed a shopping page when Jamie entered.',
          'A delivery notification appeared on one friend’s phone.',
          'They had asked Jamie’s favorite color the week before.',
          'They avoided talking about money after the purchase.',
          'The package was hidden in a closet.',
        ],
        suspiciouskinddaCaseStatements: [
          {suspiciouskinddaSpeaker: 'Jamie', suspiciouskinddaText: 'They were acting too secretive.'},
          {suspiciouskinddaSpeaker: 'Friend 1', suspiciouskinddaText: 'We could not tell you because it would ruin everything.'},
          {suspiciouskinddaSpeaker: 'Friend 2', suspiciouskinddaText: 'It was not suspicious, just badly hidden.'},
          {suspiciouskinddaSpeaker: 'Roommate', suspiciouskinddaText: 'I saw gift wrapping paper near the closet.'},
        ],
        suspiciouskinddaCaseVerdict: 'not_suspicious',
        suspiciouskinddaCaseRealOutcome:
          'The hidden purchase was a birthday gift for Jamie. The secrecy looked suspicious because the friends were terrible at hiding it, but there was no negative intent. The favorite color question and gift wrapping paper were the key clues.',
      },
    ],
    [],
  );

  const [suspiciouskinddaProgressById, setSuspiciouskinddaProgressById] =
    useState<Record<string, SuspiciouskinddaIdeasCaseProgress>>(() =>
      suspiciouskinddaBuildDefaultProgress(suspiciouskinddaCases),
    );

  const suspiciouskinddaToggleSaved = (suspiciouskinddaCaseId: string) => {
    setSuspiciouskinddaProgressById(prev => {
      const suspiciouskinddaCurrent = prev[suspiciouskinddaCaseId];
      if (!suspiciouskinddaCurrent) {
        return prev;
      }
      return {
        ...prev,
        [suspiciouskinddaCaseId]: {
          ...suspiciouskinddaCurrent,
          suspiciouskinddaCaseIsSaved: !suspiciouskinddaCurrent.suspiciouskinddaCaseIsSaved,
        },
      };
    });
  };

  const suspiciouskinddaSubmitVerdict: SuspiciouskinddaIdeasCasesState['suspiciouskinddaSubmitVerdict'] =
    ({suspiciouskinddaCaseId, suspiciouskinddaYourVerdict, suspiciouskinddaNote}) => {
      setSuspiciouskinddaProgressById(prev => {
        const suspiciouskinddaCurrent = prev[suspiciouskinddaCaseId];
        if (!suspiciouskinddaCurrent) {
          return prev;
        }
        return {
          ...prev,
          [suspiciouskinddaCaseId]: {
            ...suspiciouskinddaCurrent,
            suspiciouskinddaCaseIsSolved: true,
            suspiciouskinddaCaseYourVerdict: suspiciouskinddaYourVerdict,
            suspiciouskinddaCaseYourNote: suspiciouskinddaNote ?? '',
          },
        };
      });
    };

  const suspiciouskinddaValue = useMemo<SuspiciouskinddaIdeasCasesState>(
    () => ({
      suspiciouskinddaCases,
      suspiciouskinddaProgressById,
      suspiciouskinddaToggleSaved,
      suspiciouskinddaSubmitVerdict,
    }),
    [suspiciouskinddaCases, suspiciouskinddaProgressById],
  );

  return (
    <SuspiciouskinddaIdeasCasesContext.Provider value={suspiciouskinddaValue}>
      {children}
    </SuspiciouskinddaIdeasCasesContext.Provider>
  );
}

export function useSuspiciouskinddaIdeasCases() {
  const suspiciouskinddaCtx = useContext(SuspiciouskinddaIdeasCasesContext);
  if (!suspiciouskinddaCtx) {
    throw new Error(
      'useSuspiciouskinddaIdeasCases must be used inside SuspiciouskinddaIdeasCasesProvider',
    );
  }
  return suspiciouskinddaCtx;
}

