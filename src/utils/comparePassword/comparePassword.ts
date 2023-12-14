import bcrypt from 'bcrypt';

export const comparePassword = async (plaintextPassword: string, hashedPassword: string): Promise<boolean> => {
    try {
        const isMatched = await bcrypt.compare(plaintextPassword, hashedPassword);
        return isMatched;
    } catch(error) {
        throw new Error('Error comparing passwords');
    }
} 