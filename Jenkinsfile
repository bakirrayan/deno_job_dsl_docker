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
                sh 'docker tag denoApp rayanbak257/deno_app:latest'
                withDockerRegistry([ credentialsId: "dockerHub", url: "" ]) {
                    sh  'docker push rayanbak257/deno_app:latest'
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