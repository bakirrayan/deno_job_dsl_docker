pipeline {
    agent any
    stages{
        stage('build and run') {
            steps {
                script {
                    def to = emailextrecipients([
                        [$class: 'CulpritsRecipientProvider'],
                        [$class: 'DevelopersRecipientProvider'],
                        [$class: 'RequesterRecipientProvider']
                    ])
                    try {
                        sh "docker-compose up -d"  
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
                }
            }
        }  
        stage('Publish image to Docker Hub') {
            steps {
                sh 'docker tag denoApp rayanbak257/denoApp:latest'
                withDockerRegistry([ credentialsId: "dockerHub", url: "" ]) {
                    sh  'docker push rayanbak257/denoApp:latest'
                }
            }
        }
    }
    post {
        success {
            emailext body: 'Success build', 
            recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], 
            subject: 'successfull build'
        }
    }
}