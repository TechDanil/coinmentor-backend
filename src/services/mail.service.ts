import nodemailer, { Transporter } from 'nodemailer'
import { transporterConfig } from '../config/nodemailer.config'

class MailService {
	private transporter: Transporter

	constructor() {
		console.log(transporterConfig)
		this.transporter = nodemailer.createTransport(transporterConfig)
	}

	sendRecoverPassword = async (to: string, link: string) => {
		await this.transporter.sendMail({
			from: process.env.MAIL_USER as string,
			to,
			subject: 'Password recovery' + 'http://localhost:3001',
			text: '',
			html: `
				<div>
					<h1>For password recovery, click on the link</h1>
					<a href="${link}">${link}</a>
				</div>
			`,
		})
	}
}

export default new MailService()
