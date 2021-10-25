pipeline {
    agent any
    stages{
        stage('build and run') {
            steps {
                sh "docker-compose up -d"  
                    
            }
        }
        stage('Publish image to Docker Hub') {
            steps {
                withDockerRegistry([ credentialsId: "dockerhub", url: "" ]) {
                    sh  'docker push rayanbak257/denoapp:latest'
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
        failure {
            emailext body: 'failure build', 
            recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], 
            subject: 'failure build'
        }
    }
}