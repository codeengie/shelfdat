import parser from 'ua-parser-js';

/**
 * Detects whether a device is mobile or a tablet. The library I'm using is called
 * us-parser-js and is robust but at the moment I only need it to detect mobile or tablet
 * devices.
 * @returns {boolean}
 */
const detectMobile = () => {
    // Instantiate UAParser
    const uaParser = new parser.UAParser();
    const deviceType = uaParser.getResult().device.type;

    return deviceType === 'mobile' || deviceType === 'tablet';
};

export default detectMobile;