node {
    stage('Initialize') {
        // Clean workspace
        echo 'Cleaning workspace'
        deleteDir()

        // Initialize build parameters
        echo 'Setting build name and description'
        currentBuild.displayName = ""
        currentBuild.description = ""
    }

    stage('Git') {
        // Clone git repo
        echo "Cloning repo"
    }

    stage('NPM') {
        // Install node modules
        echo 'Installing node modules'
    }

    stage('Build') {
        // Run script to build app
        echo 'Running production build'
    }

    stage('Deploy') {
        // Upload to S3 bucket
        echo 'Uploading artifact to S3 bucket'
    }

    stage('Finish') {
        echo 'Tying up loose ends and sending a build notification'
    }
}