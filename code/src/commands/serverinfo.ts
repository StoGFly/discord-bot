import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class templateCommand implements IBotCommand {

    private readonly _command = "serverinfo"

    help(): string {
        return "Displays some information about the server.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        let embed = new Discord.RichEmbed()
            .setColor([120, 174, 190])
            .setTitle(`Server Info`)
            .setImage(msgObject.guild.iconURL)
            .setDescription(`Welcome! Here Is Some Information About ${msgObject.guild.name}`)
            .setFooter("HelpBot v0.2-alpha | Type ?help for commands")
            .addField("Server Owner", `${msgObject.guild.owner}`)
            .addField("Member Count", `Our server currrently has ${msgObject.guild.memberCount} members!`)

        msgObject.channel.send(embed)
            .catch(console.error);
    }
}
