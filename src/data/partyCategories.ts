export type PartyCategoryId =
  | 'caught_red_handed'
  | 'family_drama'
  | 'awkward_stranger'
  | 'online_crime'
  | 'pet_suspect'
  | 'workplace_spy';

export type PartyCategory = {
  categoryId: PartyCategoryId;
  label: string;
  color: string;
  textColor: string;
  situations: string[];
};

export const partyCategories: PartyCategory[] =
  [
    {
      categoryId: 'caught_red_handed',
      label: 'Caught Red-Handed',
      color: '#FF6B7A',
      textColor: '#1A2347',
      situations: [
        'You walk into the kitchen and see your friend holding your snack bag upside down over their mouth. They freeze and say, "I was just checking if it was empty." Explain how you would defend yourself if you were the one caught.',
        'Your roommate is standing beside a broken mug with a broom in hand. They say, "I found it like this, but I decided to help." Everyone knows they used that mug earlier. What would make their explanation believable or suspicious?',
        'During a board night, someone is caught with an extra card hidden under their leg. They claim it "fell there by accident." How would you question them?',
        'A friend is seen deleting a message right after someone asks, "Who told the secret?" They say it was unrelated. Would you believe them?',
        'You enter the room and see someone quickly closing your laptop. They say they were "just checking the time." How should they explain themselves?',
        'Someone is caught taking the last slice of pizza, but they insist they were "moving it to make space." What argument could save them?',
        'Someone is caught looking at another person\'s answer during a quiz round. They say they were only checking the handwriting. How suspicious is that?',
        'Someone is standing near an open gift box before the birthday person arrives. They claim they were "making sure it was wrapped properly." What would you ask first?',
      ],
    },
    {
      categoryId: 'family_drama',
      label: 'Family Drama',
      color: '#F7C948',
      textColor: '#1A2347',
      situations: [
        'Your sibling says they did not eat the cake, but they suddenly know exactly what flavor the filling was. How would you react?',
        'A parent says, "Nobody touched your things," but your charger is now in the living room and everyone acts too calm. Who do you suspect first?',
        'Your cousin "accidentally" forgets to invite one family member to dinner, but remembers to send photos afterward. Is it a mistake or a message?',
        'Someone in the family group chat says, "I don\'t want drama," and then sends a screenshot that starts drama. How would you defend or accuse them?',
        'Your aunt claims she "just guessed" about a surprise party, but she arrives perfectly dressed for the theme. How suspicious is that?',
        'Two relatives suddenly stop talking when you enter the room, then say they were discussing vegetables. What would make you believe them?',
        'Your younger sibling blames the dog for missing cookies, but the dog was outside. What is your interrogation strategy?',
        'A family member says they forgot your birthday, but they liked your birthday post from last year that morning. Coincidence or suspicious?',
        'Someone says they cleaned your room "to help," but only the drawer with snacks was opened. How do you respond?',
      ],
    },
    {
      categoryId: 'awkward_stranger',
      label: 'Awkward Stranger',
      color: '#5BC4FF',
      textColor: '#1A2347',
      situations: [
        'A stranger in a café keeps looking at your table, then suddenly says, "I promise I\'m not listening." What do you do?',
        'Someone in an elevator presses your floor before you do. They say, "You looked like a fifth-floor person." How suspicious is that?',
        'A stranger accidentally takes your coffee order, drinks half of it, and then says, "Honestly, this tastes more like mine." How would you handle it?',
        'A person at the bus stop asks if you are "still going to the place," but you have never seen them before. What is your next move?',
        'Someone sits next to you in an empty waiting room and says, "This seat has better energy." Do you move or stay?',
        'A stranger returns your dropped receipt and says, "Interesting purchase." How do you react?',
        'Someone in a store asks you if a jacket looks suspicious "for normal reasons." How do you answer?',
      ],
    },
    {
      categoryId: 'online_crime',
      label: 'Online Crime',
      color: '#A06BFF',
      textColor: '#FFFFFF',
      situations: [
        'A friend says their account was hacked, but the "hacker" only liked photos of their crush. Do you believe them?',
        'Someone in the group chat sends a message, deletes it, and then says, "My phone typed that by itself." How do you question them?',
        'Someone posts "I\'m offline today," but their status shows active every five minutes. Is it suspicious or normal?',
        'Someone claims they never saw your message, but they reacted to a meme sent after it. What is your argument?',
        'A friend says they accidentally sent a screenshot of your chat to the wrong person. How would you decide if it was truly accidental?',
        'Someone changes their username right after being accused of starting drama. Does that make them more suspicious?',
        'A person says, "Don\'t worry, I didn\'t read the whole message," but then references the last sentence. What do you say?',
        'Someone creates a fake account to "test app privacy," but it only follows people from your friend group. How suspicious is that?',
        'A friend claims the embarrassing post was scheduled automatically, but the caption responds to something that happened five minutes ago. What is your verdict?',
        'Someone sends "wrong chat" after a very specific insult. How should they defend themselves?',
      ],
    },
    {
      categoryId: 'pet_suspect',
      label: 'Pet Suspect',
      color: '#4ADE80',
      textColor: '#1A2347',
      situations: [
        'The dog is blamed for eating the sandwich, but the sandwich was on the top shelf. Who is the real suspect?',
        'A cat knocks over a plant, but the soil trail leads to someone\'s gaming chair. How do you investigate?',
        'A parrot repeats, "Don\'t tell mom," right after cookies disappear. What does that reveal?',
        'The hamster cage is open, and your sibling says, "Maybe the hamster learned freedom." How believable is that?',
        'The dog looks guilty before anyone finds the mess. Does that mean the dog did it, or saw who did?',
        'A cat is blamed for deleting a document, but the laptop was password protected. What questions do you ask?',
        'Someone says the fish "looked hungry," so they fed it six times. Now everyone denies it. How do you find the guilty one?',
        'The dog\'s paw prints are near the spilled juice, but there is also a human sock print. What happened?',
        'A pet camera shows the cat staring at the snack cabinet for ten minutes, but not opening it. Who else should be questioned?',
      ],
    },
    {
      categoryId: 'workplace_spy',
      label: 'Workplace Spy',
      color: '#FF8A3D',
      textColor: '#1A2347',
      situations: [
        'Someone always knows about meetings before they are officially announced. They say they "sense the calendar energy." How suspicious is that?',
        'A coworker says they did not read your notes, but later uses the exact phrase from your private draft. What would you ask?',
        'Someone keeps walking past the printer whenever confidential pages are printed. Coincidence or spying?',
        'A teammate suddenly becomes very friendly one day before project results are shared. What might they want?',
        'A coworker says they guessed the new office policy, but their guess is word-for-word correct. What is your theory?',
        'Someone claims they joined the wrong video call by accident, but stayed for ten minutes without speaking. How suspicious is that?',
        'A colleague asks casual questions about your task, then presents the same idea in a meeting. How do you respond?',
        'Someone moves a chair closer to the manager\'s office and says, "The lighting is better here." What is the real reason?',
        'A coworker always brings coffee right when important conversations start. Helpful habit or information-gathering strategy?',
        'Someone says they did not open your desk drawer, but they know where you keep the sticky notes. What is your verdict?',
        'A team member says they forgot to attach their report, but the file was last edited after the deadline. How do you challenge them?',
      ],
    },
  ];
