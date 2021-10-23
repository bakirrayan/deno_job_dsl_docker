pipeline {
    agent any
    def to = emailextrecipients([
          [$class: 'CulpritsRecipientProvider'],
          [$class: 'DevelopersRecipientProvider'],
          [$class: 'RequesterRecipientProvider']
    ])

    try {
        stage('build and run') {
            steps {
                sh "docker-compose up -d"
            }
        }
    } catch(e) {
        // mark build as failed
        currentBuild.result = "FAILURE";
        // set variables
        def subject = "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} ${currentBuild.result}"
        def content = '${JELLY_SCRIPT,template="html"}'

        // send email
        if(to != null && !to.isEmpty()) {
        emailext(body: content, mimeType: 'text/html',
            replyTo: '$DEFAULT_REPLYTO', subject: subject,
            to: to, attachLog: true
            )
        }

        // mark current build as a failure and throw the error
        throw e;
    }
    post {
        success {
            emailext body: 'A Test EMail', recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: 'Test'
        }
    }
}