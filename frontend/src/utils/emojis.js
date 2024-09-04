


const emojiArr=[
    "🤣", "😆", "😂", "😜", "😝", 
    "🤪", "😛", "😎", "🤓", "🧐", 
    "🤡", "🤠", "🥳", "😹", "🙃", 
    "😈", "👻", "💩", "😺", "👽", 
    "👾", "👅", "👀", "🧠", "🤖", 
    "🎃", "🐵", "🙈", "🙉", "🙊", 
    "🐸", "🐷", "🐮", "🐔", "🐲", 
    "🦄", "💀", "☠️", "👹", "👺", 
    "👿", "🦖", "🦕", "🦍", "🐉", 
    "🧟", "🧛", "🧙", "🧚", "🧞"
  ];

export const getRandomEmoji = ()=>{
    return emojiArr[Math.floor(Math.random() * emojiArr.length)];
}