def setBuildVersion() {
    date = new Date()
    year = date.getYear() + 1900
    week = date.getAt(Calendar.WEEK_OF_YEAR)
    return "${year}.${week}."
}

def getJobName() {
    return "${JOB_NAME.toLowerCase()}"
}

// Set branch to build from
def branch = (BUILD_BRANCH) ? BUILD_BRANCH : 'master'

node {
    env.NODEJS_HOME = "${tool '16.18.0'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

    stage('Init') {
        if (DEBUG) {
            echo 'Cleaning workspace'
            deleteDir()
        }

        // Initialize build parameters
        echo 'Setting build parameters'
        currentBuild.displayName = "${setBuildVersion()}${BUILD_NUMBER}"
    }

    stage('Git') {
        echo "Cloning repo"

        /**
         * I wasn't able to use withCredentials() because Jenkins was not able to access the GitLab API Token
         * even through I modified it to access the class. Also, interpolating the credentials variable into
         * the repo url is a no go since it poses a security risk.
         * Reference: @link https://github.com/jenkinsci/gitlab-plugin/issues/536
         *
         * Using checkout() required a bit of trickery in order to access the credentialsId. Apparently, accessing
         * the token I created in GitLab cannot be accessed here if its not a ssh or username/password. So, I went
         * back into credentials manager and created a username/password entry. This solution fixes two issues I
         * ran into: credentials exposure during the job running and hardcoding the token in the url parameter.
         * Reference: @link https://cloudaffaire.com/faq/secret-text-git-credentials-not-showing-up-in-jenkins-project-source-code-management-section/
         */
        checkout([
            $class: 'GitSCM',
            branches: [[name: "*/${branch}"]],
            extensions: [
                [$class: 'CleanBeforeCheckout']
            ],
            userRemoteConfigs: [
                [credentialsId: 'gitlab-api-token', url: 'https://gitlab.com/codeengie/shelfdat']
            ]
        ])
    }

    /**
     * Since Jenkins is running in a Docker you need to use `sh` and not `bat` or `powershell` to run scripts. Also,
     * in order to run `npm install` you need to configure NodeJS as a global tool and declaring environment variables
     * in the script.
     */
    stage('NPM') {
        echo 'Installing node modules'
        dir("${WORKSPACE}") {
            sh 'npm install'
        }
    }

    /*
     * I placed and created this step after 'Git' because invoking `checkout()` with parameter `CleanBeforeCheckout` removes
     * the files created as part of a build. In this case the '.env.production' file I was initially creating in 'Init' stage.
     * It drove me nuts before I caught on, went so far as setting folder permissions in shell.
     */
    stage('Pre-Flight') {
        echo 'Set app environment variables'
        fileOperations([
        	fileCreateOperation(fileContent:
        		'''
        			NODE_ENV=production
        			VUE_APP_API_URL="${VUE_API_URL}"
        			VUE_APP_CACHE_BUCKET_URL="${VUE_CACHE_BUCKET_URL}"
        			VUE_APP_TITLE="${VUE_TITLE}"
        		''',
        		fileName: "${WORKSPACE}/.env.production"
        	)
        ])
    }

    stage('Build') {
        echo 'Building for production'
        dir("${WORKSPACE}") {
            sh 'npm run build'
        }
    }

    // In order to tap into AWS you need to create a user and generate credentials for Jenkins to use
    stage('Delete') {
        echo "Deleting S3 bucket files for: ${getJobName()}.com"

        withAWS(region: 'us-west-1', credentials: 'aws-creds') {
            s3Delete bucket: "${getJobName()}.com", path: '/'
        }
    }

    stage('Upload') {
        echo "Uploading files to S3 bucket: ${getJobName()}.com"

        withAWS(region: 'us-west-1', credentials: 'aws-creds') {
            s3Upload acl: 'Private', bucket: "${getJobName()}.com", cacheControl: 'max-age=31536000', includePathPattern: '*/**', workingDir: 'dist'
        }
    }

    stage('Invalidate') {
        echo "Invalidating files from CloudFront edge caches for: ${getJobName()}.com"

        withAWS(region: 'us-west-1', credentials: 'aws-creds') {
            cfInvalidate(distribution: "${DISTRO_ID}", paths: ['/*'], waitForCompletion: true)
        }
    }

    stage('Finish') {
        echo 'Tying up loose ends and sending a build notification'
    }
}