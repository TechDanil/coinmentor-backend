import dotenv from 'dotenv'
import { IMailConfig } from 'shared/interfaces/nodemailer.interface'
dotenv.config()

export const transporterConfig: IMailConfig = {
	host: process.env.MAIL_HOST as string,
	port: Number(process.env.MAIL_PORT),
	secure: false,
	auth: {
		user: process.env.MAIL_USER as string,
		pass: process.env.MAIL_PASS as string,
	},
}

console.log(process.env.MAIL_USER)
