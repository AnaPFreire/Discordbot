const{ REST, Routes} = require("discord.js")

//dotenv
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

//importação dos comandos
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync( commandsPath).filter(file => file.endsWith(".js"))

const commands = []

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}
//INSTANCIA REST
const rest = new REST({version: "10"}).setToken(TOKEN);

//DEPLAY
(async () =>{
    try {
        console.log('Resetando ${commands.length} commandos...')

        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            {body: commands}
        )
            console.log("Comandos Registrados com sucesso!")
    }
    catch (error){
        console.error(error)
    }    
})()