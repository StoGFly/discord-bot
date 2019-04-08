import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class kick implements IBotCommand {

    private readonly _command = "kick"

    help(): string {
        return "(Admin Only) Kicks the mentioned user.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        //Get the member to kick and the reason for the kick
        let mentionedUser = msgObject.mentions.users.first();
        let suppliedReason = args.slice(1).join(" ") || "";
        let kickLog = `${msgObject.author.username} banned the user with reason: ${suppliedReason}`;

        //Clean-up our message
        msgObject.delete()
            .catch(console.error);

        //Make sure that the person using this command is an Admin
        if (!msgObject.member.hasPermission("ADMINISTRATOR")) {
            msgObject.channel.send(`:x: Sorry, ${msgObject.author.username}, I was unable to kick ${msgObject.mentions.users.first()}, because you have **Insufficient permissions**.`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000)
                        .catch(console.error);
                });
            return;
        }

        //Make sure they have actually mentioned someone to be kicked
        if (!mentionedUser) {
            msgObject.channel.send(`:x: Sorry, ${msgObject.author.username}, I couldn't find the specified user to kick. Perhaps you made an error in your spelling?`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000)
                        .catch(console.error);
                });
            return;
        }

        //Kick the member with the supplied reason
        msgObject.guild.member(mentionedUser).kick(kickLog)
            .then(console.log)
            .catch(console.error)
    }
}
