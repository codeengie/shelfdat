/**
 * I'm debating whether to leave these as is or add them to 'env.local' file. I've read its safe
 * but my gut says otherwise.
 * I was driving myself crazy trying to figure out why I was getting errors when login and
 * fetching data from AWS was returning errors in console while still receiving authenticated
 * user payload. The culprit was `identityPoolId` prop I was using in the config below. The
 * `identityPoolId` is only provided by AWS Cognito when you use Federated Identities. This is
 * also the reason I was getting an empty array in CLI when invoking:
 * `aws cognito-identity-pool --max-results 10`
 */
const config = {
    region: 'us-west-1',
    userPoolId: 'us-west-1_kPZ8hbOd3',
    userPoolWebClientId: '37hs4426vlgk59c69pu0qg0g76'
}

export default config;