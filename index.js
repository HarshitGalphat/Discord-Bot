const { Client, GatewayIntentBits } =require('discord.js');
const shortid = require('shortid');
const URL=require("./models/url");
const express=require("express");
const connectDB=require('./connect');
require('dotenv').config();
const secretKey= process.env.SECRET_KEY;
const mongoUrl=process.env.MONGO_URL;


const app=express();






const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });


client.on('messageCreate',async (msg)=>{
    // console.log(msg.content);
    if(msg.author.bot) return;
    if(msg.content.startsWith("create")){
        const url=msg.content.split("create")[1];
        const shortId=shortid(8);
    // const body=req.body;
    if(!url)msg.reply({error:"url is required"});
    
    await URL.create({
         shortId:shortId,
         redirectURL:body.url,
         visitHistory:[],
    })

     return msg.reply({
        content:shortId,
     });
    }


    msg.reply(
        {content:"Hi! from Hydra"}
    )
})

client.on('interactionCreate',interaction=>{
    console.log(interaction);
    interaction.reply("hello");
})

client.login("MTI2NTczMDU5MjUyODQwNDU4Mw.G7q_G_.fFGAcSHyP2BNKumYX2ra185tPfCCZob0H_vMuc");

app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
   let entry= await URL.findOneAndUpdate({
        shortId,
    },{
        $push:{
           visitHistory:{timestamp:Date.now(),}
        }
    });

    if (entry && entry.redirectURL) {
        res.redirect(entry.redirectURL);
    } else {
        // Handle the case where entry is null or redirectURL is missing
        res.status(404).send("URL not found.");
    }
    
});

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    connectDB("mongodb://127.0.0.1:27017/discord");
    console.log(`app running on ${PORT}`);
})