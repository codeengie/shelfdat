/**
 * Created this bare-bones logging function to remove `console.log()` lint
 * errors when I build production version of the app. Eventually, I will create
 * a lambda function that will set this in CloudWatch.
 * @param {string} message - The text you want logged for later analysis
 * @param {string} error - The error/exception thrown by catch
 * @param {string} level - The severity of the message
 */
const logger = (message, error, level = 'error') => {
    if (process.env.NODE_ENV !== 'production') {
        switch(level) {
            case 'info':
                console.info(message, error);
                break;
            case 'warn':
                console.warn(message, error);
                break;
            default:
                console.error(message, error);
        }
    }
};

export default logger;