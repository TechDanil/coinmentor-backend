import nodemailer, { Transporter } from 'nodemailer'
import { transporterConfig } from '../../config/nodemailer.config'

const createTransporter = () => {
	return nodemailer.createTransport(transporterConfig)
}

const sendEmail = async (
	transporter: Transporter,
	email: string,
	resetToken: string
) => {
	try {
		await transporter.sendMail({
			from: 'your@example.com',
			to: email,
			subject: 'Password Reset',
			html: `<p>You requested a password reset. Click <a href="${process.env.UI_DEV_URL}/${resetToken}">here</a> to reset your password.</p>`,
		})
	} catch (error) {
		throw error
	}
}

const sendPasswordResetEmail = async (email: string, resetToken: string) => {
	try {
		const transporter = createTransporter()
		await sendEmail(transporter, email, resetToken)
	} catch (error) {
		throw error
	}
}

export { createTransporter, sendEmail, sendPasswordResetEmail }
