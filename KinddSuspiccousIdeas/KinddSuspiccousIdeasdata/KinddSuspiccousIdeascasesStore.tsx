import React, {createContext, useContext, useMemo, useState} from 'react';

export type KinddSuspiccousIdeasVerdict = 'suspicious' | 'not_suspicious';

export type KinddSuspiccousIdeasCase = {
  kinddSuspiccousCaseId: string; // e.g. "C1"
  kinddSuspiccousCaseNumber: number; // e.g. 1
  kinddSuspiccousCaseTag: string;
  kinddSuspiccousCaseTitle: string;
  kinddSuspiccousCaseMainQuestion: string;
  kinddSuspiccousCaseSituationDescription: string;
  kinddSuspiccousCaseClues: string[];
  kinddSuspiccousCaseStatements: {kinddSuspiccousSpeaker: string; kinddSuspiccousText: string}[];
  kinddSuspiccousCaseVerdict: KinddSuspiccousIdeasVerdict;
  kinddSuspiccousCaseRealOutcome: string;
};

export type KinddSuspiccousIdeasCaseProgress = {
  kinddSuspiccousCaseId: string;
  kinddSuspiccousCaseIsSaved: boolean;
  kinddSuspiccousCaseIsSolved: boolean;
  kinddSuspiccousCaseYourVerdict?: KinddSuspiccousIdeasVerdict;
  kinddSuspiccousCaseYourNote?: string;
};

type KinddSuspiccousIdeasCasesState = {
  kinddSuspiccousCases: KinddSuspiccousIdeasCase[];
  kinddSuspiccousProgressById: Record<string, KinddSuspiccousIdeasCaseProgress>;
  kinddSuspiccousToggleSaved: (kinddSuspiccousCaseId: string) => void;
  kinddSuspiccousSubmitVerdict: (args: {
    kinddSuspiccousCaseId: string;
    kinddSuspiccousYourVerdict: KinddSuspiccousIdeasVerdict;
    kinddSuspiccousNote?: string;
  }) => void;
};

const KinddSuspiccousIdeasCasesContext =
  createContext<KinddSuspiccousIdeasCasesState | null>(null);

function kinddSuspiccousBuildDefaultProgress(
  kinddSuspiccousCases: KinddSuspiccousIdeasCase[],
): Record<string, KinddSuspiccousIdeasCaseProgress> {
  const kinddSuspiccousProgress: Record<string, KinddSuspiccousIdeasCaseProgress> =
    {};
  for (const kinddSuspiccousItem of kinddSuspiccousCases) {
    kinddSuspiccousProgress[kinddSuspiccousItem.kinddSuspiccousCaseId] = {
      kinddSuspiccousCaseId: kinddSuspiccousItem.kinddSuspiccousCaseId,
      kinddSuspiccousCaseIsSaved: false,
      kinddSuspiccousCaseIsSolved: false,
    };
  }
  return kinddSuspiccousProgress;
}

export function KinddSuspiccousIdeasCasesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const kinddSuspiccousCases = useMemo<KinddSuspiccousIdeasCase[]>(
    () => [
      {
        kinddSuspiccousCaseId: 'C1',
        kinddSuspiccousCaseNumber: 1,
        kinddSuspiccousCaseTag: 'Workplace Mystery',
        kinddSuspiccousCaseTitle: 'The Vanishing Office Donut',
        kinddSuspiccousCaseMainQuestion:
          'Was the missing donut stolen, or did someone make an honest mistake?',
        kinddSuspiccousCaseSituationDescription:
          'A box of donuts was placed in the office kitchen at 9:00 AM for the whole team. By 9:20 AM, the last chocolate donut was gone. The strange part: it had a sticky note on it saying “Saved for Mia.” Three coworkers were seen near the kitchen before the donut disappeared, and each of them has a different explanation.',
        kinddSuspiccousCaseClues: [
          'The sticky note was found folded under the empty donut box.',
          'A chocolate smear was seen on the coffee machine handle.',
          'One coworker had powdered sugar on their sleeve, but the missing donut was chocolate.',
          'The security camera near the kitchen was “accidentally” blocked by a delivery cart.',
          'Mia says she never gave permission for anyone to take it.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Leo', kinddSuspiccousText: 'I only went in to make coffee. I didn’t even notice the donut box.'},
          {kinddSuspiccousSpeaker: 'Nora', kinddSuspiccousText: 'I took a plain donut earlier, not the chocolate one.'},
          {kinddSuspiccousSpeaker: 'Ethan', kinddSuspiccousText: 'I moved the delivery cart because it was blocking the hallway.'},
          {kinddSuspiccousSpeaker: 'Mia', kinddSuspiccousText: 'Everyone knew I saved that donut. The note was very clear.'},
        ],
        kinddSuspiccousCaseVerdict: 'suspicious',
        kinddSuspiccousCaseRealOutcome:
          'Ethan took the donut, then moved the cart to block the camera after realizing the note had Mia’s name on it. His mistake was the chocolate smear on the coffee machine handle, because he touched it right after eating the donut. The folded sticky note under the box also suggested someone tried to hide the evidence quickly.',
      },
      {
        kinddSuspiccousCaseId: 'C2',
        kinddSuspiccousCaseNumber: 2,
        kinddSuspiccousCaseTag: 'Strange Timing',
        kinddSuspiccousCaseTitle: 'The Perfectly Timed Text',
        kinddSuspiccousCaseMainQuestion:
          'Was the message a coincidence, or did someone know more than they admitted?',
        kinddSuspiccousCaseSituationDescription:
          'A friend group was planning a surprise birthday dinner for Sam. Only four people knew the location. One hour before the event, Sam sent a message saying, “Should I dress fancy tonight, or is this casual?” Everyone panicked because nobody had told Sam about the dinner. One friend claimed it was just a lucky guess.',
        kinddSuspiccousCaseClues: [
          'Sam had not been invited to any visible event online.',
          'The restaurant reservation was made under a nickname, not Sam’s real name.',
          'One friend posted a vague story showing a table with candles.',
          'Sam’s message came five minutes after that story was posted.',
          'The story did not show the restaurant name.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Ava', kinddSuspiccousText: 'I posted the candle photo, but it could have been anywhere.'},
          {kinddSuspiccousSpeaker: 'Mason', kinddSuspiccousText: 'Sam always suspects surprises near his birthday.'},
          {kinddSuspiccousSpeaker: 'Lily', kinddSuspiccousText: 'I didn’t tell him anything. I only asked what color shirt he likes.'},
          {kinddSuspiccousSpeaker: 'Sam', kinddSuspiccousText: 'I just had a feeling something was happening.'},
        ],
        kinddSuspiccousCaseVerdict: 'not_suspicious',
        kinddSuspiccousCaseRealOutcome:
          'Sam guessed because of the timing and the vague candle photo, not because someone directly told him. The story gave just enough mood to make him suspicious, but no one revealed the actual plan. It was a smart guess, not a leak.',
      },
      {
        kinddSuspiccousCaseId: 'C3',
        kinddSuspiccousCaseNumber: 3,
        kinddSuspiccousCaseTag: 'School Case',
        kinddSuspiccousCaseTitle: 'The Backpack That Changed Seats',
        kinddSuspiccousCaseMainQuestion:
          'Did someone move the backpack on purpose?',
        kinddSuspiccousCaseSituationDescription:
          'During a class break, Emma left her backpack beside her chair. When she returned, it was under a different desk across the room. Nothing was missing, but her notebook was slightly open. Two classmates said they did not touch it, while another claimed it was moved because someone almost tripped over it.',
        kinddSuspiccousCaseClues: [
          'The backpack zipper was still closed.',
          'The notebook inside was open to a page with test notes.',
          'The desk where the bag was found belonged to a student who had missed the previous lesson.',
          'A chair near Emma’s desk was pushed back awkwardly.',
          'No personal items were missing.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Emma', kinddSuspiccousText: 'I’m sure I left it beside my own chair.'},
          {kinddSuspiccousSpeaker: 'Ryan', kinddSuspiccousText: 'I moved it because it was in the way.'},
          {kinddSuspiccousSpeaker: 'Olivia', kinddSuspiccousText: 'I saw someone near the bag, but I didn’t pay attention.'},
          {kinddSuspiccousSpeaker: 'Noah', kinddSuspiccousText: 'I didn’t need her notes. I already studied.'},
        ],
        kinddSuspiccousCaseVerdict: 'suspicious',
        kinddSuspiccousCaseRealOutcome:
          'Ryan moved the backpack after noticing the notebook inside. He did not steal anything, but he opened the bag slightly to check the test notes. The biggest clue was that the notebook was open to exactly the useful page, even though the zipper was later closed again.',
      },
      {
        kinddSuspiccousCaseId: 'C4',
        kinddSuspiccousCaseNumber: 4,
        kinddSuspiccousCaseTag: 'Neighborhood Oddity',
        kinddSuspiccousCaseTitle: 'The Neighbor’s Fake Vacation',
        kinddSuspiccousCaseMainQuestion:
          'Was the neighbor actually away, or pretending to be?',
        kinddSuspiccousCaseSituationDescription:
          'A neighbor told everyone he was leaving for a week-long vacation. However, lights were seen turning on and off in his apartment every evening. His curtains moved several times, and someone collected a food delivery from his door. When asked later, he said he had installed smart lights and the delivery was for a friend.',
        kinddSuspiccousCaseClues: [
          'The same hallway camera showed someone entering with a cap and hoodie.',
          'The person used the neighbor’s exact key code.',
          'The food delivery was ordered under the neighbor’s first name.',
          'His social media showed beach photos, but all were posted without live location.',
          'The apartment lights followed a normal evening routine.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Neighbor', kinddSuspiccousText: 'I was away. The lights are automatic.'},
          {kinddSuspiccousSpeaker: 'Delivery Worker', kinddSuspiccousText: 'Someone opened the door and took the food.'},
          {kinddSuspiccousSpeaker: 'Building Manager', kinddSuspiccousText: 'Only the resident should know that key code.'},
          {kinddSuspiccousSpeaker: 'Friend', kinddSuspiccousText: 'He asked me to check on the apartment once.'},
        ],
        kinddSuspiccousCaseVerdict: 'suspicious',
        kinddSuspiccousCaseRealOutcome:
          'The neighbor was not on vacation. He stayed home quietly because he wanted to avoid visitors and social plans. The beach photos were old. The key clue was the food delivery under his own name and the regular light routine, which did not match a simple automatic timer.',
      },
      {
        kinddSuspiccousCaseId: 'C5',
        kinddSuspiccousCaseNumber: 5,
        kinddSuspiccousCaseTag: 'Social Suspicion',
        kinddSuspiccousCaseTitle: 'The Broken Phone Excuse',
        kinddSuspiccousCaseMainQuestion:
          'Was the phone really broken, or was it an excuse?',
        kinddSuspiccousCaseSituationDescription:
          'During a group project, Daniel stopped replying to messages for two days. He later said his phone had broken and he could not access the chat. But during those same two days, someone noticed that he had liked several posts online. Daniel said he used his tablet, but forgot to check the project group.',
        kinddSuspiccousCaseClues: [
          'Daniel liked six posts during the time he claimed he was unreachable.',
          'He did not reply to direct messages either.',
          'The project deadline was close.',
          'He uploaded a short video during the same period.',
          'He returned to the group chat only after the hardest part of the work was finished.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Daniel', kinddSuspiccousText: 'My phone was broken, but I used my tablet for a few minutes.'},
          {kinddSuspiccousSpeaker: 'Sophie', kinddSuspiccousText: 'He ignored the group until the work was basically done.'},
          {kinddSuspiccousSpeaker: 'Max', kinddSuspiccousText: 'Maybe he just didn’t get notifications.'},
          {kinddSuspiccousSpeaker: 'Lena', kinddSuspiccousText: 'He always replies fast when it is something fun.'},
        ],
        kinddSuspiccousCaseVerdict: 'suspicious',
        kinddSuspiccousCaseRealOutcome:
          'Daniel was avoiding the project. His phone may have had issues, but he clearly had internet access and enough time to use social media. The excuse was partly true but used to avoid responsibility.',
      },
      {
        kinddSuspiccousCaseId: 'C6',
        kinddSuspiccousCaseNumber: 6,
        kinddSuspiccousCaseTag: 'Money Mystery',
        kinddSuspiccousCaseTitle: 'The Overexplained Receipt',
        kinddSuspiccousCaseMainQuestion:
          'Was the strange receipt explanation believable?',
        kinddSuspiccousCaseSituationDescription:
          'A group of friends split the bill after dinner. Later, one person noticed that the receipt total did not match the amount everyone had paid. Chris, who handled the payment, explained that the difference came from service fees, taxes, and a “rounding issue.” But the receipt already included taxes and service.',
        kinddSuspiccousCaseClues: [
          'The receipt total was $86.',
          'Five friends each paid $20, making the collected total $100.',
          'Chris said the extra $14 covered “hidden fees.”',
          'The receipt clearly showed “service included.”',
          'Chris avoided showing the payment confirmation screen.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Chris', kinddSuspiccousText: 'I just rounded it so nobody had to calculate.'},
          {kinddSuspiccousSpeaker: 'Maya', kinddSuspiccousText: 'Rounding is fine, but $14 extra is too much.'},
          {kinddSuspiccousSpeaker: 'Ben', kinddSuspiccousText: 'Maybe he planned to leave a bigger tip.'},
          {kinddSuspiccousSpeaker: 'Ella', kinddSuspiccousText: 'He changed the subject when I asked for the receipt.'},
        ],
        kinddSuspiccousCaseVerdict: 'suspicious',
        kinddSuspiccousCaseRealOutcome:
          'Chris intentionally overcollected money and hoped nobody would check. There were no hidden fees. The strongest clue was that the receipt already included service, yet he still used service as part of his explanation.',
      },
      {
        kinddSuspiccousCaseId: 'C7',
        kinddSuspiccousCaseNumber: 7,
        kinddSuspiccousCaseTag: 'Home Oddity',
        kinddSuspiccousCaseTitle: 'The Cat Camera Mystery',
        kinddSuspiccousCaseMainQuestion:
          'Did the cat cause the mess, or was someone else involved?',
        kinddSuspiccousCaseSituationDescription:
          'A family returned home and found a plant knocked over, a drawer open, and snacks missing from the kitchen. The younger brother blamed the cat. However, the cat camera showed the cat sleeping for most of the afternoon. The younger brother said the camera “probably missed the important moment.”',
        kinddSuspiccousCaseClues: [
          'The cat was recorded sleeping on the couch for 47 minutes.',
          'The snack cabinet was too high for the cat to reach.',
          'The drawer contained game controller batteries.',
          'The younger brother had been asking to play games earlier.',
          'Soil from the plant was found near the gaming chair.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Younger Brother', kinddSuspiccousText: 'The cat is sneaky. It could still be her.'},
          {kinddSuspiccousSpeaker: 'Older Sister', kinddSuspiccousText: 'The cat can’t open the snack cabinet.'},
          {kinddSuspiccousSpeaker: 'Parent', kinddSuspiccousText: 'Someone clearly searched for batteries.'},
          {kinddSuspiccousSpeaker: 'Camera Footage', kinddSuspiccousText: 'The cat did not enter the kitchen during the key time period.'},
        ],
        kinddSuspiccousCaseVerdict: 'suspicious',
        kinddSuspiccousCaseRealOutcome:
          'The younger brother caused the mess while searching for batteries and snacks. He knocked over the plant on the way to the gaming chair, then blamed the cat because the mess looked chaotic enough to seem believable.',
      },
      {
        kinddSuspiccousCaseId: 'C8',
        kinddSuspiccousCaseNumber: 8,
        kinddSuspiccousCaseTag: 'Academic Suspicion',
        kinddSuspiccousCaseTitle: 'The Too-Helpful Classmate',
        kinddSuspiccousCaseMainQuestion:
          'Was the classmate being kind, or trying to hide something?',
        kinddSuspiccousCaseSituationDescription:
          'Before a quiz, a classmate named Grace suddenly offered to help everyone study. She gave out a “summary sheet” with only five topics, saying she was sure the quiz would focus on them. The next day, the quiz covered exactly those five topics. Grace said she simply guessed well.',
        kinddSuspiccousCaseClues: [
          'The summary sheet matched the quiz topics almost perfectly.',
          'Grace had stayed after class the previous day.',
          'The teacher’s desk had printed quiz papers on it.',
          'Grace usually did not organize study help.',
          'She looked nervous when someone joked that she had “inside information.”',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Grace', kinddSuspiccousText: 'I just studied the most important parts.'},
          {kinddSuspiccousSpeaker: 'Teacher', kinddSuspiccousText: 'The quiz papers were on my desk, but covered.'},
          {kinddSuspiccousSpeaker: 'Classmate', kinddSuspiccousText: 'She never makes study sheets.'},
          {kinddSuspiccousSpeaker: 'Another Student', kinddSuspiccousText: 'Maybe she just understood the lesson better than us.'},
        ],
        kinddSuspiccousCaseVerdict: 'suspicious',
        kinddSuspiccousCaseRealOutcome:
          'Grace accidentally saw part of the quiz sheet while staying after class. She did not steal the quiz, but she used what she saw to create the summary. Her help was useful, but not completely honest.',
      },
      {
        kinddSuspiccousCaseId: 'C9',
        kinddSuspiccousCaseNumber: 9,
        kinddSuspiccousCaseTag: 'Public Place Mystery',
        kinddSuspiccousCaseTitle: 'The Elevator Button Trick',
        kinddSuspiccousCaseMainQuestion:
          'Was someone playing a prank in the elevator?',
        kinddSuspiccousCaseSituationDescription:
          'In an apartment building, residents noticed that the elevator kept stopping on the seventh floor even when nobody was there. Some thought the elevator was broken. Others suspected someone kept pressing the button and leaving. A resident on the seventh floor insisted they had nothing to do with it.',
        kinddSuspiccousCaseClues: [
          'The issue happened mostly between 6:00 PM and 7:00 PM.',
          'A child’s scooter was often parked near the seventh-floor elevator.',
          'The button panel had small sticky fingerprints.',
          'The elevator worked normally in the morning.',
          'One resident heard giggling near the stairs.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Seventh-Floor Resident', kinddSuspiccousText: 'I’m tired of the elevator stopping here too.'},
          {kinddSuspiccousSpeaker: 'Building Manager', kinddSuspiccousText: 'The system shows the button was pressed manually.'},
          {kinddSuspiccousSpeaker: 'Parent', kinddSuspiccousText: 'My kid waits near the elevator after school.'},
          {kinddSuspiccousSpeaker: 'Neighbor', kinddSuspiccousText: 'I heard someone run away after the doors opened.'},
        ],
        kinddSuspiccousCaseVerdict: 'suspicious',
        kinddSuspiccousCaseRealOutcome:
          'A child was pressing the button as a prank and running down the stairs before the elevator arrived. The elevator was not broken. The pattern, fingerprints, and timing all pointed to playful mischief rather than a technical issue.',
      },
      {
        kinddSuspiccousCaseId: 'C10',
        kinddSuspiccousCaseNumber: 10,
        kinddSuspiccousCaseTag: 'Friendship Case',
        kinddSuspiccousCaseTitle: 'The Quiet Group Chat',
        kinddSuspiccousCaseMainQuestion:
          'Did the group ignore one friend on purpose?',
        kinddSuspiccousCaseSituationDescription:
          'A friend sent a message asking if anyone wanted to meet on Saturday. Nobody replied for six hours. Later, the same friends posted a photo together from a café. They claimed the meeting was spontaneous and that nobody saw the message until later.',
        kinddSuspiccousCaseClues: [
          'The message was marked as seen by three people.',
          'The café photo was posted four hours after the message.',
          'One friend reacted to a meme in the same group chat during the silence.',
          'The group said it was “not planned,” but they were all at the same café.',
          'The friend who asked to meet was not invited.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Alex', kinddSuspiccousText: 'I thought someone else replied.'},
          {kinddSuspiccousSpeaker: 'Jade', kinddSuspiccousText: 'The café thing just happened randomly.'},
          {kinddSuspiccousSpeaker: 'Milo', kinddSuspiccousText: 'I didn’t see the message, I only saw the meme.'},
          {kinddSuspiccousSpeaker: 'Friend Who Asked', kinddSuspiccousText: 'It felt like everyone avoided answering me.'},
        ],
        kinddSuspiccousCaseVerdict: 'suspicious',
        kinddSuspiccousCaseRealOutcome:
          'The group intentionally avoided replying because they had already planned a smaller meetup. They did not want to directly exclude the friend, so they stayed silent. The biggest clue was that the chat was active for other messages while the invitation was ignored.',
      },
      {
        kinddSuspiccousCaseId: 'C11',
        kinddSuspiccousCaseNumber: 11,
        kinddSuspiccousCaseTag: 'Delivery Mystery',
        kinddSuspiccousCaseTitle: 'The Mysterious Package',
        kinddSuspiccousCaseMainQuestion:
          'Was the package delivered to the wrong person, or did someone take it?',
        kinddSuspiccousCaseSituationDescription:
          'A package was marked as delivered at 2:14 PM, but the recipient could not find it near the door. The delivery photo showed the correct hallway, but the package was not visible when the recipient checked ten minutes later. A neighbor said they saw “someone picking something up,” but they were not sure who it was.',
        kinddSuspiccousCaseClues: [
          'The delivery photo showed the package beside the correct door.',
          'The building entrance was locked.',
          'Only residents could access the hallway.',
          'A neighbor across the hall received a package the same day.',
          'The missing package had a bright yellow label.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Recipient', kinddSuspiccousText: 'I checked almost immediately, and it was gone.'},
          {kinddSuspiccousSpeaker: 'Neighbor', kinddSuspiccousText: 'I thought the person was picking up their own package.'},
          {kinddSuspiccousSpeaker: 'Delivery Worker', kinddSuspiccousText: 'I left it at the correct door.'},
          {kinddSuspiccousSpeaker: 'Across-Hall Neighbor', kinddSuspiccousText: 'I grabbed my package quickly and didn’t notice another one.'},
        ],
        kinddSuspiccousCaseVerdict: 'suspicious',
        kinddSuspiccousCaseRealOutcome:
          'The across-hall neighbor accidentally took the package along with their own because both were delivered close together. It was not intentional theft, but it was still suspicious until the package was returned. The bright yellow label helped identify it later.',
      },
      {
        kinddSuspiccousCaseId: 'C12',
        kinddSuspiccousCaseNumber: 12,
        kinddSuspiccousCaseTag: 'Memory Excuse',
        kinddSuspiccousCaseTitle: 'The Fake “I Forgot” Moment',
        kinddSuspiccousCaseMainQuestion:
          'Did the person really forget, or pretend to forget?',
        kinddSuspiccousCaseSituationDescription:
          'During a board game night, one player forgot to mention a rule that would have stopped them from winning. After winning, they suddenly remembered the rule and laughed it off. Other players felt the timing was too convenient.',
        kinddSuspiccousCaseClues: [
          'The player had explained the same rule earlier in the evening.',
          'The forgotten rule directly affected their winning move.',
          'They hesitated before making the move.',
          'Another player asked, “Is that allowed?” and they quickly said yes.',
          'They remembered the rule immediately after the win was confirmed.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Player', kinddSuspiccousText: 'I honestly forgot in the moment.'},
          {kinddSuspiccousSpeaker: 'Friend 1', kinddSuspiccousText: 'You explained that rule twenty minutes ago.'},
          {kinddSuspiccousSpeaker: 'Friend 2', kinddSuspiccousText: 'The hesitation made it suspicious.'},
          {kinddSuspiccousSpeaker: 'Friend 3', kinddSuspiccousText: 'Maybe they were just focused on winning.'},
        ],
        kinddSuspiccousCaseVerdict: 'suspicious',
        kinddSuspiccousCaseRealOutcome:
          'The player knew the rule but ignored it because it helped them win. They only admitted it after the result was secured. The hesitation and earlier explanation made the “forgot” excuse weak.',
      },
      {
        kinddSuspiccousCaseId: 'C13',
        kinddSuspiccousCaseNumber: 13,
        kinddSuspiccousCaseTag: 'Small Favor Mystery',
        kinddSuspiccousCaseTitle: 'The Borrowed Charger',
        kinddSuspiccousCaseMainQuestion:
          'Was the charger borrowed by accident, or quietly kept on purpose?',
        kinddSuspiccousCaseSituationDescription:
          'At a study meetup, Oliver asked to borrow a phone charger for “just ten minutes.” At the end of the evening, the charger was missing. Oliver said he gave it back by placing it on the table, but nobody remembered seeing it there. The next day, another friend noticed a charger that looked exactly the same in Oliver’s backpack.',
        kinddSuspiccousCaseClues: [
          'The charger had a tiny blue sticker near the cable end.',
          'Oliver’s charger at home was supposedly broken.',
          'He left the meetup earlier than everyone else.',
          'The table was cleared by three people, and none of them saw the charger.',
          'The charger in Oliver’s backpack had a small blue sticker in the same place.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Oliver', kinddSuspiccousText: 'I put it back on the table before I left.'},
          {kinddSuspiccousSpeaker: 'Mia', kinddSuspiccousText: 'I cleaned the table. There was no charger there.'},
          {kinddSuspiccousSpeaker: 'Leo', kinddSuspiccousText: 'He did mention his own charger stopped working.'},
          {kinddSuspiccousSpeaker: 'Sasha', kinddSuspiccousText: 'The sticker looked exactly like the one on the missing charger.'},
        ],
        kinddSuspiccousCaseVerdict: 'suspicious',
        kinddSuspiccousCaseRealOutcome:
          'Oliver kept the charger and hoped nobody would notice. He probably planned to return it later, but his claim that he left it on the table was false. The blue sticker and his broken charger gave away the truth.',
      },
      {
        kinddSuspiccousCaseId: 'C14',
        kinddSuspiccousCaseNumber: 14,
        kinddSuspiccousCaseTag: 'Dinner Confusion',
        kinddSuspiccousCaseTitle: 'The Restaurant Reservation Mix-Up',
        kinddSuspiccousCaseMainQuestion:
          'Was the reservation mistake real, or did someone change the plan?',
        kinddSuspiccousCaseSituationDescription:
          'A group planned dinner at a casual burger place. When they arrived, one friend, Chloe, said the reservation had somehow been moved to an expensive rooftop restaurant nearby. She claimed the booking app must have glitched. Strangely, she was dressed much more formally than everyone else and already knew the rooftop restaurant’s menu.',
        kinddSuspiccousCaseClues: [
          'The original chat clearly mentioned the burger place.',
          'Chloe had sent a screenshot of the rooftop restaurant earlier, saying it “looked cute someday.”',
          'She arrived wearing formal clothes.',
          'The rooftop restaurant had a reservation under Chloe’s name.',
          'The burger place said no reservation had ever been made for that group.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Chloe', kinddSuspiccousText: 'The app must have switched the place somehow.'},
          {kinddSuspiccousSpeaker: 'Ryan', kinddSuspiccousText: 'Apps do not usually create rooftop reservations by themselves.'},
          {kinddSuspiccousSpeaker: 'Ella', kinddSuspiccousText: 'She was the only one dressed for that place.'},
          {kinddSuspiccousSpeaker: 'Restaurant Host', kinddSuspiccousText: 'The reservation was made yesterday afternoon.'},
        ],
        kinddSuspiccousCaseVerdict: 'suspicious',
        kinddSuspiccousCaseRealOutcome:
          'Chloe intentionally booked the rooftop restaurant and pretended it was a mistake because she wanted a fancier dinner. The strongest clue was that the burger place never had a reservation at all, while the rooftop booking was made under her name.',
      },
      {
        kinddSuspiccousCaseId: 'C15',
        kinddSuspiccousCaseNumber: 15,
        kinddSuspiccousCaseTag: 'Online Meeting Case',
        kinddSuspiccousCaseTitle: 'The Muted Microphone Excuse',
        kinddSuspiccousCaseMainQuestion:
          'Was the microphone issue real, or was someone avoiding a question?',
        kinddSuspiccousCaseSituationDescription:
          'During an online team meeting, Ava was asked to explain her part of the project. Her microphone suddenly “stopped working.” She typed that she could not speak, but minutes later, when the topic changed to weekend plans, her microphone worked perfectly. She said she restarted the audio settings.',
        kinddSuspiccousCaseClues: [
          'The microphone stopped working exactly when Ava was asked about unfinished work.',
          'She replied quickly in chat, so she was still present.',
          'She had not uploaded her project section yet.',
          'Her microphone worked again without anyone seeing her leave the call.',
          'She joined the weekend conversation immediately.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Ava', kinddSuspiccousText: 'My audio just randomly failed.'},
          {kinddSuspiccousSpeaker: 'Team Lead', kinddSuspiccousText: 'It was strange timing, but technical issues happen.'},
          {kinddSuspiccousSpeaker: 'Nora', kinddSuspiccousText: 'She had nothing prepared and avoided answering.'},
          {kinddSuspiccousSpeaker: 'Ben', kinddSuspiccousText: 'Maybe she fixed it while we moved on.'},
        ],
        kinddSuspiccousCaseVerdict: 'suspicious',
        kinddSuspiccousCaseRealOutcome:
          'Ava muted herself and pretended the microphone failed to avoid explaining unfinished work. The timing was too convenient, and the microphone “recovered” only after the difficult question was no longer being discussed.',
      },
      {
        kinddSuspiccousCaseId: 'C16',
        kinddSuspiccousCaseNumber: 16,
        kinddSuspiccousCaseTag: 'Locker Room Mystery',
        kinddSuspiccousCaseTitle: 'The Gym Locker Note',
        kinddSuspiccousCaseMainQuestion:
          'Was the note a prank, or a real warning?',
        kinddSuspiccousCaseSituationDescription:
          'At a gym, someone found a note taped to a locker that said, “Stop using what is not yours.” The locker owner was confused and claimed they had never taken anything. Later, another gym member said their towel and water bottle had gone missing several times from the same area.',
        kinddSuspiccousCaseClues: [
          'The note was written with block letters, probably to hide handwriting.',
          'The locker owner used the same corner area every day.',
          'The missing towel was once seen hanging near that locker.',
          'Several people used identical black water bottles.',
          'The locker owner had accidentally taken the wrong bottle before.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Locker Owner', kinddSuspiccousText: 'I never stole anything. I may have grabbed the wrong bottle once.'},
          {kinddSuspiccousSpeaker: 'Gym Member', kinddSuspiccousText: 'My towel disappeared more than once.'},
          {kinddSuspiccousSpeaker: 'Trainer', kinddSuspiccousText: 'People mix up items here all the time.'},
          {kinddSuspiccousSpeaker: 'Receptionist', kinddSuspiccousText: 'No formal complaint was filed.'},
        ],
        kinddSuspiccousCaseVerdict: 'not_suspicious',
        kinddSuspiccousCaseRealOutcome:
          'The situation was mostly a misunderstanding. The locker owner had once taken the wrong bottle by accident, and someone assumed they were stealing. The note was dramatic, but there was no strong evidence of intentional theft. The repeated missing items were likely caused by several people mixing up similar belongings.',
      },
      {
        kinddSuspiccousCaseId: 'C17',
        kinddSuspiccousCaseNumber: 17,
        kinddSuspiccousCaseTag: 'Friend Group Mystery',
        kinddSuspiccousCaseTitle: 'The Birthday Gift Secret',
        kinddSuspiccousCaseMainQuestion:
          'Was the hidden purchase a surprise, or something suspicious?',
        kinddSuspiccousCaseSituationDescription:
          'Before a friend’s birthday, Jamie noticed that two friends were whispering, closing laptop tabs, and avoiding questions about a recent purchase. Jamie became suspicious because the same friends had recently complained about money. When asked directly, they said it was “nothing important.”',
        kinddSuspiccousCaseClues: [
          'The friends quickly closed a shopping page when Jamie entered.',
          'A delivery notification appeared on one friend’s phone.',
          'They had asked Jamie’s favorite color the week before.',
          'They avoided talking about money after the purchase.',
          'The package was hidden in a closet.',
        ],
        kinddSuspiccousCaseStatements: [
          {kinddSuspiccousSpeaker: 'Jamie', kinddSuspiccousText: 'They were acting too secretive.'},
          {kinddSuspiccousSpeaker: 'Friend 1', kinddSuspiccousText: 'We could not tell you because it would ruin everything.'},
          {kinddSuspiccousSpeaker: 'Friend 2', kinddSuspiccousText: 'It was not suspicious, just badly hidden.'},
          {kinddSuspiccousSpeaker: 'Roommate', kinddSuspiccousText: 'I saw gift wrapping paper near the closet.'},
        ],
        kinddSuspiccousCaseVerdict: 'not_suspicious',
        kinddSuspiccousCaseRealOutcome:
          'The hidden purchase was a birthday gift for Jamie. The secrecy looked suspicious because the friends were terrible at hiding it, but there was no negative intent. The favorite color question and gift wrapping paper were the key clues.',
      },
    ],
    [],
  );

  const [kinddSuspiccousProgressById, setKinddSuspiccousProgressById] =
    useState<Record<string, KinddSuspiccousIdeasCaseProgress>>(() =>
      kinddSuspiccousBuildDefaultProgress(kinddSuspiccousCases),
    );

  const kinddSuspiccousToggleSaved = (kinddSuspiccousCaseId: string) => {
    setKinddSuspiccousProgressById(prev => {
      const kinddSuspiccousCurrent = prev[kinddSuspiccousCaseId];
      if (!kinddSuspiccousCurrent) {
        return prev;
      }
      return {
        ...prev,
        [kinddSuspiccousCaseId]: {
          ...kinddSuspiccousCurrent,
          kinddSuspiccousCaseIsSaved: !kinddSuspiccousCurrent.kinddSuspiccousCaseIsSaved,
        },
      };
    });
  };

  const kinddSuspiccousSubmitVerdict: KinddSuspiccousIdeasCasesState['kinddSuspiccousSubmitVerdict'] =
    ({kinddSuspiccousCaseId, kinddSuspiccousYourVerdict, kinddSuspiccousNote}) => {
      setKinddSuspiccousProgressById(prev => {
        const kinddSuspiccousCurrent = prev[kinddSuspiccousCaseId];
        if (!kinddSuspiccousCurrent) {
          return prev;
        }
        return {
          ...prev,
          [kinddSuspiccousCaseId]: {
            ...kinddSuspiccousCurrent,
            kinddSuspiccousCaseIsSolved: true,
            kinddSuspiccousCaseYourVerdict: kinddSuspiccousYourVerdict,
            kinddSuspiccousCaseYourNote: kinddSuspiccousNote ?? '',
          },
        };
      });
    };

  const kinddSuspiccousValue = useMemo<KinddSuspiccousIdeasCasesState>(
    () => ({
      kinddSuspiccousCases,
      kinddSuspiccousProgressById,
      kinddSuspiccousToggleSaved,
      kinddSuspiccousSubmitVerdict,
    }),
    [kinddSuspiccousCases, kinddSuspiccousProgressById],
  );

  return (
    <KinddSuspiccousIdeasCasesContext.Provider value={kinddSuspiccousValue}>
      {children}
    </KinddSuspiccousIdeasCasesContext.Provider>
  );
}

export function useKinddSuspiccousIdeasCases() {
  const kinddSuspiccousCtx = useContext(KinddSuspiccousIdeasCasesContext);
  if (!kinddSuspiccousCtx) {
    throw new Error(
      'useKinddSuspiccousIdeasCases must be used inside KinddSuspiccousIdeasCasesProvider',
    );
  }
  return kinddSuspiccousCtx;
}

