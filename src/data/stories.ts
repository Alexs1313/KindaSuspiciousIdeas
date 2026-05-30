export type StoryAccent = {
  color: string;
  background: string;
  border: string;
};

export type Story = {
  storyId: string;
  storyNumber: number;
  tag: string;
  title: string;
  summary: string;
  body: string;
  accent: StoryAccent;
};

export const storyAccents: StoryAccent[] =
  [
    {
      color: '#2EB3FF',
      background: 'rgba(46,179,255,0.08)',
      border: 'rgba(46,179,255,0.4)',
    },
    {
      color: '#F7C948',
      background: 'rgba(247,201,72,0.08)',
      border: 'rgba(247,201,72,0.4)',
    },
    {
      color: '#A06BFF',
      background: 'rgba(160,107,255,0.08)',
      border: 'rgba(160,107,255,0.4)',
    },
  ];

const pickAccent = (
  index: number,
): StoryAccent =>
  storyAccents[
    index % storyAccents.length
  ];

const rawStories: Omit<
  Story,
  'accent'
>[] = [
  {
    storyId: 'S1',
    storyNumber: 1,
    tag: 'Odd',
    title: 'The Man Who Apologized to a Mailbox',
    summary:
      'Every morning at 8:12, a man in a gray coat whispered an apology to a red mailbox. The whole street developed theories.',
    body: `A man in a long gray coat stopped in front of a red mailbox every morning at exactly 8:12. He would look left, look right, gently tap the mailbox twice, and whisper, "I'm sorry about yesterday." Then he would continue walking as if nothing unusual had happened.

At first, the neighbors assumed he was simply eccentric. Then someone noticed that he did not apologize on Sundays. On Mondays, however, the apology was longer. One woman claimed she heard him say, "I know the envelope was not ready, but I had no choice."

Naturally, the whole street developed theories. Some believed he had sent a dramatic love letter and regretted it. Others thought he was communicating with someone through secret mail drops. A retired accountant insisted the mailbox was "clearly involved in tax fraud," though nobody knew why.

Finally, one brave neighbor asked him directly. The man looked embarrassed and explained that he once bumped into the mailbox while carrying hot coffee, spilled it everywhere, and had felt oddly guilty ever since. The mailbox had survived. His dignity had not. From that day on, the neighbors no longer found him suspicious. They simply found him impressively committed to emotional closure.`,
  },
  {
    storyId: 'S2',
    storyNumber: 2,
    tag: 'Mystery',
    title: 'The Sandwich That Returned Different',
    summary:
      'Carla placed her sandwich in the office fridge. When she came back, it had extra mustard and the wrong number of tomato slices.',
    body: `At 12:30, Carla placed her sandwich in the office fridge. It was turkey, cheese, cucumber, and exactly three slices of tomato. She knew this because she had prepared it with what she called "lunch architecture." At 1:05, she opened the fridge and found the sandwich still there, wrapped in the same paper, with her name written on it.

But something was wrong.

The sandwich had no cucumber, one extra tomato slice, and a suspiciously generous amount of mustard. Carla did not dislike mustard, but she disliked being surprised by mustard. She gathered her coworkers and announced that a sandwich substitution had occurred.

Everyone denied involvement. Ben claimed he had eaten only soup. Mia said she had been on a call. Jordan asked why anyone would improve a sandwich and then return it, which made him suspicious for several minutes.

The truth appeared when Carla checked the fridge again. Behind a carton of oat milk sat her real sandwich. The "returned" sandwich belonged to another Carla from accounting, who had labeled hers with only "C." Nobody had stolen anything. Two sandwiches had simply lived parallel lives in the same refrigerator.

Still, Carla never trusted mustard again.`,
  },
  {
    storyId: 'S3',
    storyNumber: 3,
    tag: 'Odd',
    title: 'The Neighbor With the Plastic Plants',
    summary:
      'Mr. Bell watered six plants on his balcony every morning. All six plants were plastic.',
    body: `Every morning, Mr. Bell walked onto his balcony with a small blue watering can and carefully watered six plants. He moved slowly, with great seriousness, as if responsible for a rare botanical collection. The strange part was that all six plants were plastic.

His neighbor, Emma, noticed this on a Tuesday. By Friday, she had built an entire theory. Maybe the plants were a hiding place. Maybe the watering can contained something other than water. Maybe Mr. Bell wanted people to think he was forgetful so nobody would suspect his real activities.

One morning, Emma saw him polish a plastic leaf with a cloth. That felt even more suspicious. Why maintain fake plants with such devotion?

Eventually, the mystery solved itself. Mr. Bell's granddaughter had given him the plants after his real balcony garden died during a heatwave. She visited every weekend and always asked, "Are you taking care of them?" He knew they were fake, but he watered them anyway because it made her laugh when she came over.

The entire building relaxed after learning the truth. Mr. Bell was not hiding secrets in fake greenery. He was just a grandfather with excellent commitment to a joke.`,
  },
  {
    storyId: 'S4',
    storyNumber: 4,
    tag: 'Weird',
    title: 'The Elevator That Judged People',
    summary:
      'The elevator in Building C refused to go to the fifth floor. Residents began treating it like a personality trait.',
    body: `The elevator in Building C had a habit of refusing to go to the fifth floor. It went to every other floor without complaint, but when someone pressed five, the button blinked once and turned off. Residents began treating it like a personality trait.

People on the fifth floor were offended. People on the fourth floor were smug. One teenager claimed the elevator "knew things." An elderly resident said it probably disliked the smell of cabbage because someone on the fifth floor cooked cabbage every Thursday.

Then the elevator started stopping on the fifth floor only when nobody had pressed it. Doors opened, nobody entered, nobody left, and the elevator continued. This caused a wave of suspicion. Some said a ghost wanted to move in. Others suspected a child with too much free time.

A technician finally arrived and opened the control panel. Inside, he found a tiny sticky candy wrapper stuck near the fifth-floor button wiring. Every time the panel warmed up, the wrapper shifted just enough to create unexpected signals.

The elevator was not haunted, judgmental, or anti-cabbage. It was being controlled by melted candy. The fifth floor residents felt relieved, though one of them still whispered "be nice" before pressing the button.`,
  },
  {
    storyId: 'S5',
    storyNumber: 5,
    tag: 'Funny',
    title: 'The Overdramatic Coffee Order',
    summary:
      'Every day he ordered "one medium coffee, no sugar, no drama." Then one morning, he ordered tea.',
    body: `At a small café, a man ordered the same drink every day: "one medium coffee, no sugar, no drama." The barista thought it was a joke, so she wrote "No Drama" on the cup. The man nodded seriously and left.

The next day, he returned and said, "Yesterday had a little drama." The barista was confused. He explained that the lid had been slightly loose, causing one drop of coffee to land on his sleeve. "Not a tragedy," he said, "but certainly a plot twist."

From then on, the café staff became invested in keeping his coffee drama-free. They checked the lid twice, placed the cup carefully, and handed it over like a fragile diplomatic agreement.

Then one morning, he ordered tea.

The entire café went silent.

The barista asked if everything was okay. He sighed and said, "I am trying to become less predictable." For three days, he ordered tea and looked deeply unhappy. On the fourth day, he returned to coffee and announced, "The experiment has ended. Tea had too much emotional complexity."

Nobody knew if he was joking. Nobody asked. His cup still said "No Drama," but everyone understood that drama had become part of the brand.`,
  },
  {
    storyId: 'S6',
    storyNumber: 6,
    tag: 'Suspicious',
    title: 'The Dog Who Looked Guilty Too Early',
    summary:
      'Milo was already sitting in the hallway looking guilty before Nina discovered anything wrong.',
    body: `When Nina came home, her dog Milo was already sitting in the hallway with his ears down and his eyes full of regret. This was unusual because Nina had not yet discovered anything wrong. Normally, Milo looked guilty only after she found the evidence.

She walked through the apartment carefully. The sofa was fine. The trash bin was closed. The shoes were untouched. Milo continued watching her with the emotional intensity of someone waiting for a courtroom verdict.

Finally, Nina entered the kitchen. There, on the floor, was a single empty yogurt cup. Not broken. Not chewed. Just empty. Milo hated yogurt, which made the scene confusing. Nina checked the fridge and found that three yogurts were missing.

Her roommate came home twenty minutes later and confessed. She had eaten the yogurts, dropped one empty cup, and said, "Milo saw everything." Apparently, Milo had not committed the crime. He had witnessed it and assumed responsibility because he was emotionally weak under pressure.

From that day on, Nina called him "the innocent suspect." Milo still looked guilty whenever anyone opened the fridge.`,
  },
  {
    storyId: 'S7',
    storyNumber: 7,
    tag: 'Curious',
    title: 'The Man Who Carried an Empty Briefcase',
    summary:
      'Every weekday he entered the bus with a polished black briefcase he never opened. Everyone developed theories.',
    body: `Every weekday, a man entered the bus holding a polished black briefcase. He always placed it carefully on his knees and kept one hand on the lock. He never opened it. He never let it out of sight. Naturally, everyone on the bus developed theories.

Some thought it contained money. Others thought documents. One student suggested it held "one very important sandwich." The bus driver believed it was empty because people who protect things too obviously are usually protecting nothing.

One rainy morning, the man slipped while stepping onto the bus. The briefcase fell open. Everyone turned their heads, pretending not to look while absolutely looking.

Inside was a tiny pillow, a folded newspaper, and a banana.

The man calmly picked everything up and explained that he used the briefcase to reserve personal space on crowded buses. If he carried a backpack, people pushed against him. If he carried a briefcase, people assumed he was important and gave him room.

The bus passengers respected the strategy immediately. The next week, three more people appeared with briefcases. One contained lunch. One contained knitting supplies. One contained another smaller briefcase, which nobody dared question.`,
  },
  {
    storyId: 'S8',
    storyNumber: 8,
    tag: 'Awkward',
    title: 'The Group Chat Silence',
    summary:
      'Liam asked about pizza in the group chat. Nobody replied. Six hours later, all four people posted photos from the same pizza place.',
    body: `Liam sent a message to the group chat: "Anyone want to grab pizza tonight?" The message was seen by four people. Nobody replied.

Six hours later, all four people posted photos from the same pizza place.

This looked suspicious. It looked extremely suspicious. Liam zoomed in on the photos like a digital detective. Same table. Same neon sign. Same giant pepperoni pizza. One photo even showed an empty fifth chair, which felt personally offensive.

The next day, the group explained that the pizza plan had happened "by chance." Apparently, two of them met at a bookstore, bumped into the third near a bus stop, and then ran into the fourth outside the pizza place. Liam did not believe this. Nobody would believe this. It sounded like a lie invented by people who had no time to invent a better lie.

Then the pizza place posted security footage online as a funny coincidence: four friends arriving separately within twelve minutes, each looking surprised to see the others.

The story was true. The silence was still rude, but not a conspiracy. Liam forgave them, though he created a new group chat called "Pizza Witness Protection Program" and added everyone except the pizza place.`,
  },
  {
    storyId: 'S9',
    storyNumber: 9,
    tag: 'Strange',
    title: 'The Woman Who Bought One Spoon Every Friday',
    summary:
      'Every Friday she visited the same store and bought exactly one spoon. Not a set. Just one spoon.',
    body: `Every Friday evening, a woman visited the same home goods store and bought exactly one spoon. Not a set. Not a fork. Not a knife. One spoon. She paid in cash, thanked the cashier, and left.

After two months, the staff became concerned. Was she building something? Was she replacing spoons one by one? Was there a spoon thief in her house? One cashier suggested she might be training for a very slow picnic.

The mystery became more intense when she once returned a spoon because it "did not have the right personality." Nobody knew spoons had personalities, but everyone silently agreed some spoons looked friendlier than others.

Finally, the manager asked politely. The woman laughed and explained that she hosted a weekly soup night with friends. Each guest received a different spoon, and every new spoon was added to the "wall of legendary spoons." The returned spoon, she said, had "villain energy."

The store staff accepted this completely. By the end of the year, they had started recommending spoons based on mood. One cashier became known as the best spoon consultant in the neighborhood.`,
  },
  {
    storyId: 'S10',
    storyNumber: 10,
    tag: 'Office',
    title: 'The Suspiciously Clean Desk',
    summary:
      'Mark\'s desk was always chaos. Monday morning it was perfectly clean. People panicked.',
    body: `Everyone knew Mark's desk was chaos. Papers, cables, sticky notes, snack wrappers, three mugs, and a rubber duck wearing sunglasses lived there permanently. So when the office arrived Monday morning and found Mark's desk perfectly clean, people panicked.

A clean desk from a messy person is not just cleaning. It is a signal.

Coworkers whispered theories. Maybe Mark was quitting. Maybe he had been promoted. Maybe someone else cleaned it to frame him for professionalism. The rubber duck was gone, which made the situation emotionally serious.

Mark arrived late, saw everyone staring, and looked confused. "What happened to my desk?" he asked.

This made it worse. If Mark had not cleaned the desk, who had?

The answer came from the building cleaning team. A new cleaner had mistaken Mark's desk for a shared storage area and organized everything into labeled boxes. The rubber duck was placed in a drawer labeled "small executive items."

Mark was relieved. The office was relieved. The duck returned to its sunglasses position by lunchtime. However, Mark kept one label: "Important Chaos." It felt accurate.`,
  },
  {
    storyId: 'S11',
    storyNumber: 11,
    tag: 'Sweet',
    title: 'The Birthday Cake Alibi',
    summary:
      'A birthday cake disappeared from the office fridge two hours before the surprise party. Someone had frosting on their finger.',
    body: `A birthday cake disappeared from the office fridge two hours before the surprise party. The cake had been decorated with blue frosting and tiny stars. Everyone denied touching it, but someone had frosting on their finger.

The accused person, Tyler, insisted the frosting came from a cupcake. This would have been believable if there had been cupcakes anywhere in the building. There were not.

The team investigated. The cake box was still in the fridge, but it contained only a note: "Trust the process." This made the situation worse because nobody trusted any process involving a missing cake.

Just before the birthday person arrived, Tyler revealed the truth. He had moved the cake to the conference room early because he was afraid someone would accidentally see it in the fridge. The frosting on his finger came from fixing a damaged star on the side.

The note was his attempt to be mysterious. It was not appreciated.

The party happened successfully, but Tyler was banned from writing dramatic notes near desserts.`,
  },
  {
    storyId: 'S12',
    storyNumber: 12,
    tag: 'Cute',
    title: 'The Plant That Got Fan Mail',
    summary:
      'An office plant named Gregory began receiving sticky notes. Then someone wrote, "Meet me by the window after lunch."',
    body: `A small office plant named Gregory began receiving sticky notes. At first, they were simple: "Nice leaves." Then they became more emotional: "You are doing your best." Eventually, someone wrote, "Gregory understands me."

Nobody knew who started it. The plant sat near the printer, so almost everyone passed it daily. Soon, employees began treating Gregory like a coworker. Someone gave him a tiny paper tie. Someone else made a fake employee badge that said "Branch Manager."

The suspicious part came when Gregory received a note that said, "Meet me by the window after lunch." Plants, as a rule, do not attend meetings. Yet at 1:15, Gregory had been moved to the window.

The office launched a full investigation. The culprit was eventually revealed: the intern. She had been moving Gregory to sunnier spots because she noticed the leaves turning pale. The "fan mail" had started as a joke but became a workplace tradition.

Gregory recovered beautifully. He also received Employee of the Month, which caused mild resentment among actual employees.`,
  },
  {
    storyId: 'S13',
    storyNumber: 13,
    tag: 'Coincidence',
    title: 'The Bus Stop Conspiracy',
    summary:
      'For three days, Daniel saw the same woman reading the same page of the same book. She never turned the page.',
    body: `For three days in a row, Daniel arrived at the bus stop and saw the same woman reading the same page of the same book. She never turned the page. She never looked up. She simply stood there, reading page 47.

By the fourth day, Daniel was convinced something was strange. Maybe she was pretending to read while watching someone. Maybe page 47 contained a secret code. Maybe she was stuck in a time loop with excellent posture.

On Friday, curiosity defeated politeness. Daniel asked, "Is that page really good?"

The woman laughed and showed him the book. It was not a novel. It was a notebook with a book cover wrapped around it. Page 47 was actually a handwritten grocery list, and she kept checking it because she always forgot one item on the way home.

Daniel felt embarrassed but relieved. The secret code was onions, toothpaste, rice, and cat food.

The next Monday, she was reading page 48. Daniel did not ask questions.`,
  },
  {
    storyId: 'S14',
    storyNumber: 14,
    tag: 'Digital',
    title: 'The Cat Who Sent an Email',
    summary:
      'At 2:03 AM, Martin\'s boss received an email from his account containing only "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh."',
    body: `At 2:03 AM, Martin's boss received an email from Martin's account. The message contained only: "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh." It was followed by one attached image of a ceiling fan.

Martin woke up to three concerned messages asking if he was okay, hacked, or trying to resign creatively. He checked his sent folder and found the email. He had no memory of sending it. This was worrying, because nobody wants to discover their professional life has been altered by mysterious keyboard behavior.

The investigation took less time than expected. His cat had walked across the laptop, opened a draft, typed the message, and somehow attached an unexpected photo from the desktop. The ceiling fan image had been saved months earlier for reasons Martin no longer remembered.

His boss replied, "Please tell your cat the proposal needs more detail."

The cat was not punished. In fact, Martin changed his laptop password. The cat responded by sitting on the closed laptop for two hours, suggesting disagreement with the new security policy.`,
  },
  {
    storyId: 'S15',
    storyNumber: 15,
    tag: 'Odd',
    title: 'The Suspicious Lemon',
    summary:
      'A single lemon appeared on the hotel front desk every morning for a week. Nobody placed it there. Nobody removed it.',
    body: `A single lemon appeared on the front desk of a hotel every morning for a week. Nobody placed it there. Nobody removed it during the day. It simply existed, bright yellow and unexplained.

The staff named it Gerald.

Guests began asking about Gerald. One child saluted it every morning. A businessman claimed it brought good luck because his meeting went well after he touched it. By Wednesday, people were taking photos with the lemon.

The hotel manager wanted answers. Security footage showed a guest leaving the lemon at 6:40 AM each day, but the guest always wore sunglasses and a hat. This made the lemon feel less like fruit and more like a message.

Eventually, the mystery guest was identified as a regular visitor who worked at a nearby market. He explained that he had accidentally left a lemon on the desk Monday morning, and when the receptionist smiled at it, he decided the hotel "needed a daily lemon."

The manager allowed Gerald to remain as unofficial lobby mascot. Reviews later praised the hotel's "unique citrus hospitality."`,
  },
  {
    storyId: 'S16',
    storyNumber: 16,
    tag: 'Clever',
    title: 'The Notebook Full of Fake Passwords',
    summary:
      'Anna found her friend\'s notebook open to a page titled "Important Passwords." The passwords were all suspiciously strange.',
    body: `During a study session, Anna noticed her friend's notebook lying open. One page contained a list titled "Important Passwords." This was alarming, because writing passwords in a notebook is already risky. But the passwords were even stranger.

"DragonSoup17."
"PleaseDontStealThis99."
"WrongPasswordTryAgain."
"NiceTryDetective."

Anna asked if he was serious. Her friend smiled and said the notebook was bait. He kept it visible in case a nosy roommate tried to sneak into his accounts. None of the passwords were real. Some led to fake accounts filled with boring documents named "tax folder," "math notes," and "definitely not secret."

Anna found this both paranoid and impressive.

Two weeks later, his roommate angrily asked why "DragonSoup17" did not work on the streaming account. Nobody had accused the roommate of snooping before that moment, but he had solved the case against himself.

The notebook remained on the desk. A new fake password was added: "RoommateConfession2024."`,
  },
  {
    storyId: 'S17',
    storyNumber: 17,
    tag: 'Absurd',
    title: 'The Man Who Clapped for the Microwave',
    summary:
      'Alex clapped once whenever the microwave finished heating food. Not twice. Just one sharp clap.',
    body: `In a shared apartment, everyone noticed that Alex clapped once whenever the microwave finished heating food. Not twice. Not applause. Just one sharp clap.

When asked why, he said, "Positive reinforcement." His roommates assumed he was joking. He was not.

Alex believed appliances worked better when appreciated. He thanked the washing machine, nodded respectfully to the toaster, and once told the vacuum cleaner, "You did what you could." The microwave, however, received the clap because it had "a performance-based job."

One roommate became suspicious when the microwave stopped working only for him. It heated Alex's food perfectly but left everyone else's food cold in the middle. For two days, people joked that the microwave had chosen a favorite.

The real explanation was less magical. Alex always placed food near the edge of the rotating plate, while the others placed it dead center, where the microwave heated unevenly.

Still, after learning this, everyone started clapping for the microwave. Not because they believed it helped, but because nobody wanted to risk disrespecting the machine.`,
  },
  {
    storyId: 'S18',
    storyNumber: 18,
    tag: 'Rainy',
    title: 'The Umbrella That Was Too Popular',
    summary:
      'A black umbrella appeared in the office entrance. By Thursday, at least seven people claimed it was theirs.',
    body: `A black umbrella appeared in the office entrance during a rainy week. It had no name tag, no special design, and no obvious owner. By Thursday, at least seven people claimed it was theirs.

This was impossible unless the umbrella was leading multiple lives.

Each person had a reason. One said it looked like the umbrella they lost in March. Another said the handle felt familiar. A third insisted, "I know my umbrella's energy." That statement did not help the investigation but did make everyone uncomfortable.

The receptionist placed a sign above it: "Please describe the umbrella to claim it." Everyone described it as "black." This also did not help.

Finally, a delivery driver returned and asked, "Has anyone seen my umbrella?" He described a tiny scratch under the handle and a faded silver dot near the tip. Both matched perfectly.

The office returned it, disappointed. For one glorious week, the umbrella had united them through shared false confidence.`,
  },
  {
    storyId: 'S19',
    storyNumber: 19,
    tag: 'Secret',
    title: 'The Suspiciously Loud Whisper',
    summary:
      'Priya and Tom kept whispering in the break room. Everyone heard phrases like "hide it before Friday."',
    body: `Two coworkers, Priya and Tom, kept whispering in the break room. Unfortunately, they were terrible at whispering. Everyone heard phrases like "don't tell anyone," "hide it before Friday," and "make sure the box is sealed."

Naturally, the office became suspicious. Someone guessed surprise party. Someone guessed stolen office supplies. Someone guessed illegal cheese import, though that person was known for dramatic thinking.

On Friday, the truth was revealed. Priya and Tom had organized a tiny indoor herb garden for the office kitchen. The "box" contained basil, mint, and parsley. The "secret" was that they wanted to surprise everyone with fresh herbs for lunch.

The only suspicious part was how seriously they had behaved. Tom had worn sunglasses while carrying potting soil through the hallway, which made the whole thing look like a spy operation.

The herb garden became popular immediately. The office also created a rule: no whispering about basil unless everyone is invited.`,
  },
  {
    storyId: 'S20',
    storyNumber: 20,
    tag: 'Spooky',
    title: 'The Chair That Moved Overnight',
    summary:
      'Every morning the meeting room chair was turned toward the window. The cleaning team said they did not move it.',
    body: `Every morning, the chair in the meeting room was slightly turned toward the window. The cleaning team said they did not move it. The office staff said they always pushed chairs under the table. Yet every morning, the same chair faced the window like it was waiting for someone.

People began avoiding the chair. One employee said it had "main character energy." Another left a sticky note on it that said, "What do you want?" The note was gone the next day, which made things worse.

Security footage finally solved the mystery. The air conditioning vent above the chair blew directly onto the backrest each night. The chair had small wheels, and the floor was slightly uneven. Over several hours, the air slowly turned it toward the window.

The missing sticky note had stuck to the cleaner's mop.

Nothing supernatural had happened. Still, nobody sat in the chair for a week. Logic can explain a mystery, but it cannot always remove the vibe.`,
  },
];

export const stories: Story[] =
  rawStories.map((story, index) => ({
    ...story,
    accent:
      pickAccent(index),
  }));
