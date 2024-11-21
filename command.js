const { REST, Routes } =require('discord.js');

const commands = [
  {
    name: 'create',
    description: 'create new short url',
  },
];

const rest = new REST({ version: '10' }).setToken('MTI2NTczMDU5MjUyODQwNDU4Mw.G7q_G_.fFGAcSHyP2BNKumYX2ra185tPfCCZob0H_vMuc');

(async ()=>{
try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands("1265730592528404583"), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();